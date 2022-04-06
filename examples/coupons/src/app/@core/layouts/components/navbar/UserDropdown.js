// ** React Imports
import Link from 'next/link';
import { useEffect, useState } from 'react';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Utils
import { isUserLoggedIn } from '@utils';

// ** Store & Actions
import { useDispatch } from 'react-redux';

// ** Third Party Components
import {
    User,
    Mail,
    CheckSquare,
    MessageSquare,
    Settings,
    CreditCard,
    HelpCircle,
    Power,
} from 'react-feather';

// ** Reactstrap Imports
import {
    UncontrolledDropdown,
    DropdownMenu,
    DropdownToggle,
    DropdownItem,
} from 'reactstrap';

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/portrait/small/avatar-s-13.jpg';

const UserDropdown = () => {
    // ** Store Vars
    const dispatch = useDispatch();

    // ** State
    const [userData, setUserData] = useState(null);

    //** ComponentDidMount
    useEffect(() => {
        if (isUserLoggedIn() !== null) {
            setUserData(JSON.parse(localStorage.getItem('userData')));
        }
    }, []);

    //** Vars
    const userAvatar = (userData && userData.avatar) || defaultAvatar.src;

    return (
        <UncontrolledDropdown tag="li" className="dropdown-user nav-item">
            <DropdownToggle
                href="/"
                tag="a"
                className="nav-link dropdown-user-link"
                onClick={(e) => e.preventDefault()}
            >
                <div className="user-nav d-sm-flex d-none">
                    <span className="user-name fw-bold">
                        {(userData && userData['username']) || 'John Doe'}
                    </span>
                    <span className="user-status">
                        {(userData && userData.role) || 'Admin'}
                    </span>
                </div>
                <Avatar
                    img={userAvatar}
                    imgHeight="40"
                    imgWidth="40"
                    status="online"
                />
            </DropdownToggle>
            <DropdownMenu end>
                <DropdownItem tag={Link} href="/pages/profile">
                    <a className="dropdown-item">
                        <User size={14} className="me-75" />
                        <span className="align-middle">Profile</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/apps/email">
                    <a className="dropdown-item">
                        <Mail size={14} className="me-75" />
                        <span className="align-middle">Inbox</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/apps/todo">
                    <a className="dropdown-item">
                        <CheckSquare size={14} className="me-75" />
                        <span className="align-middle">Tasks</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/apps/chat">
                    <a className="dropdown-item">
                        <MessageSquare size={14} className="me-75" />
                        <span className="align-middle">Chats</span>
                    </a>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} href="/pages/account-settings">
                    <a className="dropdown-item">
                        <Settings size={14} className="me-75" />
                        <span className="align-middle">Settings</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/pages/pricing">
                    <a className="dropdown-item">
                        <CreditCard size={14} className="me-75" />
                        <span className="align-middle">Pricing</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/pages/faq">
                    <a className="dropdown-item">
                        <HelpCircle size={14} className="me-75" />
                        <span className="align-middle">FAQ</span>
                    </a>
                </DropdownItem>
                <DropdownItem tag={Link} href="/login">
                    <a className="dropdown-item">
                        <Power size={14} className="me-75" />
                        <span className="align-middle">Logout</span>
                    </a>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    );
};

export default UserDropdown;
