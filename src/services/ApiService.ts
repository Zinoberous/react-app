import React, { createContext } from 'react';
import axios from 'axios';
import Store from '../store';

export interface IApiService {
  login: (email: string, password: string) => Promise<string>;
  getData: () => Promise<any>;
}

export const ApiServiceContext = createContext<IApiService | undefined>(undefined);
export const ApiService: IApiService = {
  login,
  getData
};

async function login(user: string, password: string): Promise<string> {
  var formData = new FormData();

  formData.append('user', user);
  formData.append('password', password);

  return (await axios({
    method: 'POST',
    url: `${process.env.REACT_APP_API_BASE}/${process.env.REACT_APP_API_LOGIN}`,
    data: formData
  })).data;
}

async function call(method: 'GET' | 'POST' | 'PUT' | 'DELETE', api: string, params: any = {}, header: any = {}, data: any = {}): Promise<any> {
  return (await axios({
    method: method,
    url: `${process.env.REACT_APP_API_BASE}/${api}`,
    params: params,
    headers: { Authorization: `Bearer ${Store.getState().login.token}`, ...header },
    data: data
  })).data;
}

async function getData(): Promise<string> {
  return await call('POST', process.env.REACT_APP_API_DATA!);
}
