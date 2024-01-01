// pages/MIS.jsx
import React, { useState, useEffect } from 'react';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { apiUrl } from '../api/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import Axios


const MIS = () => {
    const [pdfFiles, setPdfFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPdfFiles = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    console.error('UserId not available. Please log in.');
                    return;
                }
                const token = localStorage.getItem('token');

                if (!token) {
                    handleTokenMissing();
                    return;
                }

                const response = await axios.get(`${apiUrl}/list`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                    withCredentials: true, // Send cookies along with the request
                });

                handleResponse(response);
            } catch (error) {
                handleError(error);
            } finally {
                setIsLoading(false);
            }
        };

        const handleTokenMissing = () => {
            console.error('Token not found in localStorage');
            // Handle the absence of a token, redirect to login, or show an error message.
        };

        const handleResponse = async (response) => {
            if (response.status === 200) {
                const files = response.data;
                console.log('PDF Files:', files); // Log the files to check

                // Update the state only if files are available
                if (files && files.length > 0) {
                    setPdfFiles(files);
                } else {
                    // Handle the case where no PDF files are available
                    console.warn('No PDF files available');
                }
            } else {
                handleErrorResponse(response);
            }
        };

        const handleErrorResponse = (response) => {
            if (response.status === 403) {
                console.error('Unauthorized to access PDF files');
                toast.error('Unauthorized to access PDF files', { position: toast.POSITION.TOP_RIGHT });
            } else {
                console.error('Error fetching PDF files');
                toast.error('Error fetching PDF files', { position: toast.POSITION.TOP_RIGHT });
            }
        };

        const handleError = (error) => {
            console.error('Error fetching PDF files:', error);
            toast.error('Error fetching PDF files', { position: toast.POSITION.TOP_RIGHT });
        };

        fetchPdfFiles();
    }, []);
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Navigation Bar */}
                <Navbar />

                {/* Main Components */}
                {/* <div className="bg-white rounded-lg shadow-xl p-8">
                    <h1 className="text-2xl font-bold mb-4">MIS Page - PDF Files</h1>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        pdfFiles.length > 0 ? (
                            <table className="min-w-full border rounded">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="border p-2">File Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pdfFiles.map((pdf, index) => (
                                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                                            <td className="border p-2">{pdf}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No PDF files available.</p>
                        )
                    )}
                </div> */}
                <h1>This Page is under progress</h1>
            </div>
            <ToastContainer />
        </div>
    );
};

export default MIS;
