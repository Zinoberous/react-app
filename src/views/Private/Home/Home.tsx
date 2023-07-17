import React from 'react';
import { connect } from 'react-redux';
import IHomeProps from './IHomeProps';
import IHomeSate from './IHomeState';
import { useStateCallback } from '../../../hooks';
import styles from './Home.module.scss';


function Home(props: IHomeProps): JSX.Element {
  const [state, setState] = useStateCallback<IHomeSate>({});
  return (
    <div className={styles.home}></div>
  );
}

export default connect()(Home);
