import React, { createContext } from 'react';
import axios from 'axios';
import Store from '../store';

export interface IApiService {
  login: (email: string, password: string) => Promise<string>;
}

export const ApiServiceContext = createContext<IApiService | undefined>(undefined);
export const ApiService: IApiService = {
  login
};

async function call(method: 'GET' | 'POST' | 'PUT' | 'DELETE', api: string, params: any = {}, header: any = {}, data: any = {}): Promise<any> {
  return axios({
    method: method,
    url: `${process.env.REACT_APP_API_BASE}/${api}`,
    params: params,
    headers: { Authorization: `Bearer ${Store.getState().login.token}`, ...header },
    data: data
  });
}

async function login(user: string, password: string): Promise<string> {
  var formData = new FormData();

  formData.append('user', user);
  formData.append('password', password);

  return call('POST', process.env.REACT_APP_API_LOGIN, {}, {}, formData);
}
