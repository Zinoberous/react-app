import { JSON } from '../types';

interface IAuthState {
  email?: string;
  password?: string;
}

const initialState: IAuthState = { };

interface ISetAuthAction extends JSON {
  type: 'set_auth'|'get_auth';
}

const authReducer = (state = initialState, { type, ...values }: ISetAuthAction) => {
  switch (type) {
    case 'set_auth':
      return { ...state, ...values };
    case 'get_auth':
    default:
      return { ...state };
  }
}

export { authReducer };
