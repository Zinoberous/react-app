import React from 'react';
import { connect } from 'react-redux';
import IPrivateProps from './IPrivateProps';
import { isNull } from '../../helper';
import { Navigate } from 'react-router-dom';

interface IProps extends IPrivateProps {
  token: string
}

function Private(props: IProps): JSX.Element {
  if (isNull(props.token)) {
    return <Navigate to='login' />
  }

  return props.render;
}

const mapStoreToProps = (state: any) => {
  return {
    token: state.login.token,
  };
}

export default connect(mapStoreToProps)(Private);
