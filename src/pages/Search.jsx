
import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../api/api';
import '@react-pdf-viewer/core/lib/styles/index.css';


const SearchPage = () => {
    // State for the modal
    const [viewPdfModal, setViewPdfModal] = useState(null);

    const [searchResults, setSearchResults] = useState([]);
    const [viewDetailsModal, setViewDetailsModal] = useState(null);
    const pdfViewerRef = useRef(null);

    const divisions = ['Select Division', 'Enrolment & Updation Division',
        'Aadhaar Usage Division',
        'Authentication and Verification Division',
        'Media Division',
        'Information Security Division',
        'Technology Management Division',
        'Finance & Accounts Division',
        'Training, Testing & Certification Division',
        'Human Resource Division',
        'Administration Division',
        'Legal Division',
        'Technology Development Division'];
    const states = ['Select State', 'Arunachal Pradesh', 'Assam', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Sikkim', 'Tripura'];
    const receiveFromOptions = ['Select', 'HQ Delhi', 'Tech Center Bengaluru', 'Tech Center Manesar', 'RO Bengaluru', 'RO Chandigarh', 'RO Delhi', 'RO Guwahati', 'RO Hyderabad', 'RO Lucknow', 'RO Mumbai', 'RO Ranchi'];
    const docCategory = ['Select Category', 'Letters Recived from HQ', 'Letters Issued', 'Letters Recived from Eco_System Partner', 'Letter Issued -do-', 'D.O Letters', 'Office  Memorandum', 'SOP(Standard Operating Procedure)', 'IEC Related', 'Spreadsheet', 'Others']
    const [formData, setFormData] = useState({
        name: '',
        division: '',
        docCategory: '',
        keyword: '',
        date: '',
        state: '',
        receiveFrom: '',
        sendTo: '',
        docType: '',
        pdfFile: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleAll = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not found in localStorage');
                // Handle the situation where the token is not available
                return;
            }

            const response = await fetch(`${apiUrl}/search/all`, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                const resultsArray = Array.isArray(data.searchResults) ? data.searchResults : [];
                setSearchResults(resultsArray);
                console.log('Search Results:', resultsArray);
                toast.success('Search successful');
            } else {
                console.error('Error:', response.statusText);
                toast.error('Error searching documents');
            }
        } catch (error) {
            console.error('Error searching documents:', error.message);
            toast.error('Error searching documents');
        }
    };





    const handleSearch = async () => {
        try {
            const getToken = () => {
                try {
                    // Attempt to get the token from localStorage
                    const token = localStorage.getItem('token');

                    if (!token) {
                        // Token not found, handle it appropriately
                        console.error('Token not found in localStorage');
                        // You can redirect to the login page or handle the situation as needed
                        return null;
                    }

                    return token;
                } catch (error) {
                    console.error('Error getting token from localStorage:', error);
                    // Handle the error, for example, redirect to the login page
                    return null;
                }
            };


            const searchParams = {
                name: formData.name,
                division: formData.division,
                docCategory: formData.docCategory,
                keyword: formData.keyword,
                date: formData.date,
                state: formData.state,
                receiveFrom: formData.receiveFrom,
            };

            if (!Object.values(searchParams).some(Boolean)) {
                toast.error('At least one search field is required');
                return;
            }

            const response = await fetch(`${apiUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`,
                },
                credentials: 'include',
                body: JSON.stringify(searchParams),
            });


            if (response.ok) {
                const data = await response.json();
                const resultsArray = Array.isArray(data.searchResults) ? data.searchResults : [];
                setSearchResults(resultsArray);
                console.log('Search Results:', resultsArray);
                toast.success('Search successful');
            } else {
                console.error('Error:', response.statusText);
                toast.error('Error searching documents');
            }
        } catch (error) {
            console.error('Error searching documents:', error.message);
            toast.error('Error searching documents');
        }
    };


    // const handleViewDetails = async (result) => {
    //     try {
    //         if (!result.fileName) {
    //             console.error('File name is undefined in result:', result);
    //             throw new Error('File name is undefined');
    //         }

    //         // Construct the URL to the local file
    //         const fileUrl = `${apiUrl}/download/${result.fileName}`;

    //         // Open the file in a new tab/window
    //         window.open(fileUrl, '_blank');
    //     } catch (error) {
    //         console.error('Error opening file:', error);
    //         toast.error('Failed to open file');
    //     }
    // };

    const handleViewDetails = (result) => {

        setViewPdfModal(result);
    };

    const handleClosePdfModal = () => {
        setViewPdfModal(null);
    };



    // Placeholder for download logic
    const handleDownload = async (result) => {
        try {
            if (!result.fileName) {
                console.error('File name is undefined in result:', result);
                throw new Error('File name is undefined');
            }

            // Construct the URL to the local file
            const fileUrl = `${apiUrl}/download/${result.fileName}`;

            // Open the file in a new tab/window
            window.open(fileUrl);
            // Notify success
            toast.success('File download started!');
        } catch (error) {
            console.error('Error downloading file:', error);
            // Notify error
            toast.error(`Failed to start the file download. ${error.message}`);
        }

    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <Navbar />
                {/* Search Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    {/* Search Query */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Search:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        />
                    </div>
                    {/* Division Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">State:</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        >
                            {states.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Receive From Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Receive From:</label>
                        <select
                            name="receiveFrom"
                            value={formData.receiveFrom}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        >
                            {receiveFromOptions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Division Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Division:</label>
                        <select
                            name="division"
                            value={formData.division}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        >
                            {divisions.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">DOC CATEGORY:</label>
                        <select
                            name="docCategory"
                            value={formData.docCategory}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        >
                            {docCategory.map((option, index) => (
                                <option key={index} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    {/* Keyword Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Keyword:</label>
                        <input
                            type="text"
                            name="keyword"
                            value={formData.keyword}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full"
                        />
                    </div>
                </div>
                {/* Additional filter options can be added similarly */}

                {/* Search Button */}
                <button
                    type="button"
                    onClick={handleAll}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4"
                >
                    View All
                </button>
                <button
                    type="button"
                    onClick={handleSearch}
                    className="bg-blue-500 text-white py-2 px-4 rounded-full w-full mb-4"
                >
                    Search
                </button>

                {/* Search Results Table */}
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 p-2">SL no</th>
                            <th className="border border-gray-300 p-2">Name</th>
                            <th className="border border-gray-300 p-2">Date</th>
                            <th className="border border-gray-300 p-2">Receive From</th>
                            <th className="border border-gray-300 p-2">Division</th>
                            <th className="border border-gray-300 p-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {searchResults.map((result, index) => (
                            <tr key={result._id} className='text-center'>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{result.fileName}</td>
                                <td className="border border-gray-300 p-2">{result.date}</td>
                                <td className="border border-gray-300 p-2">{result.receiveFrom}</td>
                                <td className="border border-gray-300 p-2">{result.division}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        type="button"
                                        onClick={() => handleViewDetails(result)}
                                        className="text-blue-500 underline"
                                    >
                                        View Details
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDownload(result)}
                                        className="ml-2 text-green-500 underline"
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* View Details Modal */}
                {/* View Details Modal */}
                <Modal
                    isOpen={viewPdfModal !== null}
                    onRequestClose={handleClosePdfModal}
                    contentLabel="View PDF Modal"
                    ariaHideApp={false}
                >
                    {viewPdfModal && (
                        <div>
                            <h2>{viewPdfModal.fileName}</h2>
                            <embed src={`${apiUrl}/uploads/${encodeURIComponent(viewPdfModal.fileName)}`} type="application/pdf" width="100%" height="600px" />
                            <p>File Name: {viewPdfModal.fileName}</p>
                            <button onClick={handleClosePdfModal}>Close</button>
                        </div>
                    )}
                </Modal>

                <ToastContainer />
            </div>
        </div>
    );
};

export default SearchPage;
