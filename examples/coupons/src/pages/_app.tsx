import type { AppProps } from 'next/app';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { ThemeContext } from '@app/utility/context/ThemeColors';

import '../styles/globals.scss';
import '@styles/base/bootstrap-extended/_include.scss';
import '@components/autocomplete/autocomplete.scss';
import '@styles/base/core/menu/menu-types/vertical-menu.scss';
import '@styles/base/core/menu/menu-types/vertical-overlay-menu.scss';
import '@styles/react/libs/react-select/_react-select.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'animate.css/animate.css';
import '@styles/react/libs/charts/apex-charts.scss';
import '@styles/react/apps/app-invoice.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import '@styles/react/libs/input-number/input-number.scss';
import '@styles/react/libs/flatpickr/flatpickr.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeContext>
                <Component {...pageProps} />;
            </ThemeContext>
        </Provider>
    );
}

export default MyApp;
