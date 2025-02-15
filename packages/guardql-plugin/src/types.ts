// type for plugin configuration 
export interface pluginConfig {
  // user inputs their API key to identify which project GuardQL is tracking queries for
  apiKey: string; 
  // name of the project to identify which project to create the metric for
  projectName: string; 
  // user inputs a specific threshold (ms) for the plugin to flag slow queries 
  slowQueryThreshold: number; 
}