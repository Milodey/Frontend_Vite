import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { apiUrl } from '../api/api';
import axios from 'axios';

const Dashboard = () => {
    const [totalUpload, setTotalUpload] = useState(0);
    const [totalSearch, setTotalSearch] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${apiUrl}/dashboard`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true,
                });

                if (response.status === 200) {
                    const data = response.data;
                    setTotalUpload(data.totalFiles);
                    setTotalSearch(data.searchCount);
                } else {
                    console.log(`${localStorage.getItem('token')}`);
                    console.error('Failed to fetch dashboard data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error.message || error);
            }
        };

        fetchData();

        const intervalId = setInterval(fetchData, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-200 ">
            <Menu />
            <div className="flex-1 p-8">
                <Navbar />
                <div className="grid grid-cols-1 text-xl lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    <div className="bg-white rounded-lg shadow-xl p-4">
                        <Link to="/upload">
                            <button className="bg-blue-500 text-white py-2 px-4 rounded-full w-full">Upload Document</button>
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl p-4">
                        <Link to="/search">
                            <button className="bg-green-500 text-white py-2 px-4 rounded-full w-full">Search</button>
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl p-4">
                        <Link to="/MIS">
                            <button className="bg-yellow-500 text-white py-2 px-4 rounded-full w-full">MIS</button>
                        </Link>
                    </div>
                    <div className="bg-white rounded-lg shadow-xl p-4">
                        <Link to="/Pending">
                            <button className="bg-red-500 text-white py-2 px-4 rounded-full w-full">Pending for Approval</button>
                        </Link>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-xl p-4 mt-8 text-center text-lg">
                    <div className="text-xl font-bold mb-4">Overview</div>
                    <p>Total file upload: {totalUpload}</p>
                    <p>Total file search: {totalSearch}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
