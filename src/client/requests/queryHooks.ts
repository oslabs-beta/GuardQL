import { useQuery } from '@apollo/client';
import { GET_PROJECT_ERRORS, GET_PROJECT_SLOW_QUERIES, 
         GET_PROJECT_REGULAR_QUERIES, GET_USER_PROJECTS } from './gqlQueries';
import { ErrorLocation, ErrorDetails, ErrorData, SlowMetricData, 
         RegularMetricData, UserProjectData, QueryResponse, 
         QueryResponseProjects, ProjectMetrics, ProjectMetricsResponse } from './queryTypes'; 
   

//? Get token from localStorage for use during hook invocations
const token = localStorage.getItem('jwt'); 
// console.log('This is the current token after logging in:', token); 


//? Individual data fetching hooks
//? Hook to get all the error metrics of a specific project to display on the dashboard
export const getProjectErrorMetrics = (projectId: string): QueryResponse<ErrorData> => {
  //? Destructure the object that the useQuery hook will return and pass in the gql query to the hook
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_ERRORS, {
    //? In the second parameter object, two properties are passed in. The variables property contains 
    //? the projectId that will be needed for the gql query 
    variables: { projectId },
    context: {
      //? In the second property we must set the authorization property in the headers property to send 
      //? the jwt in the request so that the server can authorize the request
      headers: {
        Authorization: token ? `Bearer ${token}`: '', 
      },
    },
  });
  // console.log('error data from projectData file begins here:', data); 
  //? We return the destructured properties on the returned object 
  return {
    //? If no data is returned, we will return an empty array so 
    data: data?.getProjectErrorMetrics || [],
    loading,
    error,
    refetch
  };
};

export const getProjectSlowQueries = (projectId: string): QueryResponse<SlowMetricData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_SLOW_QUERIES, {
    variables: { projectId },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}`: '', 
      },
    },
  });
  // console.log('Slow query data from projectData file begins here:', data); 
  return {
    data: data?.getProjectSlowQueries || [],
    loading,
    error,
    refetch
  };
};

export const getProjectRegularQueries = (projectId: string): QueryResponse<RegularMetricData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_REGULAR_QUERIES, {
    variables: { projectId },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}`: '', 
      },
    },
  });
  // console.log('Regular query data from projectData file begins here:', data); 
  return {
    data: data?.getProjectRegularQueries || [],
    loading,
    error,
    refetch
  };
};

export const getUserProjects = (): QueryResponseProjects<UserProjectData> => {
  const { data, loading, error, refetch } = useQuery(GET_USER_PROJECTS, {
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}`: '', 
      },
    },
    // Add these options to help manage the request timing
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
    // Only start the query when we have a token
    skip: !token,
  });
  // console.log('User project data from projectData file begins here:', data); 
  // console.log('User project error from projectData file begins here:', error); 
  return {
    data: data?.getUserProjects || [],
    loading,
    error,
    refetch
  }
};


// Utility functions
const calculateAverageQueryTime = (queries: (SlowMetricData | RegularMetricData)[]): number => {
  if (!queries.length) return 0;
  const total = queries.reduce((sum, query) => sum + query.request_time, 0);
  return Math.round(total / queries.length);
};

const findSlowestQuery = (queries: (SlowMetricData | RegularMetricData)[]): number => {
  if (!queries.length) return 0;
  return Math.max(...queries.map(query => query.request_time));
};


export const getProjectMetrics = (projectId: string): ProjectMetricsResponse => {
  const { 
    loading: errorsLoading, 
    error: errorsError,  
    data: errors, 
  } = getProjectErrorMetrics(projectId);
  
  const {
    loading: slowQueriesLoading, 
    error: slowQueriesError, 
    data: slowQueries, 
  } = getProjectSlowQueries(projectId);
  
  const { 
    loading: regularQueriesLoading, 
    error: regularQueriesError, 
    data: regularQueries, 
  } = getProjectRegularQueries(projectId);

  const { 
    loading: projectsLoading, 
    error: projectsError, 
    data: projects, 
  } = getUserProjects();

  const calculateMetrics = (): ProjectMetrics | null => {
    if (!errors?.metrics || !slowQueries?.metrics || !regularQueries?.metrics) return null;

    const allQueries = [...(slowQueries.metrics || []), ...(regularQueries.metrics || [])];

    return {
      totalErrors: errors.metrics.length,
      averageQueryTime: calculateAverageQueryTime(allQueries),
      slowestQuery: findSlowestQuery(allQueries),
      totalSlowQueries: slowQueries.metrics.length,
      totalRegularQueries: regularQueries.metrics.length,
      errorRate: errors.metrics.length / (allQueries.length || 1),
      performanceScore: calculatePerformanceScore(allQueries),
    };
  };

  const calculatePerformanceScore = (queries: (SlowMetricData | RegularMetricData)[]): number => {
    if (!queries.length) return 100;
    const slowQueriesCount = queries.filter(q => q.request_time > q.query_threshold).length;
    const slowQueryRatio = slowQueriesCount / queries.length;
    return Math.round(100 * (1 - slowQueryRatio));
  };

  return {
    metrics: calculateMetrics(),
    loading: errorsLoading || slowQueriesLoading || regularQueriesLoading || projectsLoading,
    error: errorsError || slowQueriesError || regularQueriesError || projectsError,
    errors: {
      code: errors?.code,
      success: errors?.success,
      message: errors?.message, 
      metrics: errors?.metrics || [],
    },
    slowQueries: {
      code: slowQueries?.code,
      success: slowQueries?.success,
      message: slowQueries?.message, 
      metrics: slowQueries?.metrics || [],
    },
    regularQueries: {
      code: regularQueries?.code,
      success: regularQueries?.success,
      message: regularQueries?.message, 
      metrics: regularQueries?.metrics || [],
    }, 
    projects: {
      code: projects?.code,
      success: projects?.success,
      message: projects?.message, 
      projects: projects?.projects || [],
    }
  };
};

// export const queries = {
//   GET_PROJECT_ERRORS,
//   GET_PROJECT_SLOW_QUERIES,
//   GET_PROJECT_REGULAR_QUERIES
// };