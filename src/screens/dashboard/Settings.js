import React, { useState } from 'react';
import { Card, Table, Button, Modal, Form } from 'react-bootstrap'

const Settings = () => {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add New Source</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>API Name</Form.Label>
                            <Form.Control type="text" placeholder="New Api" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="127.0.0.1:7829/api/v1/" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Secret Key</Form.Label>
                            <Form.Control type="text" placeholder="hsaWhjx871Zmj8Ao1Akk" />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
            <div style={{ marginTop: '25px', width: '100%'}}>
                <Card>
                    <Card.Body>
                        <div style={{fontSize: '24px', fontWeight: 'bold'}} className="devices-title">
                            Sources
                        </div>
                        <div style={{fontSize: '18x', marginTop: '12px'}} className="devices-list">
                            <Table striped bordered hover style={{fontSize: '18x'}}>
                                <thead>
                                    <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Status</th>
                                    <th>Last Updated</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>API/AzerSpace-1</td>
                                        <td>OK</td>
                                        <td>N/A</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>API/AzerSpace-2</td>
                                        <td>OK</td>
                                        <td>N/A</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right'}} className="devices-addButton">
                            <Button variant="primary" onClick={handleShow}>Add</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
}

export default Settings;
