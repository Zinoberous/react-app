import React from 'react';
import { connect } from 'react-redux';
import { ILoginProps } from './ILoginProps';
import { ILoginState } from './ILoginState';
import useStateCallback from '../../hooks/useStateCallback';
import styles from './Login.module.scss';

interface IProps extends ILoginProps {
}

function Login(props: IProps): JSX.Element {
  const [state, setState] = useStateCallback<ILoginState>({});

  return (
    <div className={styles.login}></div>
  );
}

function mapSoreToProps() {
}

export default connect(mapSoreToProps)(Login);
