import { DbConnection, MetricInput, ErrorDetails, ErrorLocations } from './types.mjs'; 

export const getUserProjects = async (db: DbConnection, userId: string) => {
  const projects = await db.query(
    `SELECT * FROM projects
     WHERE user_id = $1`, 
    [userId]
  );
  return projects.rows;  
}

export const getUserData = async (db: DbConnection, userId: string) => {
  const userData = await db.query(
    `SELECT username, email, api_key
     FROM users
     WHERE id = $1`, 
    [userId]
  );
  return userData.rows[0];  
}

//! verify that the change from looking for project with the username to looking with the userId is functioning
export const findProject = async (db: DbConnection, userId: string, projectName: string) => {
  const project = await db.query(
    `SELECT projects.*
     FROM projects
     JOIN users ON projects.user_id = users.id
     WHERE users.id = $1 AND projects.name = $2`, 
     [userId, projectName]
  ); 
  return project.rows[0]; 
}

export const getProjectErrorMetrics = async (db: DbConnection, projectId: string) => {
  const errorMetrics = await db.query(
    `SELECT qm.*, e.id as error_id, 
     e.message as error_message, 
     el.line, el.column
     FROM query_metrics qm 
     INNER JOIN errors e ON qm.id = e.query_id
     INNER JOIN error_locations el ON e.id = el.error_id
     WHERE qm.project_id = $1
     ORDER BY qm.date, qm.time DESC`, 
    [projectId]
  ); 
  return errorMetrics.rows; 
}

export const getProjectSlowQueries = async (db: DbConnection, projectId: string) => {
  const slowMetrics = await db.query(
    `SELECT qm.*, sq.id as slow_query_id,        
     sq.threshold_exceeded_by as threshold_exceeded_by
     FROM query_metrics qm
     INNER JOIN slow_queries sq ON qm.id = sq.query_id        
     WHERE qm.project_id = $1
     ORDER BY qm.date, qm.time DESC`, 
    [projectId]
  ); 
  return slowMetrics.rows; 
}
 
export const getProjectRegularQueries = async (db: DbConnection, projectId: string) => {
  const metrics = await db.query(
    `SELECT *                   
     FROM query_metrics qm
     WHERE project_id = $1
     AND NOT EXISTS (
       SELECT *
       FROM slow_queries sq
       WHERE qm.id = sq.query_id
     )
     ORDER BY qm.date, qm.time DESC`, 
    [projectId]
  ); 
  return metrics.rows; 
}


export const createQueryMetric = async (db: DbConnection, projectId: string, metricData: MetricInput) => {
  const queryMetric = await db.query(
    `INSERT INTO query_metrics
     (project_id, date, time, operation, operation_name, query, request_time, query_threshold)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id`, 
     [
        projectId, 
        metricData.date, 
        metricData.time, 
        metricData.operation, 
        metricData.operation_name, 
        metricData.query, 
        metricData.request_time, 
        metricData.query_threshold,
     ]
  ); 
  return queryMetric.rows[0]; 
}


export const createSlowQuery = async (db: DbConnection, queryId: string, exceededBy: number) => {
  await db.query(
    `INSERT INTO slow_queries
       (query_id, threshold_exceeded_by)
     VALUES ($1, $2)`, 
    [queryId, exceededBy]
  ); 
}


export const createError = async (db: DbConnection, queryId: string, errorMessage: string) => {
  const error = await db.query(
    `INSERT INTO errors
       (query_id, message)
     VALUES ($1, $2)
     RETURNING id`, 
    [queryId, errorMessage]
  ); 
  return error.rows[0]; 
}


export const createErrorLocation = async (db: DbConnection, errorId: string, line: number, column: number) => {
  await db.query(
    `INSERT INTO error_locations
       (error_id, line, "column")
     VALUES ($1, $2, $3)`, 
    [errorId, line, column]
  );
}
 
export const createProject = async (db: DbConnection, projectName: string, userId: string) => {
  const project = await db.query(
    `INSERT INTO projects 
      (user_id, name)
     VALUES ($1, $2)`, 
    [userId, projectName]
  ); 
  return project.rows[0]; 
}

export const verifyApiKey = async (db: DbConnection, apiKey: string | undefined) => {
  if (!apiKey) {
    return null; 
  }

  const result = await db.query(
    `SELECT DISTINCT ON (id) id, username 
     FROM users 
     WHERE api_key = $1
     LIMIT 1`,
    [apiKey]
  ); 
  return result.rows[0] || null; 
}

export const getApiKey = async (db: DbConnection, userId: string | undefined) => {
  const apiKey = await db.query(
    `SELECT api_key 
     FROM users 
     WHERE id = $1`, 
    [userId]
  ); 
  return apiKey.rows[0].api_key; 
}