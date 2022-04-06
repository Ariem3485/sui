// ** React Imports
import Link from 'next/link';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { deleteInvoice } from '../store';

// ** Reactstrap Imports
import {
    Badge,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    UncontrolledTooltip,
    UncontrolledDropdown,
} from 'reactstrap';

// ** Third Party Components
import {
    Eye,
    Send,
    Edit,
    Copy,
    Save,
    Info,
    Trash,
    PieChart,
    Download,
    TrendingUp,
    CheckCircle,
    MoreVertical,
    ArrowDownCircle,
} from 'react-feather';

// ** Vars
const invoiceStatusObj = {
    Sent: { color: 'light-secondary', icon: Send },
    Paid: { color: 'light-success', icon: CheckCircle },
    Draft: { color: 'light-primary', icon: Save },
    Downloaded: { color: 'light-info', icon: ArrowDownCircle },
    'Past Due': { color: 'light-danger', icon: Info },
    'Partial Payment': { color: 'light-warning', icon: PieChart },
};

// ** renders client column
const renderClient = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
        states = [
            'light-success',
            'light-danger',
            'light-warning',
            'light-info',
            'light-primary',
            'light-secondary',
        ],
        color = states[stateNum];

    if (row.avatar.length) {
        return (
            <Avatar className="me-50" img={row.avatar} width="32" height="32" />
        );
    } else {
        return (
            <Avatar
                color={color}
                className="me-50"
                content={row.client ? row.client.name : 'John Doe'}
                initials
            />
        );
    }
};

// ** Table columns
export const columns = [
    {
        name: '#',
        sortable: true,
        sortField: 'id',
        minWidth: '107px',
        // selector: row => row.id,
        cell: (row) => (
            <Link href={`/`}>
                <a>{`#${row.id}`}</a>
            </Link>
        ),
    },
    {
        sortable: true,
        minWidth: '102px',
        sortField: 'invoiceStatus',
        name: <TrendingUp size={14} />,
        // selector: row => row.invoiceStatus,
        cell: (row) => {
            const color = invoiceStatusObj[row.invoiceStatus]
                    ? invoiceStatusObj[row.invoiceStatus].color
                    : 'primary',
                Icon = invoiceStatusObj[row.invoiceStatus]
                    ? invoiceStatusObj[row.invoiceStatus].icon
                    : Edit;
            return (
                <Avatar
                    color={color}
                    icon={<Icon size={14} />}
                    id={`av-tooltip-${row.id}`}
                />
            );
        },
    },
    {
        name: 'Client',
        sortable: true,
        minWidth: '350px',
        sortField: 'client.name',
        // selector: row => row.client.name,
        cell: (row) => {
            const name = row.client ? row.client.name : 'John Doe',
                email = row.client
                    ? row.client.companyEmail
                    : 'johnDoe@email.com';
            return (
                <div className="d-flex justify-content-left align-items-center">
                    {renderClient(row)}
                    <div className="d-flex flex-column">
                        <h6 className="user-name text-truncate mb-0">{name}</h6>
                        <small className="text-truncate text-muted mb-0">
                            {email}
                        </small>
                    </div>
                </div>
            );
        },
    },
    {
        name: '% Discount',
        sortable: true,
        minWidth: '150px',
        sortField: 'discount',
        // selector: row => row.total,
        cell: (row) => <span>{row.discount || 0}%</span>,
    },
    {
        sortable: true,
        minWidth: '200px',
        name: 'Minted Date',
        sortField: 'mintDate',
        cell: (row) => row.mintDate,
        // selector: row => row.mintDate
    },
    {
        sortable: true,
        name: 'Claimed',
        minWidth: '164px',
        sortField: 'claimed',
        // selector: row => row.claimed,
        cell: (row) => {
            const { claimed } = row;
            const color = claimed ? 'light-success' : 'light-warning';
            return (
                <Badge color={color} pill>
                    {claimed ? 'Yes' : 'No'}
                </Badge>
            );
        },
    },
    {
        name: 'Action',
        minWidth: '110px',
        cell: (row) => (
            <div className="column-action d-flex align-items-center">
                <Send
                    className="cursor-pointer"
                    size={17}
                    id={`send-tooltip-${row.id}`}
                />
                <UncontrolledTooltip
                    placement="top"
                    target={`send-tooltip-${row.id}`}
                >
                    Send Mail
                </UncontrolledTooltip>
                <Link href={`/`}>
                    <a id={`pw-tooltip-${row.id}`}>
                        <Eye size={17} className="mx-1" />
                    </a>
                </Link>
                <UncontrolledTooltip
                    placement="top"
                    target={`pw-tooltip-${row.id}`}
                >
                    Preview
                </UncontrolledTooltip>
                <UncontrolledDropdown>
                    <DropdownToggle tag="span">
                        <MoreVertical size={17} className="cursor-pointer" />
                    </DropdownToggle>
                    <DropdownMenu end>
                        <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Download size={14} className="me-50" />
                            <span className="align-middle">Download</span>
                        </DropdownItem>
                        <DropdownItem
                            tag={Link}
                            href={`/apps/invoice/edit/${row.id}`}
                            className="w-100"
                        >
                            <a className="w-100 dropdown-item">
                                <Edit size={14} className="me-50" />
                                <span className="align-middle">Edit</span>
                            </a>
                        </DropdownItem>
                        <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={(e) => {
                                e.preventDefault();
                                store.dispatch(deleteInvoice(row.id));
                            }}
                        >
                            <Trash size={14} className="me-50" />
                            <span className="align-middle">Delete</span>
                        </DropdownItem>
                        <DropdownItem
                            tag="a"
                            href="/"
                            className="w-100"
                            onClick={(e) => e.preventDefault()}
                        >
                            <Copy size={14} className="me-50" />
                            <span className="align-middle">Duplicate</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        ),
    },
];
