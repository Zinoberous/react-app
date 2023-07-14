import {
  getLocalValue,
  isNullOrWhitespace,
  removeLocalValue,
  setLocalValue
} from '../helper';

interface ILoginState {
  token: string|null;
}

const initialState: ILoginState = {
  token: getLocalValue('token')
};

interface IGetLoginAction {
  type: 'get_login';
}

interface ISetLoginAction extends ILoginState {
  type: 'set_login';
}

declare type ILoginAction  = IGetLoginAction | ISetLoginAction

const loginReducer = (state = initialState, { type, ...values }: ILoginAction) => {
  switch (type) {
    case 'set_login':
      const token = (values as ISetLoginAction).token;
      if (!isNullOrWhitespace(token)) {
        setLocalValue('token', token!);
      } else {
        removeLocalValue('token');
      }
      return { ...state, ...values };
    case 'get_login':
    default:
      return { ...state };
  }
}

export { loginReducer };
