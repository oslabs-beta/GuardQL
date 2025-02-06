export interface DbConnection {
    //! find a better type for return value instead of any 
    //query: (text:string, params: (number | string)[]) => Promise<any>;
    query: (text:string, params: any[]) => Promise<any>;  
  }
  
  export interface MyContext {
    db: DbConnection; 
    userId: string | null; 
  }
  
  export interface MetricInput {
    username: string;
    projectName: string;
    date: string;
    time: string;
    operation: string;
    operation_name: string;
    query: string;
    request_time: number;
    query_threshold: number;
    threshold_exceeded_by?: number;
    errors?: ErrorDetails[];
  }
  
  export interface ProjectInput {
    name: string; 
  }
  
  export interface ErrorDetails {
    message: string; 
    locations: ErrorLocations[]; 
  }
  
  export interface ErrorLocations {
    line: number; 
    column: number; 
  }
  