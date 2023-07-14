import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { Login, Private, Home } from './views';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

function App(): JSX.Element {
  return (
    <div className={styles.app}>
      <HashRouter>
        <Suspense fallback={<Spinner type='border' />}>
          <Routes>
            {/* Default */}
            <Route
              path='/'
              element={<Navigate replace to='login' />}
            />
            {/* Not found */}
            <Route
              path='*'
              element={<>Existiert nicht!</>}
            />
            {/* Routes */}
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='home'
              element={<Private Component={Home} />}
            />
          </Routes>
        </Suspense>
      </HashRouter>
    </div>
  );
}

export default App;
