import { getLocalValue } from '../helper';
import { JSON } from '../types';

interface ILoginState {
  token?: string
}

const initialState: ILoginState = {
  token: (getLocalValue('XX_Login') || undefined)
};

interface ISetLoginAction extends JSON {
  type: 'set_login' | 'get_login';
}

const loginReducer = (state = initialState, { type, ...values }: ISetLoginAction) => {
  switch (type) {
    case 'set_login':
      return { ...state, ...values };
    case 'get_login':
    default:
      return { ...state };
  }
}

export { loginReducer };
