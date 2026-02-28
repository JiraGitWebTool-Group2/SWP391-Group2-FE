export interface IntegrationConfigRequest {
  provider: string;
  baseUrl: string;
  projectKey?: string;
  org?: string;
  token: string;
}
