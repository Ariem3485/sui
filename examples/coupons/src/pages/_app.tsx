import type { AppProps } from 'next/app';
import { store } from '@store/store';
import { Provider } from 'react-redux';
import { ThemeContext } from '@app/utility/context/ThemeColors';
import { Toaster } from 'react-hot-toast';
import type { ToastPosition } from 'react-hot-toast';
import themeConfig from '@app/configs/themeConfig';

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
import '@styles/react/libs/react-hot-toasts/react-hot-toasts.scss';
import '@styles/base/plugins/extensions/ext-component-sweet-alerts.scss';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <ThemeContext>
                <Component {...pageProps} />;
                <Toaster
                    position={themeConfig.layout.toastPosition as ToastPosition}
                    toastOptions={{ className: 'react-hot-toast' }}
                />
            </ThemeContext>
        </Provider>
    );
}

export default MyApp;
