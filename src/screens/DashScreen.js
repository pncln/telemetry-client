import React, { useState, useEffect } from 'react';

import Navbar from './dashboard/Navbar';
import Visualization from './dashboard/Visualization';
import Settings from './dashboard/Settings';
import Logs from './dashboard/Logs'
import Events from './dashboard/Events'
import Notifications from './dashboard/Notifications';

import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator, onSnapshot, collection, query, limit, orderBy } from "firebase/firestore";

import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

import { 
    Col,
    Tab,
    ListGroup,
    Row,
    Accordion
} from 'react-bootstrap';

import './dashboard/dash-styles.css';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  connectFirestoreEmulator(db, 'localhost', 8080);

const DashScreen = () => {
    const [data, setData] = useState([]);
    const [stringData, setStringData] = useState('');
    const [key, setKey] = useState("#home");
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const docRef = collection(db, "geo-data");
    // const docs = query(docRef, orderBy("timestamp", "desc"), limit(1));
    const docs = query(docRef, limit(1));
    console.log(docs)

    const unsub = onSnapshot(docs, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            setData(data.push(doc.data()))
        });
        // console.log("Current data: ", data);
        
        console.log();
        setStringData(JSON.stringify(data));
    });

    useEffect(() => {
        const handleNotLoggedIn = async (e) => {
            if (!currentUser) {
                try {
                    setError('');
                    setLoading(true);
                    navigate('/');
                } catch (error) {
                    console.log(error);
                }
            }
        };

        handleNotLoggedIn();
    }, [])

    const Page = () => (
        <div>
            <Navbar />
            <Tab.Container
                id="tabs" 
                activeKey={key}
                onSelect={(k) => setKey(k)}>
                <Row>
                    <Col sm={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item action href="#home">
                        Home
                        </ListGroup.Item>
                        <ListGroup.Item action href="#logs">
                        Logs
                        </ListGroup.Item>
                        <ListGroup.Item action href="#notifications">
                        Notifications
                        </ListGroup.Item>
                        <ListGroup.Item action href="#events">
                        Events
                        </ListGroup.Item>
                        <ListGroup.Item action href="#settings">
                        Settings
                        </ListGroup.Item>
                    </ListGroup>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content style={{ marginRight: 25 }}>
                        <Tab.Pane eventKey="#home">
                            <Visualization transport={db} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#settings">
                            <Settings />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#logs">
                            <Logs transport={db} data={data} stringData={stringData} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#events">
                            <Events />
                        </Tab.Pane>
                        <Tab.Pane eventKey="#notifications">
                            <Notifications />
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )

    return (
        currentUser ? <Page /> : null
    );
};

export default DashScreen;
