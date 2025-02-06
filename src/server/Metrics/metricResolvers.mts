import { getProjectErrorMetrics, createProject, getUserProjects, findProject, createQueryMetric, createSlowQuery, createError, createErrorLocation } from './databaseQueries.mjs'
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

    getProjectErrorMetrics: async (_: any, { projectId }: { projectId: string }, { db, userId}: { db: DbConnection, userId: string | null }) => {
      if (!userId) {
        throw new Error('You must be logged in to view metrics for a specific project'); 
      }

      try {
        const metrics = await getProjectErrorMetrics(db, projectId); 
        console.log('The project error metrics begin here:', metrics); 
        return {
          code: 200, 
          success: true, 
          message: 'Projects retrieved successfully', 
          metrics: metrics
        }; 
      } catch (error) {
        return {
          code: 500, 
          success: false, 
          message: 'Failed to retrieve project metrics', 
          metrics: []
        }; 
      }
    },

    //! Add rds security to databse queries!!! 
    // getAllMetrics: async (_: any, { projectId }: { projectId: string }, { db, userId}: { db: DbConnection, userId: string | null }) => {
    //     if (!userId) {
    //       throw new Error('You must be logged in to view metrics'); 
    //     }
    //   },
  }, 
  Mutation: {
    createQueryMetric: async (_: any, { input }: { input: MetricInput }, { db, userId }: { db: DbConnection, userId: string | null }) => {
    //   console.log('User input begins here:', input); 
    //   console.log('UserId begins here:', userId); 
      if (!userId) {
        throw new Error('You must be logged in to record metrics'); 
      }
    //! refactor to use api keys instead of username to locate project 
      try {
        const project = await findProject(db, input.username, input.projectName); 
        if (!project) {
          throw new Error('Project not found'); 
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
