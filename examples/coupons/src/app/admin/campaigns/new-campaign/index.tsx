import { useFormik } from 'formik';
import { memo, useCallback, useState } from 'react';
import { campaignSchema } from '../validations';

import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Col,
    Input,
    Form,
    Button,
    Label,
    Row,
    FormText,
    FormFeedback,
} from 'reactstrap';
import InputNumber from 'rc-input-number';
import { Plus, Minus } from 'react-feather';
import Flatpickr from 'react-flatpickr';
import toast from 'react-hot-toast';

import couponImg10 from '@images/sui_coupon_10.png';
import couponImg100 from '@images/sui_coupon_100.png';
import couponImg15 from '@images/sui_coupon_15.png';
import couponImg20 from '@images/sui_coupon_20.png';
import couponImg25 from '@images/sui_coupon_25.png';
import couponImg30 from '@images/sui_coupon_30.png';
import couponImg35 from '@images/sui_coupon_35.png';
import couponImg40 from '@images/sui_coupon_40.png';
import couponImg45 from '@images/sui_coupon_45.png';
import couponImg05 from '@images/sui_coupon_5.png';
import couponImg50 from '@images/sui_coupon_50.png';
import couponImg55 from '@images/sui_coupon_55.png';
import couponImg60 from '@images/sui_coupon_60.png';
import couponImg65 from '@images/sui_coupon_65.png';
import couponImg70 from '@images/sui_coupon_70.png';
import couponImg75 from '@images/sui_coupon_75.png';
import couponImg80 from '@images/sui_coupon_80.png';
import couponImg85 from '@images/sui_coupon_85.png';
import couponImg90 from '@images/sui_coupon_90.png';
import couponImg95 from '@images/sui_coupon_95.png';

const discountToImg: Record<number, string> = {
    5: couponImg05.src,
    10: couponImg10.src,
    15: couponImg15.src,
    20: couponImg20.src,
    25: couponImg25.src,
    30: couponImg30.src,
    35: couponImg35.src,
    40: couponImg40.src,
    45: couponImg45.src,
    50: couponImg50.src,
    55: couponImg55.src,
    60: couponImg60.src,
    65: couponImg65.src,
    70: couponImg70.src,
    75: couponImg75.src,
    80: couponImg80.src,
    85: couponImg85.src,
    90: couponImg90.src,
    95: couponImg95.src,
    100: couponImg100.src,
};

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export type NewCampaignModalProps = {};

