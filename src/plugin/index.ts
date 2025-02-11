// apollo interfaces and types for type checking our plugin 
import { ApolloServerPlugin, GraphQLRequestListener, GraphQLRequestContext, BaseContext } from "@apollo/server";

// type for plugin configuration 
interface pluginConfig {
  //!use randomly generated api keys later for more security 
  username: string; 
    /* user inputs the name of the project to identify which project GuardQL is tracking 
    queries for. This projectId will be used to open up a new or existing project tab in 
    the dashboard */
    projectName: string; 
    // user inputs a specific threshold (ms) to identify slow queries 
    slowQueryThreshold: number; 
}

const guardqlPlugin = (config: pluginConfig): ApolloServerPlugin => {
  /* since the user will need to set configurations for the plugin, we will need to define the 
  plugin as a function that takes in the configuartions as a parameter. Since the ApolloServerPlugin 
  interface expects the plugin to be an object, we will also need to immediately return an object 
  before we declare an event method */
  return {
    /* requestDidStart is a GraphQL server lifecycle event that fires whenever Apollo Server 
    begins fulfilling a GraphQL request */
    //! it's output needs to be in promise form because??? What is BaseContext?? TContext??? 
    requestDidStart(requestContext: GraphQLRequestContext<BaseContext>): Promise<GraphQLRequestListener<BaseContext>> {
      /* once a GraphQL request starts, begin tracking it's execution time with the Performance 
      API (built-in Node.js module - most accurate and least overhead for tracking time) */
      const requestStartTime = performance.now(); 

      /* functions that respond to request-specific lifecycle events must be defined 
      within the returned object */ 
      return Promise.resolve({
        /* willSendResponse is a GraphQL event that fires whenever Apollo Server is about to send a
        response for a GraphQL operation. This event fires even if the operation encounters an error */
        async willSendResponse({ response, request, operation }: GraphQLRequestContext<BaseContext>): Promise<void> {
          //^ tracking operation execution time 
          /* when the response is about to sent, capture the current time and subtract it from the start
          time to get the total time elapsed during the operation */
          const requestTime = performance.now() - requestStartTime; 
          
          // capture the time and date the response is sent to create a timestamp for the GraphQL request
          const requestDate = new Date(); 
          const requestYear = requestDate.getFullYear(); 
          const requestMonth = requestDate.getMonth() + 1; 
          const requestDay = requestDate.getDate(); 
          const requestHour = requestDate.getHours(); 
          const requestMinute = requestDate.getMinutes(); 
          const requestSeconds = requestDate.getSeconds(); 

          // format the date and time into separate strings 
          const formattedDate = `${requestMonth}-${requestDay}-${requestYear}`; 
          const formattedTime = `${requestHour}:${requestMinute}:${requestSeconds}`; 

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
            response.body?.kind === 'single' && 
            /* since there is a possibility that the errors property could be undefined if no errors occured, 
            we have to use the nullish coalescing operator to ensure our number '0' is never compared with 
            undefined because this will cause a TypeScript error */
            (response.body?.singleResult?.errors?.length ?? 0) > 0
          ) {
            // store errors array 
            errorsArray = response.body.singleResult.errors; 
          };

          //^ identifying slow queries 
          /* compare the requestTime to the threshold the user inputted in config to determine if the query 
          execution was slow */
          if (requestTime > config.slowQueryThreshold) {
            thresholdExceededBy = requestTime - config.slowQueryThreshold; 
          }; 

          //^ sending query metric data to server 
          await fetch('http://localhost:4000/graphql', {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json', 
            }, 
            body: JSON.stringify({
              query: `
                mutation StoringQueryMetric ($input: CreateQueryMetricInput!) {
                  createQueryMetric(input: $input) {
                    code 
                    success
                    message
                  }
                }
              `, 
              variables: {
                input: {
                  username: config.username,  
                  projectName: config.projectName, 
                  date: formattedDate, 
                  time: formattedTime, 
                  operation: operation?.operation, 
                  operation_name: request.operationName, 
                  query: request.query, 
                  request_time: requestTime, 
                  query_threshold: config.slowQueryThreshold, 
                  threshold_exceeded_by: thresholdExceededBy, // for slow queries
                  errors: errorsArray, // for queries that encountered errors 
                }
              }
            })
          }); 
        }
      });
    }
  }; 
}; 

export default guardqlPlugin; 