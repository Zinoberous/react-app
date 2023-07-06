import React, { createContext } from 'react';
import axios from 'axios';
import Store from '../store';
import { encryptRsa, getHash } from '../helper';

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

async function login(email: string, password: string): Promise<string> {
  return call('POST', process.env.REACT_APP_API_LOGIN, {}, { Authorization: `Basic ${email}:${encryptRsa(process.env.REACT_APP_LOGIN_PUBLIC_KEY, getHash(password))}` });
}
