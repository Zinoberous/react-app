import React from 'react';
import { ApiService, ApiServiceContext, IApiService } from './ApiService';
import { HubService, HubServiceContext, IHubService } from './HubService';

export interface IService extends IApiService, IHubService { }

function Service({ children }: any): JSX.Element {
  return (
    <ApiServiceContext.Provider value={ApiService}>
      <HubServiceContext.Provider value={HubService}>
        {children}
      </HubServiceContext.Provider>
    </ApiServiceContext.Provider>
  );
}

export default Service;

export * from './ApiService';
export * from './HubService';
