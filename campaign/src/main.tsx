import 'sass-reset';

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Layout} from 'src/components/layout.tsx';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(
  <StrictMode>
    <Layout />
  </StrictMode>,
);
