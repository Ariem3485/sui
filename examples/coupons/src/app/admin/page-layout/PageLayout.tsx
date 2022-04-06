import Head from 'next/head';
import { memo } from 'react';
import Layout from '@layouts/VerticalLayout';
import LayoutWrapper from '@layouts/components/layout-wrapper';
import favicon from '../../../assets/images/coupons.ico';

import type { ReactNode } from 'react';
import {
    Calendar,
    CheckSquare,
    Circle,
    Home,
    Mail,
    MessageSquare,
    Plus,
    Shield,
    Tag,
    User,
} from 'react-feather';

export type PageLayoutProps = {
    pageTitle: string;
    children: [ReactNode, ReactNode] | ReactNode;
};

const menuData = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        icon: <Home size={20} />,
        badge: 'light-warning',
        badgeText: '1',
        children: [
            {
                id: 'analyticsDash',
                title: 'Analytics',
                icon: <Circle size={12} />,
                navLink: '/',
            },
        ],
    },
    {
        id: 'users',
        title: 'Users',
        icon: <User size={20} />,
        children: [
            {
                id: 'list',
                title: 'List',
                icon: <Circle size={12} />,
                navLink: '/apps/user/list',
            },
            {
                id: 'view',
                title: 'View',
                icon: <Circle size={12} />,
                navLink: '/apps/user/view',
            },
        ],
    },
    {
        header: 'Campaigns',
    },
    {
        id: 'campaigns-create',
        title: 'Create',
        icon: <Plus size={12} />,
        navLink: '/campaigns/create',
    },
    {
        id: 'campaigns-view',
        title: 'List',
        icon: <Tag size={12} />,
        navLink: '/campaigns',
    },
    {
        header: 'Apps',
    },
    {
        id: 'email',
        title: 'Email',
        icon: <Mail size={20} />,
        navLink: '/apps/email',
    },
    {
        id: 'chat',
        title: 'Chat',
        icon: <MessageSquare size={20} />,
        navLink: '/apps/chat',
    },
    {
        id: 'todo',
        title: 'Todo',
        icon: <CheckSquare size={20} />,
        navLink: '/apps/todo',
    },
    {
        id: 'calendar',
        title: 'Calendar',
        icon: <Calendar size={20} />,
        navLink: '/apps/calendar',
    },
    { header: 'Admin' },
    {
        id: 'roles-permissions',
        title: 'Roles & Permissions',
        icon: <Shield size={20} />,
        children: [
            {
                id: 'roles',
                title: 'Roles',
                icon: <Circle size={12} />,
                navLink: '/apps/roles',
            },
            {
                id: 'permissions',
                title: 'Permissions',
                icon: <Circle size={12} />,
                navLink: '/apps/permissions',
            },
        ],
    },
];

function PageLayout({ pageTitle, children }: PageLayoutProps) {
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href={favicon.src} />
            </Head>
            <Layout menuData={menuData}>
                <LayoutWrapper>{children}</LayoutWrapper>
            </Layout>
        </>
    );
}

export default memo(PageLayout);
