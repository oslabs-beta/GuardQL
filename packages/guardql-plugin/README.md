# GuardQL Plugin

A powerful Apollo Server plugin for tracking GraphQL query metrics and errors. This plugin automatically captures query execution times, identifies slow queries, and tracks errors, sending the data to your GuardQL dashboard for monitoring and analysis.

## Installation

```bash
npm install guardql
# or
yarn add guardql
```

## Usage

```typescript
import { ApolloServer } from '@apollo/server';
import { guardqlPlugin } from 'guardql';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [
    guardqlPlugin({
      apiKey: 'your-api-key',
      projectName: 'your-project-name',
      slowQueryThreshold: 1000 // in milliseconds
    })
  ]
});
```

## Configuration Options

- `apiKey` (required): The GuardQL API key generated for you when you create an account on the GuardQL dashboard
- `projectName` (required): The name of your project in your GuardQL dashboard
- `slowQueryThreshold` (required): The threshold in milliseconds to identify slow queries

## Features

- ⚡ Automatic query execution time tracking
- 🔍 Slow query identification
- ❌ Error tracking and reporting
<!-- - 📊 Real-time metrics transmission to GuardQL dashboard -->
- 🕒 Timestamp tracking for all operations

## Comprehensive Documentation

For detailed documentation, including:
- Complete system architecture
- Dashboard integration details
- Best practices and examples
- Troubleshooting guides

Visit our [main documentation](https://github.com/oslabs-beta/GuardQL).

## Support

- 📝 File plugin-specific issues in this repository
- 🔧 For dashboard-related issues or general questions, visit our [main repository](https://github.com/oslabs-beta/GuardQL)

## License

MIT