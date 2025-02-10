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

interface UserProjectData {
  id: string; 
  name: string; 
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

interface QueryResponse<T> {
  loading: boolean;
  error?: any;
  refetch: () => void;
  data?: {
    code: number; 
    success: boolean; 
    message: string; 
    metrics: T[] ;
  }
}

interface QueryResponseProjects<T> {
  loading: boolean;
  error?: any;
  refetch: () => void;
  data?: {
    code: number; 
    success: boolean; 
    message: string; 
    projects: T[] ;
  }
}

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

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($input: CreateUserInput!) {
    createUser(input: $input) {
      code
      success
      message
    }
  }
`; 


export const GET_USER_PROJECTS = gql`
  query GetUserProjects {
    getUserProjects {
      code
      success
      message
      projects {
        id
        name
      }
    }
  }
`; 

//! original useQuery functions begin here ---------------------------------------------------------> 
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
//! original useQuery functions end here ---------------------------------------------------------> 

const token = localStorage.getItem('jwt'); 
// console.log('This is the current token after logging in:', token); 


// Individual data fetching hooks
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
  });
  console.log('User project data from projectData file begins here:', data); 
  console.log('User project error from projectData file begins here:', error); 
  return {
    data: data?.getUserProjects || [],
    loading,
    error,
    refetch
  };
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


// Combined metrics hook
interface ProjectMetrics {
  totalErrors: number;
  averageQueryTime: number;
  slowestQuery: number;
  totalSlowQueries: number;
  totalRegularQueries: number;
  errorRate: number;
  performanceScore: number;
}

interface ProjectMetricsResponse {
  metrics: ProjectMetrics | null;
  loading: boolean;
  error?: any;
  errors: {
    code: number | undefined; 
    success: boolean | undefined; 
    message: string | undefined; 
    metrics: ErrorData[];
  }
  slowQueries: {
    code: number | undefined; 
    success: boolean | undefined; 
    message: string | undefined; 
    metrics: SlowMetricData[];
  }
  regularQueries: {
    code: number | undefined; 
    success: boolean | undefined; 
    message: string | undefined; 
    metrics: RegularMetricData[];
  }
  projects: {
    code: number | undefined; 
    success: boolean | undefined; 
    message: string | undefined; 
    projects: UserProjectData[];
  }
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

export const queries = {
  GET_PROJECT_ERRORS,
  GET_PROJECT_SLOW_QUERIES,
  GET_PROJECT_REGULAR_QUERIES
};