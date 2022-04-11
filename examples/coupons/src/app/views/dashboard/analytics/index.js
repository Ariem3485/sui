// ** React Imports
import { useContext } from 'react';

// ** Utils
import { kFormatter } from '@utils';

// ** Context
import { ThemeColors } from '@app/utility/context/ThemeColors';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Demo Components
import InvoiceList from '@app/views/apps/invoice/list';
import AvgSessions from '@app/views/ui-elements/cards/analytics/AvgSessions';
import SupportTracker from '@app/views/ui-elements/cards/analytics/SupportTracker';
import OrdersReceived from '@app/views/ui-elements/cards/statistics/OrdersReceived';
import SubscribersGained from '@app/views/ui-elements/cards/statistics/SubscribersGained';
import CardCongratulations from '@app/views/ui-elements/cards/advance/CardCongratulations';

const AnalyticsDashboard = () => {
    // ** Context
    const { colors } = useContext(ThemeColors);

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
