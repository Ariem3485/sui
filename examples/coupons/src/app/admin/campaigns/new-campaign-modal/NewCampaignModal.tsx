import { useFormik } from 'formik';
import { memo, useCallback, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Campaign } from '../../../server/CampaignsStore';
import { campaignSchema } from '../validations';

export type NewCampaignModalProps = {
    isVisible: boolean;
    onHide: (campaign?: Campaign) => void;
};

function NewCampaignModal({ isVisible, onHide }: NewCampaignModalProps) {
    const [saveInProgress, setSaveInProgress] = useState(false);
    const handleCreate = useCallback(
        async (data, { resetForm }) => {
            setSaveInProgress(true);
            const validatedData = campaignSchema.cast(data);
            try {
                const res = await fetch('/api/campaigns', {
                    method: 'post',
                    headers: {
                        Accept: 'application/json',
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ ...validatedData, test: 1 }),
                });
                if (!res.ok) {
                    throw new Error(
                        `API call failed with status ${res.status}/${res.statusText}`
                    );
                }
                resetForm();
                onHide((await res.json())?.[0]);
            } catch (e) {
                console.log(e);
            } finally {
                setSaveInProgress(false);
            }
        },
        [onHide]
    );
    const formik = useFormik({
        initialValues: {
            name: '',
            emails: '',
            emailTemplate: '',
            discount: 20,
        },
        onSubmit: handleCreate,
        validationSchema: campaignSchema,
    });
    const handleClose = useCallback(() => {
        if (saveInProgress) {
            return;
        }
        formik.resetForm();
        onHide();
    }, [onHide, formik, saveInProgress]);
    return (
        <Modal show={isVisible} onHide={handleClose} backdrop size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Create new Campaign</Modal.Title>
            </Modal.Header>
            <Form onSubmit={formik.handleSubmit} noValidate>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="new-campaign-name">
                        <Form.Label>Campaign Name:</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            isInvalid={
                                !!(formik.errors.name && formik.touched.name)
                            }
                            disabled={saveInProgress}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.name}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="new-campaign-discount"
                    >
                        <Form.Label>Discount %:</Form.Label>
                        <Form.Control
                            type="number"
                            min={0}
                            max={100}
                            name="discount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discount}
                            isInvalid={
                                !!(
                                    formik.errors.discount &&
                                    formik.touched.discount
                                )
                            }
                            readOnly
                            disabled={saveInProgress}
                        ></Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.discount}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="new-campaign-email-template"
                    >
                        <Form.Label>Email Template:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="emailTemplate"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emailTemplate}
                            isInvalid={
                                !!(
                                    formik.errors.emailTemplate &&
                                    formik.touched.emailTemplate
                                )
                            }
                            disabled={saveInProgress}
                        ></Form.Control>
                        <Form.Text muted>
                            Message to be sent to the participants. Use
                            @@_LINK_@@ and @@_KEY_@@ as placeholders
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.emailTemplate}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="new-campaign-participants-emails"
                    >
                        <Form.Label>Emails:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="emails"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emails}
                            isInvalid={
                                !!(
                                    formik.errors.emails &&
                                    formik.touched.emails
                                )
                            }
                            disabled={saveInProgress}
                        ></Form.Control>
                        <Form.Text muted>
                            Emails of the participants, separated with new line
                        </Form.Text>
                        <Form.Control.Feedback type="invalid">
                            {formik.errors.emails}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={saveInProgress}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={saveInProgress}
                    >
                        Mint NFT coupons &amp; send emails
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default memo(NewCampaignModal);
