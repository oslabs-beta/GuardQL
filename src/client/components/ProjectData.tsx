import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

interface ErrorLocation {
  line: number;
  column: number;
}

interface ErrorDetails {
  message: string;
  locations: ErrorLocation[];
}

interface ErrorData {
  id: string;
  project_id: string;
  date: string;
  time: string;
  operation: string;
  operation_name: string;
  query: string;
  request_time: number; 
  query_threshold: number; 
  error_id: string;
  error_message: string; 
  line: number; 
  column: number; 
  // errors: ErrorDetails[];
}

interface SlowMetricData {
  id: string;
  project_id: string;
  date: string;
  time: string;
  operation: string;
  operation_name: string;
  query: string;
  request_time: number;
  query_threshold: number;
  threshold_exceeded_by: number;
}

interface RegularMetricData {
  id: string;
  project_id: string;
  date: string;
  time: string;
  operation: string;
  operation_name: string;
  query: string;
  request_time: number;
  query_threshold: number;
}

// interface ProjectMetrics {
//   totalErrors: number;
//   averageQueryTime: number;
//   slowestQuery: number;
//   totalSlowQueries: number;
//   totalRegularQueries: number;
//   errorRate: number;
//   performanceScore: number;
// }

// interface QueryResponse<T> {
//   loading: boolean;
//   error?: any;
//   refetch: () => void;
//   // data?: T[];
//   data?: {
//     code: number; 
//     success: boolean; 
//     message: string; 
//     metrics: T[] ;
//   }
// }

// GraphQL Queries
const GET_PROJECT_ERRORS = gql`
  query GetProjectErrors($projectId: String!) {
    getProjectErrorMetrics(projectId: $projectId) {
      code
      success
      message
      metrics {
        id
        project_id
        date
        time
        operation
        operation_name
        query
        request_time
        query_threshold
        error_id
        error_message
        line
        column
      }
    }
  }
`;

const GET_PROJECT_SLOW_QUERIES = gql`
  query GetProjectSlowQueries($projectId: String!) {
    getProjectSlowQueries(projectId: $projectId) {
      code
      success
      message
      metrics {
        id
        project_id
        date
        time
        operation
        operation_name
        query
        request_time
        query_threshold
        threshold_exceeded_by
      }
    }
  }
`;

const GET_PROJECT_REGULAR_QUERIES = gql`
  query GetProjectRegularQueries($projectId: String!) {
    getProjectRegularQueries(projectId: $projectId) {
      code
      success
      message
      metrics {
        id
        project_id
        date
        time
        operation
        operation_name
        query
        request_time
        query_threshold
      }
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        username
      }
      token 
    }
  }
`; 

// Individual data fetching hooks
// export const getProjectErrors = (projectId: string): QueryResponse<ErrorData> => {
//   const { data, loading, error, refetch } = useQuery(GET_PROJECT_ERRORS, {
//     variables: { projectId },
//     pollInterval: 30000,
//     fetchPolicy: 'network-only',
//   });

//   return {
//     data: data?.getProjectErrors || [],
//     loading,
//     error,
//     refetch
//   };
// };


// export const getProjectSlowQueries = (projectId: string): QueryResponse<SlowMetricData> => {
//   const { data, loading, error, refetch } = useQuery(GET_PROJECT_SLOW_QUERIES, {
//     variables: { projectId },
//     pollInterval: 30000,
//     fetchPolicy: 'network-only',
//   });

//   return {
//     data: data?.getProjectSlowQueries || [],
//     loading,
//     error,
//     refetch
//   };
// };

// export const getProjectRegularQueries = (projectId: string): QueryResponse<RegularMetricData> => {
//   const { data, loading, error, refetch } = useQuery(GET_PROJECT_REGULAR_QUERIES, {
//     variables: { projectId },
//     pollInterval: 30000,
//     fetchPolicy: 'network-only',
//   });

