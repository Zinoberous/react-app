export default interface ILoginState {
  loading: boolean;
  email?: string;
  password?: string;
  authError: boolean;
  submitted: boolean;
}
