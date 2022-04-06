// ** React Imports
import NavLink from 'next/link';

// ** Third Party Components
import classnames from 'classnames';

// ** Reactstrap Imports
import { Badge } from 'reactstrap';
import cl from 'classnames';
import { useRouter } from 'next/router';

const VerticalNavMenuLink = ({ item, activeItem }) => {
    // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
    // const LinkTag = item.externalLink ? 'a' : NavLink;
    const LinkTag = NavLink;
    const { pathname } = useRouter();
    const active = pathname === item.navLink;
    return (
        <li
            className={classnames({
                'nav-item': !item.children,
                disabled: item.disabled,
                active: item.navLink === activeItem,
            })}
        >
            <LinkTag href={item.navLink || '/'}>
                <a
                    className={cl('d-flex align-items-center', { active })}
                    target={item.newTab ? '_blank' : undefined}
                    onClick={(e) => {
                        if (
                            item.navLink.length === 0 ||
                            item.navLink === '#' ||
                            item.disabled === true
                        ) {
                            e.preventDefault();
                        }
                    }}
                >
                    {item.icon}
                    <span className="menu-item text-truncate">
                        {item.title}
                    </span>

                    {item.badge && item.badgeText ? (
                        <Badge className="ms-auto me-1" color={item.badge} pill>
                            {item.badgeText}
                        </Badge>
                    ) : null}
                </a>
            </LinkTag>
        </li>
    );
};

export default VerticalNavMenuLink;
