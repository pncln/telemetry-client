import React, { useState, useEffect } from 'react';
import {
    Card
} from 'react-bootstrap'
import { doc, onSnapshot, collection, getDoc, getDocs, query } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator} from "firebase/firestore";
import Chart from "react-apexcharts";

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

const Home = () => {
  const [lab1, setLab1] = useState(['']);
  const [acc, setAcc] = useState(['']);
  const [alt, setAlt] = useState(['']);
  const [long, setLong] = useState(['']);
  const [loading, setLoading] = useState(true);

  let lab = [];
  let accuracy = [];
  let altitude = [];
  let longitude = [];
  let q = {};

      // const getUpdates = async () => {
      //   new Promise((resolve, reject) => {
      //       q = query(collection(db, "geo-data"));
      //       resolve(
      //         new Promise((resolve, reject) => {
      //           const unsubscribe = onSnapshot(q, (querySnapshot) => {
      //             querySnapshot.forEach((doc) => {
      //               console.log(doc.data());
      //                 altitude.push(doc.data().altitude); 
      //                 setAlt(altitude);
      //                 longitude.push(doc.data().longitude);
      //                 setLong(longitude);
      //                 accuracy.push(doc.data().accuracy);
      //                 setAcc(accuracy);
      //                 console.log(lab)
      //                 lab.push(doc.data().timestamp);
      //                 setLab1(lab) 
      //                 console.log(doc.data());
      //             });
      //         })
      //         resolve();
      //       })
      //       ) 
      //     }) 
      //   }

      useEffect(() => {
        const func = async () => {
          const docRef = collection(db, "geo-data");
          new Promise((resolve, reject) => {
            
            resolve(
              new Promise(async (resolve, reject) => {
                
                const docSnap = await getDocs(docRef); 
                resolve( 
                  new Promise((resolve, reject) => {
                    console.log('DBG');
                    docSnap.forEach((snap) => {
                      altitude.push(snap.data().altitude);
                      longitude.push(snap.data().longitude);
                      accuracy.push(snap.data().accuracy);
                      setAcc(accuracy);
                      setLong(longitude);
                      setAlt(altitude);
                      lab.push(snap.data().timestamp);
                      setLab1(lab);
                      
                  });
                  resolve(
                    new Promise((resolve, reject) => {
                      setLoading(false);
                      resolve();
                    })
                  );
                  })
                )
              })
            )
          })
        }; 
        func();
        
      }, []);

    // =================================
    let seriesAccuracy = [{
        name: "Accuracy",
        data: acc
    }]
    let optionsAccuracy = {
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

    // =================================
    let seriesAltitude = [{
      name: "Altitude",
      data: alt
    }];

    let optionsAltitude = {
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
        text: 'Altitude',
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

    // =================================
    let seriesLongitude = [{ 
      name: "Longitude",
      data: long
    }]

    let optionsLongitude = {
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
        text: 'Longitude',
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
              
              { loading ? null : <><Chart
                options={optionsAccuracy}
                series={seriesAccuracy}
                type="line"
                width="960"
              />
              <Chart
                options={optionsAltitude}
                series={seriesAltitude}
                type="line"
                width="960"
              />
              <Chart
                options={optionsLongitude}
                series={seriesLongitude}
                type="line"
                width="960"
              /> </> }
            </Card>
        </div>
    );
}

export default Home;
