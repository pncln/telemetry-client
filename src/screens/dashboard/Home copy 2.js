import React, { useState, useEffect } from 'react';
import {
    Card
} from 'react-bootstrap'
import { doc, onSnapshot, collection, getDoc, getDocs, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import Chart from "react-apexcharts";

const Home = () => {
  const [lab1, setLab1] = useState(['']);
  const [dat1, setDat1] = useState(['']);

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

      let lab = [];
      let dat = [];

      const getUpdates = async () => {
        const q = query(collection(db, "geo-data"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              dat.push(doc.data().accuracy);
              setDat1(dat1);
              lab.push(doc.id);
              setLab1(lab) 
              console.log(lab1);
          });
          console.log("Current dats: ", dat1.join(", "));
        });
      } 

      useEffect(() => {
        const func = async () => {
          const docRef = collection(db, "geo-data");
          const docSnap = await getDocs(docRef); 
          
          docSnap.forEach((snap) => {
            dat.push(snap.data().accuracy.toString());
            setDat1(dat);
            lab.push(snap.id);
            setLab1(lab); 

          });
          // getUpdates();
        }; 
        func();
        
      }, [ ]);

    let series = [{
        name: "Desktops",
        data: dat1
    }]
    let options = {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Accuracy',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5
        },
      },
      xaxis: {
        categories: lab1
      }
    };

    return (
        <div className='div-chart'>
            <Card width="100%">
              <Chart
                options={options}
                series={series}
                type="line"
                width="960"
              />
              
            </Card>
        </div>
    );
}

export default Home;
