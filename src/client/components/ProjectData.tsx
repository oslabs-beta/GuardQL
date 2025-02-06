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
  projectId: string;
  date: string;
  time: string;
  operation: string;
  operationName: string;
  query: string;
  errors: ErrorDetails[];
}

interface SlowMetricData {
  id: string;
  projectId: string;
  date: string;
  time: string;
  operation: string;
  operationName: string;
  query: string;
  requestTime: number;
  queryThreshold: number;
  thresholdExceededBy: number;
}

interface RegularMetricData {
  id: string;
  projectId: string;
  date: string;
  time: string;
  operation: string;
  operationName: string;
  query: string;
  requestTime: number;
  queryThreshold: number;
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
  data?: T[];
}

// GraphQL Queries
const GET_PROJECT_ERRORS = gql`
  query GetProjectErrors($projectId: String!) {
    getProjectErrors(projectId: $projectId) {
      id
      projectId
      date
      time
      operation
      operationName
      query
      errors {
        message
        locations {
          line
          column
        }
      }
    }
  }
`;

const GET_PROJECT_SLOW_QUERIES = gql`
  query GetProjectSlowQueries($projectId: String!) {
    getProjectSlowQueries(projectId: $projectId) {
      id
      projectId
      date
      time
      operation
      operationName
      query
      requestTime
      queryThreshold
      thresholdExceededBy
    }
  }
`;

const GET_PROJECT_REGULAR_QUERIES = gql`
  query GetProjectRegularQueries($projectId: String!) {
    getProjectRegularQueries(projectId: $projectId) {
      id
      projectId
      date
      time
      operation
      operationName
      query
      requestTime
      queryThreshold
    }
  }
`;

export const LOGIN = gql`
  mutation LoginUser($input: LoginInput) {
    login(input: $input) {
      user
      token 
    }
  }
`; 

// Individual data fetching hooks
export const useProjectErrors = (projectId: string): QueryResponse<ErrorData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_ERRORS, {
    variables: { projectId },
    pollInterval: 30000,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.getProjectErrors || [],
    loading,
    error,
    refetch
  };
};

export const useProjectSlowQueries = (projectId: string): QueryResponse<SlowMetricData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_SLOW_QUERIES, {
    variables: { projectId },
    pollInterval: 30000,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.getProjectSlowQueries || [],
    loading,
    error,
    refetch
  };
};

export const useProjectRegularQueries = (projectId: string): QueryResponse<RegularMetricData> => {
  const { data, loading, error, refetch } = useQuery(GET_PROJECT_REGULAR_QUERIES, {
    variables: { projectId },
    pollInterval: 30000,
    fetchPolicy: 'network-only',
  });

  return {
    data: data?.getProjectRegularQueries || [],
    loading,
    error,
    refetch
  };
};

// Utility functions
const calculateAverageQueryTime = (queries: (SlowMetricData | RegularMetricData)[]): number => {
  if (!queries.length) return 0;
  const total = queries.reduce((sum, query) => sum + query.requestTime, 0);
  return Math.round(total / queries.length);
};

const findSlowestQuery = (queries: (SlowMetricData | RegularMetricData)[]): number => {
  if (!queries.length) return 0;
  return Math.max(...queries.map(query => query.requestTime));
};

// Combined metrics hook
interface ProjectMetricsResponse {
  metrics: ProjectMetrics | null;
  loading: boolean;
  error?: any;
  errors: ErrorData[];
  slowQueries: SlowMetricData[];
  regularQueries: RegularMetricData[];
}

export const useProjectMetrics = (projectId: string): ProjectMetricsResponse => {
  const { 
    data: errors, 
    loading: errorsLoading, 
    error: errorsError 
  } = useProjectErrors(projectId);
  
  const { 
    data: slowQueries, 
    loading: slowQueriesLoading, 
    error: slowQueriesError 
  } = useProjectSlowQueries(projectId);
  
  const { 
    data: regularQueries, 
    loading: regularQueriesLoading, 
    error: regularQueriesError 
  } = useProjectRegularQueries(projectId);

  const calculateMetrics = (): ProjectMetrics | null => {
    if (!errors || !slowQueries || !regularQueries) return null;

    const allQueries = [...slowQueries, ...regularQueries];

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