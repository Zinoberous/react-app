import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Service from './services';
import { useStateCallback } from './hooks';
import { Spinner } from 'reactstrap';
import { Login, Private, Home } from './views';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

interface IAppState {
  sidebarOpen: boolean;
  sidebarFixed: boolean;
  sidebarSize: 'small' | 'large';
  footerSize: 'small' | 'large';
}

function App(): JSX.Element {
  const [state, setState] = useStateCallback<IAppState>({
    sidebarOpen: false,
    sidebarFixed: true,
    sidebarSize: 'large',
    footerSize: 'small',
  });

  return (
    <div className={styles.app}>
      <Service>
        <Header onToggleSidebar={() => setState({ sidebarOpen: !state.sidebarOpen })} />
        <Sidebar isOpen={state.sidebarOpen} onChangeFixed={(sidebarFixed) => setState({ sidebarFixed })} onChangeSize={(sidebarSize) => setState({ sidebarSize })} />
        <div
          className={styles.content}
          styles={{
            marginTop: '5px';
            marginLeft: (state.sidebarOpen && state.sidebarFixed ? (state.sidebarSize === 'large' ? '200px' : '50px') : 'unset')
            marginBottom: (state.footerSize === 'large' ? '300px' : '50px')
          }}
        >
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
                  path='login'
                  element={<Login />}
                />
                <Route
                  path='home'
                  element={<Private render={<Home />} />}
                />
              </Routes>
            </Suspense>
          </HashRouter>
        </div>
        <Footer onChangeSize={(footerSize) => setState({ footerSize })} />
      </Service>
    </div>
  );
}

export default connect()(App);
