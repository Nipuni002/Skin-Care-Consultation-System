import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const SkinProgressChart = ({ userName }) => {
    const [progressData, setProgressData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8081/skin-progress/get/${userName}`)
            .then(res => setProgressData(res.data))
            .catch(err => console.error(err));
    }, [userName]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Skin Progress Chart</h2>
            <LineChart width={700} height={400} data={progressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acneLevel" stroke="#ff4d4d" name="Acne Level" />
                <Line type="monotone" dataKey="hydrationLevel" stroke="#4da6ff" name="Hydration Level" />
                <Line type="monotone" dataKey="rednessLevel" stroke="#ffa64d" name="Redness Level" />
            </LineChart>
        </div>
    );
};

export default SkinProgressChart;
