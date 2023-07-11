import React, { useContext } from 'react';
import { connect, useDispatch } from 'react-redux';
import { ILoginProps } from './ILoginProps';
import { ILoginState } from './ILoginState';
import { useStateCallback } from '../../hooks';
import { ApiServiceContext } from '../../services';
import { setLocalValue } from '../../helper';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import styles from './Login.module.scss';

function Login(props: ILoginProps): JSX.Element {
  const [state, setState] = useStateCallback<ILoginState>({
    loading: false,
    email: null,
    password: null,
    authError: false,
    submitted: false
  });

  if (state.submitted) {
    return <Navigate to={props.redirect} />;
  }

  const service = useContext(ApiServiceContext);

  const dispatch = useDispatch();

  return (
    <div className={styles.login}>
      <Form
        onSubmit={(e) => {
          e.preventDefault();

          setState({ loading: true }, () => {
            const { email, password } = state;

            service.login(email, password)
              .then((token) => {
                setLocalValue('XX_Login', token, new Date(new Date().setHours(23, 59, 59, 999)));
                dispatch({ type: 'set_login', token });
                setState({ submitted: true });
              })
              .catch(() => {
                dispatch({ type: 'set_login', token: null });
                setState({ authError: true });
              })
              .finally(() => setState({ loading: false }));
          });
        }}
      >
        <FormGroup>
          <Label>E-Mail</Label>
          <Input
            type='email'
            required
            placeholder='E-Mail:'
            onChange={(e) => setState({ email: e.target.value })}
            invalid={state.authError}
          />
        </FormGroup>
        <FormGroup>
          <Label>Passwort</Label>
          <Input
            type='password'
            required
            placeholder='Passwort:'
            onChange={(e) => setState({ password: e.target.value })}
            invalid={state.authError}
          />
          <FormFeedback invalid>E-Mail oder Passwort ungültig!</FormFeedback>
        </FormGroup>
        <Button>
          {
            state.loading
              ? <>Loading...</>
              : <>Login</>
          }
        </Button>
      </Form>
    </div>
  );
}

function mapSoreToProps() {
}

export default connect(mapSoreToProps)(Login);
