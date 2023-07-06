import React from 'react';
import { connect } from 'react-redux';
import IHomeProps from './IHomeProps';
import IHomeSate from './IHomeState';
import { useStateCallback } from '../../../hooks';


function Home(props: IHomeProps): JSX.Element {
  const [state, setState] = useStateCallback<IHomeSate>({});
  return (
    <div className={styles.home}></div>
  );
}

export default connect()(Home);