function NewCampaign({}: NewCampaignModalProps) {
    const [saveInProgress, setSaveInProgress] = useState(false);
    const handleCreate = useCallback(async (data, { resetForm }) => {
        let toastRes: (v: unknown) => void;
        let toastRej: (v: unknown) => void;
        const toastPromise = new Promise((res, rej) => {
            toastRes = res;
            toastRej = rej;
        });
        toast.promise(toastPromise, {
            loading: 'Creating campaign...',
            success: 'Campaign created!',
            error: 'Creating campaign failed. Please try again',
        });
        setSaveInProgress(true);
        const validatedData = campaignSchema.cast(data);
        try {
            const res = await fetch('/api/campaigns', {
                method: 'post',
                headers: {
                    Accept: 'application/json',
                    'content-type': 'application/json',
                },
                body: JSON.stringify(validatedData),
            });
            if (!res.ok) {
                throw new Error(
                    `API call failed with status ${res.status}/${res.statusText}`
                );
            }
            resetForm();
            const resData = (await res.json())[0];
            // @ts-expect-error
            toastRes('');
            MySwal.fire({
                title: 'Success',
                html: `Campaign <b>${resData.name}</b> created successfully!`,
                icon: 'success',
                timerProgressBar: true,
                timer: 3000,
                customClass: {
                    confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
            });
        } catch (e) {
            console.log(e);
            // @ts-expect-error
            toastRej(e);
        } finally {
            setSaveInProgress(false);
        }
    }, []);
    const formik = useFormik({
        initialValues: {
            name: '',
            emails: '',
            emailTemplate: '',
            discount: 20,
            expiration: '',
        },
        onSubmit: handleCreate,
        validationSchema: campaignSchema,
    });
    const handleClear = useCallback(() => {
        if (saveInProgress) {
            return;
        }
        formik.resetForm();
    }, [formik, saveInProgress]);
    const handleDiscountChange = useCallback(
        (e) => {
            const mockEvent = {
                type: 'change',
                target: {
                    value: e,
                    name: 'discount',
                },
            };
            formik.handleChange(mockEvent);
        },
        [formik]
    );
    const discountFormatter = useCallback((t) => `${t}%`, []);
    const handleExpirationChange = useCallback(
        (e) => {
            const mockEvent = {
                type: 'change',
                target: {
                    value: e?.[0] || undefined,
                    name: 'expiration',
                },
            };
            formik.handleChange(mockEvent);
        },
        [formik]
    );
    const handleExpirationBlur = useCallback(
        (e) => {
            const mockEvent = {
                type: 'blur',
                target: {
                    name: 'expiration',
                },
            };
            formik.handleBlur(mockEvent);
        },
        [formik]
    );
    return (
        <Row>
            <Card>
                <CardHeader>
                    <CardTitle tag="h4">Create new Campaign</CardTitle>
                </CardHeader>
                <CardBody>
                    <Form onSubmit={formik.handleSubmit} noValidate>
                        <Row className="mb-3">
                            <Label sm="3" for="new-campaign-name">
                                Campaign Name:
                            </Label>
                            <Col sm="9">
                                <Input
                                    id="new-campaign-name"
                                    type="text"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    invalid={
                                        !!(
                                            formik.errors.name &&
                                            formik.touched.name
                                        )
                                    }
                                    disabled={saveInProgress}
                                />
                                <FormFeedback valid={false}>
                                    {formik.errors.name}
                                </FormFeedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label sm="3" for="new-campaign-discount">
                                Discount %:
                            </Label>
                            <Col sm="9">
                                <InputNumber
                                    id="new-campaign-discount"
                                    min={0}
                                    max={100}
                                    step={5}
                                    name="discount"
                                    onChange={handleDiscountChange}
                                    value={formik.values.discount}
                                    disabled={saveInProgress}
                                    upHandler={<Plus />}
                                    downHandler={<Minus />}
                                    formatter={discountFormatter}
                                />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label sm="3" for="new-campaign-expiration">
                                Expiration date:
                            </Label>
                            <Col sm="9">
                                <Flatpickr
                                    id="new-campaign-expiration"
                                    className="form-control"
                                    name="expiration"
                                    onChange={handleExpirationChange}
                                    value={formik.values.expiration}
                                    disabled={saveInProgress}
                                    onClose={handleExpirationBlur}
                                    options={{ minDate: 'today' }}
                                />
                                <Input
                                    hidden
                                    invalid={
                                        !!(
                                            formik.errors.expiration &&
                                            formik.touched.expiration
                                        )
                                    }
                                />
                                <FormFeedback valid={false}>
                                    {formik.errors.expiration}
                                </FormFeedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label sm="3" for="new-campaign-email-template">
                                Email Template:
                            </Label>
                            <Col cm="9">
                                <Input
                                    type="textarea"
                                    rows={5}
                                    name="emailTemplate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.emailTemplate}
                                    invalid={
                                        !!(
                                            formik.errors.emailTemplate &&
                                            formik.touched.emailTemplate
                                        )
                                    }
                                    disabled={saveInProgress}
                                />
                                <FormText>
                                    Message to be sent to the participants. Use
                                    @@_LINK_@@ and @@_KEY_@@ as placeholders
                                </FormText>
                                <FormFeedback valid={false}>
                                    {formik.errors.emailTemplate}
                                </FormFeedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label
                                sm="3"
                                for="new-campaign-participants-emails"
                            >
                                Emails:
                            </Label>
                            <Col sm="9">
                                <Input
                                    id="new-campaign-participants-emails"
                                    type="textarea"
                                    rows={5}
                                    name="emails"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.emails}
                                    invalid={
                                        !!(
                                            formik.errors.emails &&
                                            formik.touched.emails
                                        )
                                    }
                                    disabled={saveInProgress}
                                />
                                <FormText>
                                    Emails of the participants, separated with
                                    new line. Format: <i>Full Name - email</i>{' '}
                                    eg. <i>John Doe - j@doe.test</i>
                                </FormText>
                                <FormFeedback type="invalid">
                                    {(Array.isArray(formik.errors.emails)
                                        ? formik.errors.emails
                                        : [formik.errors.emails]
                                    )
                                        .flatMap((error) =>
                                            typeof error === 'object'
                                                ? Object.values(error)
                                                : error
                                        )
                                        .map((error, i) => (
                                            <div key={i}>{error}</div>
                                        ))}
                                </FormFeedback>
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Label sm="3" for="new-campaign-coupon-preview">
                                Coupon preview:
                            </Label>
                            <Col sm="9">
                                {discountToImg[formik.values.discount] && (
                                    <img
                                        src={
                                            discountToImg[
                                                formik.values.discount
                                            ]
                                        }
                                        alt="Coupon image"
                                        className="rounded"
                                        height="150"
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row>
                            <Col className="d-flex" md={{ size: 9, offset: 3 }}>
                                <Button
                                    className="me-2"
                                    color="secondary"
                                    onClick={handleClear}
                                    disabled={saveInProgress}
                                >
                                    Clear
                                </Button>
                                <Button
                                    color="primary"
                                    type="submit"
                                    disabled={saveInProgress}
                                >
                                    Mint NFT coupons &amp; send emails
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Row>
    );
}

export default memo(NewCampaign);
