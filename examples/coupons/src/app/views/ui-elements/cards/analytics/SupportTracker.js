import { kFormatter } from '@src/app/utility/Utils';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardBody,
    CardText,
    CardTitle,
    CardHeader,
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from 'reactstrap';

const SupportTracker = (props) => {
    const data = {
        title: 'Live Coupons',
        last_days: ['Last 28 Days', 'Last Month', 'Last Year'],
        total: 8700,
        total25: 2200,
        total20: 1700,
        total15: 4800,
    };

    const options = {
            plotOptions: {
                radialBar: {
                    size: 150,
                    offsetY: 20,
                    startAngle: -150,
                    endAngle: 150,
                    hollow: {
                        size: '65%',
                    },
                    track: {
                        background: '#fff',
                        strokeWidth: '100%',
                    },
                    dataLabels: {
                        name: {
                            offsetY: -5,
                            fontFamily: 'Montserrat',
                            fontSize: '1rem',
                        },
                        value: {
                            offsetY: 15,
                            fontFamily: 'Montserrat',
                            fontSize: '1.714rem',
                        },
                    },
                },
            },
            colors: [props.danger],
            fill: {
                type: 'gradient',
                gradient: {
                    shade: 'dark',
                    type: 'horizontal',
                    shadeIntensity: 0.5,
                    gradientToColors: [props.primary],
                    inverseColors: true,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100],
                },
            },
            stroke: {
                dashArray: 8,
            },
            labels: ['Submitted Coupons'],
        },
        series = [83];

    return data !== null ? (
        <Card>
            <CardHeader className="pb-0">
                <CardTitle tag="h4">{data.title}</CardTitle>
                <UncontrolledDropdown className="chart-dropdown">
                    <DropdownToggle
                        color=""
                        className="bg-transparent btn-sm border-0 p-50"
                    >
                        Last 7 days
                    </DropdownToggle>
                    <DropdownMenu end>
                        {data.last_days.map((item) => (
                            <DropdownItem className="w-100" key={item}>
                                {item}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </UncontrolledDropdown>
            </CardHeader>
            <CardBody>
                <Row>
                    <Col
                        sm="2"
                        className="d-flex flex-column flex-wrap text-center"
                    >
                        <h1 className="font-large-2 fw-bolder mt-2 mb-0">
                            {kFormatter(data.total)}
                        </h1>
                        <CardText>NFTs</CardText>
                    </Col>
                    <Col sm="10" className="d-flex justify-content-center">
                        <Chart
                            options={options}
                            series={series}
                            type="radialBar"
                            height={270}
                            id="support-tracker-card"
                        />
                    </Col>
                </Row>
                <div className="d-flex justify-content-between mt-1">
                    <div className="text-center">
                        <CardText className="mb-50">25% off</CardText>
                        <span className="font-large-1 fw-bold">
                            {kFormatter(data.total25)}
                        </span>
                    </div>
                    <div className="text-center">
                        <CardText className="mb-50">20% off</CardText>
                        <span className="font-large-1 fw-bold">
                            {kFormatter(data.total20)}
                        </span>
                    </div>
                    <div className="text-center">
                        <CardText className="mb-50">15% off</CardText>
                        <span className="font-large-1 fw-bold">
                            {kFormatter(data.total15)}
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    ) : null;
};
export default SupportTracker;
