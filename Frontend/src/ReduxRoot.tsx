import * as React from 'react';
import { Provider } from 'react-redux';
import Gigatester from './App';
import configureStore from './configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#042E5B',
    },
  },
});

const { store, persistor } = configureStore();

function ReduxRoot() {
  return (
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <Gigatester />
        </MuiThemeProvider>
      </Provider>
    </PersistGate>
  );
}

export default ReduxRoot;
