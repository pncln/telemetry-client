import React from 'react';
import { Accordion, Card, Badge } from 'react-bootstrap';

const getdate = () => {

}

const Notifications = () => {
    return (
        <div>
            <div className='accordion-block'>
                <Card>
                    <Card.Header>
                        Date: N/A
                    </Card.Header>
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>[#1] Potential Sensor Failure <Badge bg='danger'> Alert </Badge></Accordion.Header>
                                <Accordion.Body>
                                Error description here
                                
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header>Inconsistent Data <Badge bg='warning'> Warning </Badge></Accordion.Header>
                                <Accordion.Body>
                                Error description here
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header>Update Available <Badge bg='primary'>Info</Badge></Accordion.Header>
                                <Accordion.Body>
                                Error description here
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header>Inconsistent Data <Badge bg='warning'> Warning </Badge></Accordion.Header>
                                <Accordion.Body>
                                Error description here
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                    
                </Card>
            </div>
            
        </div>
    );
}

export default Notifications;
