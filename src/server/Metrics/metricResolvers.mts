import { getProjectRegularQueries, getProjectSlowQueries, getProjectErrorMetrics, 
         createProject, getUserProjects, findProject, createQueryMetric, createSlowQuery, 
         createError, createErrorLocation, verifyApiKey, getApiKey, getUserData } from './databaseQueries.mjs'
import { DbConnection, MetricInput, ProjectInput } from './types.mjs'; 

const metricResolvers = {
  Query: {
    getUserProjects: async (_: any, __: any, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('Please log in to view your projects'); 
      }

      try {
        const projects = await getUserProjects(db, userId); 
        // console.log('Projects from database begin here:', projects); 
        return {
          code: 200, 
          success: true, 
          message: 'Projects retrieved successfully', 
          projects: projects
        }; 
      } catch (error) {
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve projects', 
          projects: []
        }; 
      }
    },

    getUserData: async (_: any, __: any, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('Please log in to view your account information'); 
      }

      try {
        const userData = await getUserData(db, userId); 
        // console.log('Projects from database begin here:', projects); 
        return {
          code: 200, 
          success: true, 
          message: 'User account information retrieved successfully', 
          userData
        }; 
      } catch (error) {
        console.error('This is the error for getUserData from the server:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve user account information', 
        }; 
      }
    },

    //! refactor - restructure returned data for errors with more than one error object 
    getProjectErrorMetrics: async (_: any, { projectId }: { projectId: string }, { db, userId}: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to view error metrics for a specific project'); 
      }

      try {
        const errorMetrics = await getProjectErrorMetrics(db, projectId); 
        // console.log('The project error metrics begin here:', errorMetrics); 
        return {
          code: 200, 
          success: true, 
          message: 'Error metrics retrieved successfully', 
          metrics: errorMetrics
        }; 
      } catch (error) {
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve error metrics', 
          metrics: []
        }; 
      }
    },

    getProjectSlowQueries: async (_: any, { projectId }: { projectId: string }, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to view slow query metrics for a specific project'); 
      }

      try {
        const slowMetrics = await getProjectSlowQueries(db, projectId); 
        // console.log('The project slow query metrics begin here:', slowMetrics); 
        return {
          code: 200, 
          success: true, 
          message: 'Slow query metrics retrieved successfully', 
          metrics: slowMetrics
        }; 
      } catch (error) {
        // console.log('The project slow query metrics error begins here:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve slow query metrics', 
          metrics: []
        }; 
      }
    }, 

    getProjectRegularQueries: async (_:any, { projectId }: { projectId: string }, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to view regular query metrics for a specific project'); 
      }
    
      try {
        const metrics = await getProjectRegularQueries(db, projectId); 
        // console.log('The project regular query metrics begin here:', metrics); 
        return {
          code: 200, 
          success: true, 
          message: 'Regular query metrics retrieved successfully', 
          metrics: metrics
        }; 
      } catch (error) {
        // console.log('The project regular query metrics error begins here:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve regular query metrics', 
          metrics: []
        }; 
      }
    },

    getApiKey: async (_: any, { showFull }: { showFull: boolean }, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to view your API key'); 
      }

      const apiKey = await getApiKey(db, userId); 

      if (!apiKey) {
        throw new Error('There was an error retrieving 3your API key'); 
      }

      // Return masked version for display
      const maskedKey = `${apiKey.substring(0, 6)}...${apiKey.slice(-4)}`;

      return {
        maskedKey,
        // Return full key only when explicitly requested
        fullKey: showFull ? apiKey : null
      };
    },

    //! Add rds security to databse queries!!! 
  }, 
  Mutation: {
    createQueryMetric: async (_: any, { input }: { input: MetricInput }, { db, userId }: { db: DbConnection, userId: string | null }) => {
    //   console.log('User input begins here:', input); 
    //   console.log('UserId begins here:', userId); 
      if (!userId) {
        throw new Error('You must be logged in to record metrics'); 
      }

      try {
        const project = await findProject(db, userId, input.projectName); 
        if (!project) {
          return {
            code: 500, 
            success: false, 
            message: 'Project not found'
          }; 
        }

        const apiKeyVerification = await verifyApiKey(db, userId);
        if (!apiKeyVerification) {
          return {
            code: 500, 
            success: false, 
            message: 'Invalid API key'
          }; 
        }

        const queryMetric = await createQueryMetric(db, project.id, input); 

        if (input.threshold_exceeded_by !== undefined) {
          await createSlowQuery(db, queryMetric.id, input.threshold_exceeded_by); 
        }

        if (input.errors && input.errors.length > 0) {
          for (const error of input.errors) {
            // console.log('This is an error object in the errorsArray:', error); 
            const insertError = await createError(db, queryMetric.id, error.message); 
            // console.log('This is insertError:', insertError); 
            for (const location of error.locations) {
            //   console.log('This is a locations object:', location); 
              await createErrorLocation(db, insertError.id, location.line, location.column); 
            }
          }
        }
        return {
          code: 200, 
          success: true, 
          message: 'Query metric stored successfully'
        }; 
      } catch (error) {
        // console.log('Error storing query metric:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to store query metric'
        }; 
      }
    }, 

    createProject: async (_:any, { input }: { input: ProjectInput }, { db, userId }: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to record metrics'); 
      }

      try {
        const project = await createProject(db, input.name, userId); 
        return {
          code: 200, 
          success: true, 
          message: 'Project created successfully'
        }; 
      } catch (error) {
        console.log('Error storing query metric:', error); 
        return {
          code: 500, 
          success: false, 
          message: 'Failed to create project'
        }; 
      }
    }, 
  }, 
}; 

export default metricResolvers; 
