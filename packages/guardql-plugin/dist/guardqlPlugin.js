"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const guardqlPlugin = (config) => {
    /* since the user will need to set configurations for the plugin, we will need to define the
    plugin as a function that takes in the configuartions as a parameter. Since the ApolloServerPlugin
    interface expects the plugin to be an object, we will also need to immediately return an object
    before we declare an event method */
    const metricsUrl = 'https://guardql-backend-latest.onrender.com/graphql';
    // Function to check if this is an introspection query
    const isIntrospectionQuery = (operationName, query) => {
        var _a;
        return (operationName === 'IntrospectionQuery' ||
            ((_a = ((query === null || query === void 0 ? void 0 : query.includes('__schema')) || (query === null || query === void 0 ? void 0 : query.includes('__type')))) !== null && _a !== void 0 ? _a : false));
    };
    return {
        /* requestDidStart is a GraphQL server lifecycle event that fires whenever Apollo Server
        begins fulfilling a GraphQL request */
        requestDidStart(requestContext) {
            // check if the current query is an introspection query
            if (isIntrospectionQuery(requestContext.request.operationName, requestContext.request.query)) {
                return Promise.resolve({});
            }
            /* once a GraphQL request starts, begin tracking it's execution time with the Performance
            API (built-in Node.js module - most accurate and least overhead for tracking time) */
            const requestStartTime = performance.now();
            /* functions that respond to request-specific lifecycle events must be defined
            within the returned object */
            return Promise.resolve({
                /* willSendResponse is a GraphQL event that fires whenever Apollo Server is about to send a
                response for a GraphQL operation. This event fires even if the operation encounters an error */
                async willSendResponse({ response, request, operation }) {
                    var _a, _b, _c, _d, _e;
                    // check once more if the current query is an introspection query
                    if (isIntrospectionQuery(request.operationName, request.query)) {
                        return;
                    }
                    //^ tracking operation execution time
                    /* when the response is about to sent, capture the current time and subtract it from the start
                    time to get the total time elapsed during the operation */
                    const requestEndTime = performance.now();
                    const requestTime = requestEndTime - requestStartTime;
                    // capture the time and date the response is sent to create a timestamp for the GraphQL request
                    const requestDate = new Date();
                    // format the date and time into separate strings
                    const formattedDate = requestDate.toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: '2-digit',
                        year: 'numeric'
                    });
                    const formattedTime = requestDate.toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    });
                    // store errors here if they exist
                    let errorsArray;
                    // store exceeded time here if the query is slow
                    let thresholdExceededBy;
                    //^ identifying any errors
                    if (
                    /* the errors array is deeply nested within the response object. It is located within the
                    singleResult property, which is only present if the response kind is set to 'single'. First
                    we have to check if the response kind is set to 'single', and then we can check if there are
                    any elements in the errors array. If both conditions are truthy, then errors occured during
                    the request */
                    ((_a = response.body) === null || _a === void 0 ? void 0 : _a.kind) === 'single' &&
                        /* since there is a possibility that the errors property could be undefined if no errors occured,
                        we have to use the nullish coalescing operator to ensure our number '0' is never compared with
                        undefined because this will cause a TypeScript error */
                        ((_e = (_d = (_c = (_b = response.body) === null || _b === void 0 ? void 0 : _b.singleResult) === null || _c === void 0 ? void 0 : _c.errors) === null || _d === void 0 ? void 0 : _d.length) !== null && _e !== void 0 ? _e : 0) > 0) {
                        // store errors array
                        errorsArray = response.body.singleResult.errors;
                    }
                    ;
                    //^ identifying slow queries
                    /* compare the requestTime to the threshold the user inputted in config to determine if the query
                    execution was slow */
                    if (requestTime > config.slowQueryThreshold) {
                        thresholdExceededBy = requestTime - config.slowQueryThreshold;
                    }
                    ;
                    //^ sending query metric data to server
                    try {
                        const response = await fetch(metricsUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'api-key': config.apiKey
                            },
                            body: JSON.stringify({
                                query: `
                mutation StoringQueryMetric($input: CreateQueryMetricInput!) {
                  createQueryMetric(input: $input) {
                    code
                    success
                    message
                  }
                }
              `,
                                variables: {
                                    input: {
                                        projectName: config.projectName,
                                        date: formattedDate,
                                        time: formattedTime,
                                        operation: operation === null || operation === void 0 ? void 0 : operation.operation,
                                        operation_name: request.operationName,
                                        query: request.query,
                                        request_time: requestTime,
                                        query_threshold: config.slowQueryThreshold,
                                        threshold_exceeded_by: thresholdExceededBy,
                                        errors: errorsArray,
                                    }
                                }
                            })
                        });
                    }
                    catch (error) {
                        console.error('Error sending metric to GuardQL dashboard:', error);
                    }
                }
            });
        }
    };
};
exports.default = guardqlPlugin;
