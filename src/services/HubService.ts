import React, { createContext } from 'react';
import { HttpTransportType, HubConnection, HubConnectionBuilder, HubConnectionState, IHttpConnectionOptions } from '@microsoft/signalr';
import Store from '../stores';

export interface IKeyValuePair {
  key: string;
  value: any;
}

export interface IHubService {
  initHubConnection: () => Promise<void>;
  startHubConnection: () => Promise<void>;
  stopHubConnection: () => Promise<void>;
  invokeSomething: () => Promise<void>;
  onSomething: (callback: () => void) => void,
}

export const HubServiceContext = createContext<IHubService | undefined>(undefined);
export const HubService: IHubService = {
  initHubConnection,
  startHubConnection,
  stopHubConnection,
  invokeSomething,
  onSomething
};

//#region init

let hubConnection: HubConnection;

let hubOptions: IHttpConnectionOptions = {
  accessTokenFactory: async () => {
    return Store.getState().login.token!;
  }
};

if (process.env.NODE_ENV === 'development') {
  hubOptions = {
    ...hubOptions,
    skipNegotiation: true,
    transport: HttpTransportType.WebSockets
  };
}

async function initHubConnection(): Promise<void> {
  hubConnection = new HubConnectionBuilder()
    .withUrl(`${process.env.REACT_APP_HUB_BASE}`, hubOptions)
    .withAutomaticReconnect()
    .build();
}

async function startHubConnection(): Promise<void> {
  if (hubConnection.state === HubConnectionState.Disconnected) {
    return hubConnection.start();
  }
}

async function stopHubConnection(): Promise<void> {
  return hubConnection.stop();
}

//#endregion

//#region invoke

async function invokeSomething(): Promise<void> {
  return hubConnection.invoke(process.env.REACT_APP_HUB_INVOKE_SOMETHING!);
}

//#endregion

//#region on

function onSomething(callback: () => void): void {
  hubConnection.on(process.env.REACT_APP_HUB_ON_SOMETHING!, callback);
}

//#endregion
