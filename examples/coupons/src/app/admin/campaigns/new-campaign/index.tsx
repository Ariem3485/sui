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

export type NewCampaignModalProps = {};

function NewCampaign({}: NewCampaignModalProps) {
    const [saveInProgress, setSaveInProgress] = useState(false);
    const handleCreate = useCallback(async (data, { resetForm }) => {
        setSaveInProgress(true);
        const validatedData = campaignSchema.cast(data);
        console.log({ data, validatedData });
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
        } catch (e) {
            console.log(e);
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
