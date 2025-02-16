import guardqlPlugin from "../guardqlPlugin";
import { GraphQLRequestContext, ApolloServer } from '@apollo/server';

// Mock global fetch
global.fetch = jest.fn(() => 
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      data: {
        createQueryMetric: {
          code: 200,
          success: true,
          message: "Metric stored successfully"
        }
      }
    })
  })
) as jest.Mock;

// Sample GraphQL schema for testing
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, World!'
  }
};

describe('GuardQL Plugin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('plugin initializes with correct configuration', () => {
    const plugin = guardqlPlugin({
      apiKey: 'testapikey',
      projectName: 'testproject',
      slowQueryThreshold: 500
    });

    expect(plugin).toBeDefined();
    expect(plugin.requestDidStart).toBeDefined();
  });

  test('captures query metrics for successful queries', async () => {
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        guardqlPlugin({
          apiKey: 'testapikey',
          projectName: 'testproject',
          slowQueryThreshold: 500
        })
      ]
    });

    await server.executeOperation({
      query: 'query { hello }'
    });

    // Wait for plugin to process
    await new Promise(resolve => setTimeout(resolve, 100));

    // Verify the fetch call was made with correct data
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);

    expect(url).toBe('https://guardql-backend-latest.onrender.com/graphql');
    expect(options.headers['api-key']).toBe('testapikey');
    expect(body.variables.input).toMatchObject({
      projectName: 'testproject',
      operation: 'query',
      query: 'query { hello }'
    });
  });

  test('identifies slow queries correctly', async () => {
    const slowResolvers = {
      Query: {
        hello: async () => {
          await new Promise(resolve => setTimeout(resolve, 600));
          return 'Hello, World!';
        }
      }
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers: slowResolvers,
      plugins: [
        guardqlPlugin({
          apiKey: 'testapikey',
          projectName: 'testproject',
          slowQueryThreshold: 500
        })
      ]
    });

    await server.executeOperation({
      query: 'query { hello }'
    });

    // Wait for plugin to process
    await new Promise(resolve => setTimeout(resolve, 700));

    const [_, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body.variables.input.threshold_exceeded_by).toBeGreaterThan(0);
  });

  test('captures errors in failed queries', async () => {
    const errorResolvers = {
      Query: {
        hello: () => {
          throw new Error('Test error');
        }
      }
    };

    const server = new ApolloServer({
      typeDefs,
      resolvers: errorResolvers,
      plugins: [
        guardqlPlugin({
          apiKey: 'testapikey',
          projectName: 'testproject',
          slowQueryThreshold: 500
        })
      ]
    });

    await server.executeOperation({
      query: 'query { hello }'
    });

    // Wait for plugin to process
    await new Promise(resolve => setTimeout(resolve, 100));

    const [_, options] = (global.fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(options.body);

    expect(body.variables.input.errors).toBeDefined();
    expect(body.variables.input.errors[0].message).toBe('Test error');
  });

  test('handles failed metric storage gracefully', async () => {
    // Mock console.error to check for error logging
    const consoleErrorSpy = jest.spyOn(console, 'error');
    
    // Mock fetch to simulate a network error
    (global.fetch as jest.Mock).mockImplementationOnce(() => 
      Promise.reject(new Error('Network error'))
    );
  
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      plugins: [
        guardqlPlugin({
          apiKey: 'testapikey',
          projectName: 'testproject',
          slowQueryThreshold: 500
        })
      ]
    });
  
    await server.executeOperation({
      query: 'query { hello }'
    });
  
    // Wait for plugin to process
    await new Promise(resolve => setTimeout(resolve, 100));
  
    // Updated expectation to match your actual error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Error sending metric to GuardQL dashboard:',
      expect.any(Error)
    );
  
    consoleErrorSpy.mockRestore();
  });
});