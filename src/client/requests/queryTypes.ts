export interface ErrorLocation {
  line: number;
  column: number;
}

export interface ErrorDetails {
  message: string;
  locations: ErrorLocation[];
}

export interface ErrorData {
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

export interface SlowMetricData {
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

export interface RegularMetricData {
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

export interface UserProjectData {
  id: string; 
  name: string; 
}

export interface getUserProjectResponse {
  code: string; 
  success: boolean; 
  message: string; 
  projects: UserProjectData[]; 
}

export interface QueryResponse<T> {
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

export interface QueryResponseProjects<T> {
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

// Combined metrics hook
export interface ProjectMetrics {
  totalErrors: number;
  averageQueryTime: number;
  slowestQuery: number;
  totalSlowQueries: number;
  totalRegularQueries: number;
  errorRate: number;
  performanceScore: number;
}
  
export interface ProjectMetricsResponse {
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