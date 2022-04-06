// ** React Imports
import { useContext } from 'react';

// ** Icons Imports
import { List } from 'react-feather';

// ** Custom Components
import Avatar from '@components/avatar';
import Timeline from '@components/timeline';
import AvatarGroup from '@components/avatar-group';

// ** Utils
import { kFormatter } from '@utils';

// ** Context
import { ThemeColors } from '@app/utility/context/ThemeColors';

// ** Reactstrap Imports
import { Row, Col, Card, CardHeader, CardTitle, CardBody } from 'reactstrap';

// ** Demo Components
import InvoiceList from '@app/views/apps/invoice/list';
import Sales from '@app/views/ui-elements/cards/analytics/Sales';
import AvgSessions from '@app/views/ui-elements/cards/analytics/AvgSessions';
import CardAppDesign from '@app/views/ui-elements/cards/advance/CardAppDesign';
import SupportTracker from '@app/views/ui-elements/cards/analytics/SupportTracker';
import OrdersReceived from '@app/views/ui-elements/cards/statistics/OrdersReceived';
import SubscribersGained from '@app/views/ui-elements/cards/statistics/SubscribersGained';
import CardCongratulations from '@app/views/ui-elements/cards/advance/CardCongratulations';

// ** Images
import jsonImg from '@src/assets/images/icons/json.png';
import ceo from '@src/assets/images/portrait/small/avatar-s-9.jpg';
import av1 from '@src/assets/images/portrait/small/avatar-s-9.jpg';
import av2 from '@src/assets/images/portrait/small/avatar-s-6.jpg';
import av3 from '@src/assets/images/portrait/small/avatar-s-8.jpg';
import av4 from '@src/assets/images/portrait/small/avatar-s-7.jpg';
import av5 from '@src/assets/images/portrait/small/avatar-s-20.jpg';

const AnalyticsDashboard = () => {
    // ** Context
    const { colors } = useContext(ThemeColors);

    // ** Vars
    const avatarGroupArr = [
        {
            imgWidth: 33,
            imgHeight: 33,
            title: 'Billy Hopkins',
            placement: 'bottom',
            img: av1.src,
        },
        {
            imgWidth: 33,
            imgHeight: 33,
            title: 'Amy Carson',
            placement: 'bottom',
            img: av2.src,
        },
        {
            imgWidth: 33,
            imgHeight: 33,
            title: 'Brandon Miles',
            placement: 'bottom',
            img: av3.src,
        },
        {
            imgWidth: 33,
            imgHeight: 33,
            title: 'Daisy Weber',
            placement: 'bottom',
            img: av4.src,
        },
        {
            imgWidth: 33,
            imgHeight: 33,
            title: 'Jenny Looper',
            placement: 'bottom',
            img: av5.src,
        },
    ];
    const data = [
        {
            title: '12 Invoices have been paid',
            content: 'Invoices have been paid to the company.',
            meta: '',
            metaClassName: 'me-1',
            customContent: (
                <div className="d-flex align-items-center">
                    <img
                        className="me-1"
                        src={jsonImg.src}
                        alt="data.json"
                        height="23"
                    />
                    <span>data.json</span>
                </div>
            ),
        },
        {
            title: 'Client Meeting',
            content: 'Project meeting with john @10:15am.',
            meta: '',
            metaClassName: 'me-1',
            color: 'warning',
            customContent: (
                <div className="d-flex align-items-center">
                    <Avatar img={ceo.src} />
                    <div className="ms-50">
                        <h6 className="mb-0">John Doe (Client)</h6>
                        <span>CEO of Infibeam</span>
                    </div>
                </div>
            ),
        },
        {
            title: 'Create a new project for client',
            content: 'Add files to new design folder',
            color: 'info',
            meta: '',
            metaClassName: 'me-1',
            customContent: <AvatarGroup data={avatarGroupArr} />,
        },
        {
            title: 'Create a new project for client',
            content: 'Add files to new design folder',
            color: 'danger',
            meta: '',
            metaClassName: 'me-1',
        },
    ];

    return (
        <div id="dashboard-analytics">
            <Row className="match-height">
                <Col lg="6" sm="12">
                    <CardCongratulations />
                </Col>
                <Col lg="3" sm="6">
                    <SubscribersGained kFormatter={kFormatter} />
                </Col>
                <Col lg="3" sm="6">
                    <OrdersReceived
                        kFormatter={kFormatter}
                        warning={colors.warning.main}
                    />
                </Col>
            </Row>
            <Row className="match-height">
                <Col lg="6" xs="12">
                    <AvgSessions primary={colors.primary.main} />
                </Col>
                <Col lg="6" xs="12">
                    <SupportTracker
                        primary={colors.primary.main}
                        danger={colors.danger.main}
                    />
                </Col>
            </Row>
            <Row className="match-height">
                <Col xs="12">
                    <InvoiceList />
                </Col>
            </Row>
        </div>
    );
};

export default AnalyticsDashboard;
