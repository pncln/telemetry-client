import React, { useState, useEffect} from 'react';
import { doc, onSnapshot, collection, query, limit } from 'firebase/firestore'

const Logs = ({stringData}) => {
    const [data, setData] = useState(stringData);
    console.log(stringData);

    return (
        <div>
            <textarea className="form-control logs-box" placeholder="Logs here" onChange={() => setData(stringData)} value={data}></textarea>
        </div>
    );

}

export default Logs;
