import React from 'react';
import Routes from './routes';
import { ApolloProvider } from '@apollo/client'
import api from './services/api';

import GlobalStyles from './styles/global'

function App() {
  return (
    <ApolloProvider client={api}>
      <GlobalStyles />
      <Routes />
    </ApolloProvider>

  );
}

export default App;
