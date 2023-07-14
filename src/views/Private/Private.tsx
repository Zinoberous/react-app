import React from 'react';
import { connect } from 'react-redux';
import IPrivateProps from './IPrivateProps';

interface IProps extends IPrivateProps {
  token: string
}

function Private(props: IProps): JSX.Element {
  // TODO: check for permissions

  return props.render;
}

const mapStoreToProps = (state: any) => {
  return {
    token: state.login.token,
  };
}

export default connect(mapStoreToProps)(Private);
