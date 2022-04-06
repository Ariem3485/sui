// ** React Imports
import { useEffect } from 'react';
import NavLink from 'next/link';

// ** Icons Imports
import { Disc, X, Circle, Tag } from 'react-feather';

// ** Config
import themeConfig from '@configs/themeConfig';

const VerticalMenuHeader = (props) => {
    // ** Props
    const {
        menuCollapsed,
        setMenuCollapsed,
        setMenuVisibility,
        setGroupOpen,
        menuHover,
    } = props;

    // ** Reset open group
    useEffect(() => {
        if (!menuHover && menuCollapsed) setGroupOpen([]);
    }, [menuHover, menuCollapsed]);

    // ** Menu toggler component
    const Toggler = () => {
        if (!menuCollapsed) {
            return (
                <Disc
                    size={20}
                    data-tour="toggle-icon"
                    className="text-primary toggle-icon d-none d-xl-block"
                    onClick={() => setMenuCollapsed(true)}
                />
            );
        } else {
            return (
                <Circle
                    size={20}
                    data-tour="toggle-icon"
                    className="text-primary toggle-icon d-none d-xl-block"
                    onClick={() => setMenuCollapsed(false)}
                />
            );
        }
    };

    return (
        <div className="navbar-header">
            <ul className="nav navbar-nav flex-row">
                <li className="nav-item me-auto">
                    <NavLink href="/" className="navbar-brand">
                        <a className="navbar-brand">
                            <span className="brand-logo">
                                <Tag />
                            </span>
                            <h2 className="brand-text mb-0">
                                {themeConfig.app.appName}
                            </h2>
                        </a>
                    </NavLink>
                </li>
                <li className="nav-item nav-toggle">
                    <div className="nav-link modern-nav-toggle cursor-pointer">
                        <Toggler />
                        <X
                            onClick={() => setMenuVisibility(false)}
                            className="toggle-icon icon-x d-block d-xl-none"
                            size={20}
                        />
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default VerticalMenuHeader;
