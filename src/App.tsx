import React, { Suspense } from 'react';
import { connect } from 'react-redux';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Service from './services';
import { useStateCallback } from './hooks';
import { Header, Footer, Sidebar } from './components';
import { Spinner } from 'reactstrap';
import { Login, Private, Home } from './views';
import styles from './App.module.scss';
import 'bootstrap/dist/css/bootstrap.css';

interface IAppState {
  sidebarOpen: boolean;
  sidebarFixed: boolean;
  sidebarSize: number;
}

function App(): JSX.Element {
  const [state, setState] = useStateCallback<IAppState>({
    sidebarOpen: false,
    sidebarFixed: true,
    sidebarSize: 0,
  });

  return (
    <div className={styles.app}>
      <Service>
        <Header onToggleSidebar={() => setState({ sidebarOpen: !state.sidebarOpen })} />
        <Sidebar
          isOpen={state.sidebarOpen}
          close={() => setState({ sidebarOpen: false })}
          onChangeFixed={(sidebarFixed) => setState({ sidebarFixed })}
          onChangeSize={(sidebarSize) => setState({ sidebarSize })}
        />
        <div
          className={styles.content}
          style={{
            marginTop: '50px',
            marginLeft: (state.sidebarOpen && state.sidebarFixed ? `${state.sidebarSize}px` : 'unset'),
          }}
        >
          <HashRouter>
            <Suspense fallback={<Spinner type='border' />}>
              <Routes>
                {/* Default */}
                <Route
                  path='/'
                  element={<Navigate to='home' />}
                />
                {/* Not found */}
                <Route
                  path='*'
                  element={<Navigate to='home' />}
                />
                {/* Routes */}
                <Route
                  path='login'
                  element={<Login redirect='home' />}
                />
                <Route
                  path='home'
                  element={<Private render={<Home />} />}
                />
              </Routes>
            </Suspense>
          </HashRouter>
        </div>
        <Footer />
      </Service>
    </div>
  );
}

export default connect()(App);
