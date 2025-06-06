import { AuthoringUtils, Model, ModelClient } from '@adobe/aem-spa-page-model-manager';

// Custom model client meant to demonstrate how to customize the request sent to the AEM instance
export default class CustomModelClient extends ModelClient {
  // Fetches a model using the given resource path
  async fetch<M extends Model>(modelPath: string): Promise<M> {
    if (!AuthoringUtils.isInEditor()) {
      return Promise.resolve({} as M);
    }

    if (!modelPath) {
      return Promise.reject(new Error(`Invalid model path: ${modelPath}`));
    }

    if (!modelPath.includes(process.env.NEXT_PUBLIC_AEM_ROOT || '')) {
      modelPath = `${process.env.NEXT_PUBLIC_AEM_ROOT}${modelPath}`;
    }

    // Either the API host has been provided or we make an absolute request relative to the current host
    const url = this.apiHost ? `${this.apiHost}${modelPath}` : modelPath;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_AEM_AUTH || '',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error, status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
