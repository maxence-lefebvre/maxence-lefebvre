import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.css';

import { App } from './app/App';
import { AppProviders } from './app/AppProviders';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>,
);
