import cl from 'classnames';
import Head from 'next/head';
import Link from 'next/link';
import { Children, memo } from 'react';

import favicon from '../../../assets/images/coupons.ico';
import Menu from '../menu/Menu';

import type { ReactNode } from 'react';

import st from './PageLayout.module.scss';

export type PageLayoutProps = {
    pageTitle: string;
    children: [ReactNode, ReactNode] | ReactNode;
};

function PageLayout({ pageTitle, children }: PageLayoutProps) {
    const totalChildren = Children.count(children);
    const childrenArray = Children.toArray(children);
    const actions = totalChildren === 2 ? childrenArray[0] : null;
    const main = childrenArray[totalChildren === 2 ? 1 : 0];
    return (
        <div className={st['page-layout']}>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href={favicon.src} />
            </Head>
            <div className={st['nav-container']}>
                <Link href="/admin">
                    <a className={st['logo-container']}>
                        <i className={cl('bi bi-tags', st['logo-icon'])} />
                        <span className={st.logo}>Coupons Admin</span>
                    </a>
                </Link>
                <Menu />
            </div>
            <div className={st['page-content']}>
                <div className={st.header}>
                    <span className={st.title}>{pageTitle}</span>
                    {actions ? (
                        <div className={st.actions}>{actions}</div>
                    ) : null}
                </div>
                <div className={st.main}>
                    <main>{main}</main>
                </div>
            </div>
        </div>
    );
}

export default memo(PageLayout);
