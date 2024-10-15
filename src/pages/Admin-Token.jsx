import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import axios from 'axios'; // Import axios
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify

const AdminToken = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [fcmToken, setFcmToken] = useState('');
    const [loading, setLoading] = useState(false);
    
    const handlePushNotification = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = {
                title: title,
                body: body,
                deviceToken: fcmToken
            };
            
            const result = await axios.post("http://localhost:5000/api/firebase/send-notification", data);
            console.log(result);

            if (result.status === 200) {
                toast.success(
                    <div>
                        <div>Notification sent successfully</div>
                    </div>,
                    { position: "top-right" }
                );
            } else {
                toast.error(
                    <div>
                        <div>Failed to send Notification</div>
                    </div>,
                    { position: "top-right" }
                );
            }
        } catch (error) {
            console.log("Error:", error);
            toast.error(
                <div>
                    <div>Failed to send Notification. Please try again.</div>
                </div>,
                { position: "top-right" }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="container firebase-form p-4">
                <h1 className="mb-5">Firebase Push Notification</h1>
                <form onSubmit={handlePushNotification}>
                    <div className="row">
                        <div className="col-md-6 mb-4">
                            <FloatingLabel controlId="floatingInput" label="Title" className="full-width">
                                <Form.Control
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-6 mb-4">
                            <FloatingLabel controlId="floatingBody" label="Body" className="full-width">
                                <Form.Control
                                    type="text"
                                    placeholder="Body"
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-12 mb-4">
                            <FloatingLabel controlId="floatingToken" label="FCM Token" className="full-width">
                                <Form.Control
                                    type="text"
                                    placeholder="FCM Token"
                                    value={fcmToken}
                                    onChange={(e) => setFcmToken(e.target.value)}
                                />
                            </FloatingLabel>
                        </div>
                        <div className="col-md-12">
                            <Button
                                variant="primary"
                                size="lg"
                                type="submit"
                                className="full-width"
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send'}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default AdminToken;