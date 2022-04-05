import cl from 'classnames';
import Link from 'next/link';

import st from './Menu.module.scss';

function Menu() {
    return (
        <nav className={st.menu}>
            <Link href="/admin">
                <a className={cl(st.item, st.active)}>
                    <i className={cl('bi bi-megaphone', st.icon)} /> Campaigns
                </a>
            </Link>
        </nav>
    );
}

export default Menu;
