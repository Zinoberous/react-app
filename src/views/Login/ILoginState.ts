export default interface ILoginState {
  loading: boolean;
  user: string;
  password: string;
  authError: boolean;
  submitted: boolean;
}
