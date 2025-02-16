import { ApolloServerPlugin } from "@apollo/server";
import { pluginConfig } from './types';
declare const guardqlPlugin: (config: pluginConfig) => ApolloServerPlugin;
export default guardqlPlugin;
