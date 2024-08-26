import React, { useState, useEffect } from 'react';
import {
    Card
} from 'react-bootstrap'
import { doc, onSnapshot, collection, getDoc, getDocs, query, limit, orderBy } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore , connectFirestoreEmulator} from "firebase/firestore";
import Chart from "react-apexcharts";

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// connectFirestoreEmulator(db, 'localhost', 8080);

const Visualization = ({transport}) => {
  // console.log(transport)
  const [lab1, setLab1] = useState(['']);
  const [acc, setAcc] = useState(['']);
  const [lat, setLat] = useState(['']);
  const [long, setLong] = useState(['']);
  const [loading, setLoading] = useState(true);

  let lab = [];
  let accuracy = [];
  let latitude = [];
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
          // const db = children.db
          // console.log(transport)
          const docRef = collection(transport, "geo-data");
          new Promise((resolve, reject) => {
            
            resolve(
              new Promise(async (resolve, reject) => {
                
                // const docSnap = await getDocs(docRef); 
                const docs = query(docRef, orderBy("timestamp", "desc"), limit(1000))
                const docSnap = await getDocs(docs)
                resolve( 
                  new Promise((resolve, reject) => {
                    // console.log('DBG');
                    docSnap.forEach((snap) => {
                      latitude.push(snap.data().latitude);
                      longitude.push(snap.data().longitude);
                      accuracy.push(snap.data().accuracy);
                      setAcc(accuracy);
                      setLong(longitude);
                      setLat(latitude);
                      lab.push(new Date(snap.data().timestamp).toLocaleString(
                        "en-US",
                          {
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                          }
                      ));
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
          colors: ['#f3f3f3', 'transparent'],
          opacity: 0.5
        },
      },
      xaxis: {
        categories: lab1
      }
    };

    // =================================
    let seriesLatitude = [{
      name: "Latitude",
      data: lat
    }];

    let optionsLatitude = {
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
        text: 'Latitude',
        align: 'left'
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'],
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
          colors: ['#f3f3f3', 'transparent'],
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
                options={optionsLatitude}
                series={seriesLatitude}
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

export default Visualization;
