import 'sass-reset';
import 'normalize.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/select/lib/css/blueprint-select.css';
import '@blueprintjs/datetime2/lib/css/blueprint-datetime2.css';
import '@blueprintjs/datetime/lib/css/blueprint-datetime.css';
import '@blueprintjs/table/lib/css/table.css';
import 'src/styles/globals.scss';

import {createRoot} from 'react-dom/client';
import {DefaultLayout} from 'src/layouts/default-layout';

const container = document.getElementById('root') as HTMLDivElement;

createRoot(container).render(<DefaultLayout />);