//   return {
//     data: data?.getProjectRegularQueries || [],
//     loading,
//     error,
//     refetch
//   };
// };

const token = localStorage.getItem('jwt'); 
console.log('This is the current token after logging in:', token); 

export const getProjectErrorMetrics = (projectId: string): QueryResponse<ErrorData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_ERRORS, {
    variables: { projectId },
    context: {
      headers: {
        Authorization: token ? `Bearer ${token}`: '', 
      },
    },
  });
  // console.log('error data from projectData file begins here:', data); 
  return {
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
  console.log('Regular query data from projectData file begins here:', data); 
  return {
    data: data?.getProjectRegularQueries || [],
    loading,
    error,
    refetch
  };
};

// Utility functions
// const calculateAverageQueryTime = (queries: (SlowMetricData | RegularMetricData)[]): number => {
//   if (!queries.length) return 0;
//   const total = queries.reduce((sum, query) => sum + query.requestTime, 0);
//   return Math.round(total / queries.length);
// };

// const findSlowestQuery = (queries: (SlowMetricData | RegularMetricData)[]): number => {
//   if (!queries.length) return 0;
//   return Math.max(...queries.map(query => query.requestTime));
// };


interface QueryResponse<T> {
  loading: boolean;
  error?: any;
  refetch: () => void;
  // data?: T[];
  data?: {
    code: number; 
    success: boolean; 
    message: string; 
    metrics: T[] ;
  }
}

// interface ProjectMetrics {
//   totalErrors: number;
//   averageQueryTime: number;
//   slowestQuery: number;
//   totalSlowQueries: number;
//   totalRegularQueries: number;
//   errorRate: number;
//   performanceScore: number;
// }

// Combined metrics hook
interface ProjectMetricsResponse {
  metrics: ProjectMetrics | null;
  loading: boolean;
  error?: any;
  errors: {
    code: number; 
    success: boolean; 
    message: string; 
    metrics: ErrorData[];
  }
  slowQueries: {
    code: number; 
    success: boolean; 
    message: string; 
    metrics: SlowMetricData[];
  }
  regularQueries: {
    code: number; 
    success: boolean; 
    message: string; 
    metrics: RegularMetricData[];
  }
}

interface ProjectMetrics {
  totalErrors: number;
  averageQueryTime: number;
  slowestQuery: number;
  totalSlowQueries: number;
  totalRegularQueries: number;
  errorRate: number;
  performanceScore: number;
}

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

  const calculateMetrics = (): ProjectMetrics | null => {
    if (!errors || !slowQueries || !regularQueries) return null;

    const allQueries = [...slowQueries.metrics, ...regularQueries.metrics];

    return {
      totalErrors: errors.length,
      averageQueryTime: calculateAverageQueryTime(allQueries),
      slowestQuery: findSlowestQuery(allQueries),
      totalSlowQueries: slowQueries.length,
      totalRegularQueries: regularQueries.length,
      errorRate: errors.length / (allQueries.length || 1),
      performanceScore: calculatePerformanceScore(allQueries),
    };
  };

  const calculatePerformanceScore = (queries: (SlowMetricData | RegularMetricData)[]): number => {
    if (!queries.length) return 100;
    const slowQueriesCount = queries.filter(q => q.requestTime > q.queryThreshold).length;
    const slowQueryRatio = slowQueriesCount / queries.length;
    return Math.round(100 * (1 - slowQueryRatio));
  };

  return {
    metrics: calculateMetrics(),
    loading: errorsLoading || slowQueriesLoading || regularQueriesLoading,
    error: errorsError || slowQueriesError || regularQueriesError,
    errors: errors || [],
    slowQueries: slowQueries || [],
    regularQueries: regularQueries || []
  };
};


export const queries = {
  GET_PROJECT_ERRORS,
  GET_PROJECT_SLOW_QUERIES,
  GET_PROJECT_REGULAR_QUERIES
};