import { gql } from '@apollo/client';

// GraphQL Queries
export const GET_PROJECT_ERRORS = gql`
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

export const GET_PROJECT_SLOW_QUERIES = gql`
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

export const GET_PROJECT_REGULAR_QUERIES = gql`
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

export const CREATE_PROJECT = gql`
  mutation CreateProject($input: CreateProjectInput!) {
    createProject(input: $input) {
      code
      success
      message
    }
  }
`; 