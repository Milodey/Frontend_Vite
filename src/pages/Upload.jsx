// pages/UploadPage.jsx

import React, { useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { apiUrl } from '../api/api';

// Constants for dropdown options

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
const docCategory = ['Select', 'Letters Recived from HQ', 'Letters Issued', 'Letters Recived from Eco_System Partner', 'Letter Issued -do-', 'D.O Letters', 'Office  Memorandum', 'SOP(Standard Operating Procedure)', 'IEC Related', 'Spreadsheet', 'Others']

const UploadPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        division: '',
        docCategory: '',
        keyword: '',
        date: '',
        state: '',
        receiveFrom: '',
        docType: '',
        pdfFile: null,
    });

    const pdfViewerRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e) => {
        e.preventDefault(); // Prevent the default behavior

        const file = e.target.files[0];
        setFormData((prevData) => ({ ...prevData, pdfFile: file }));

        // Display PDF in the viewer
        const reader = new FileReader();
        reader.onload = () => {
            if (pdfViewerRef.current) {
                pdfViewerRef.current.src = reader.result;
            }
        };
        reader.readAsDataURL(file);
    };


    const handleUpload = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('pdfFile', formData.pdfFile);

            // Append other form data to the FormData object
            formDataToSend.append('name', formData.name);
            formDataToSend.append('division', formData.division);
            formDataToSend.append('docCategory', formData.docCategory);
            formDataToSend.append('keyword', formData.keyword);
            formDataToSend.append('date', formData.date);
            formDataToSend.append('state', formData.state);
            formDataToSend.append('receiveFrom', formData.receiveFrom);

            const response = await fetch(`${apiUrl}/upload`, {
                method: 'POST',
                body: formDataToSend,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
                credentials: 'include',
            });

            if (response.ok) {
                // Display success toast notification
                toast.success('File uploaded successfully!', { position: toast.POSITION.TOP_RIGHT });
            } else {
                // Display error toast notification
                toast.error('File upload failed', { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            console.error('Error during file upload:', error);
            // Display error toast notification
            toast.error('Error during file upload', { position: toast.POSITION.TOP_RIGHT });
        }
    };
    return (
        <div className="flex min-h-screen overflow-y-auto bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Navbar */}
                <Navbar />

                <div className="flex">
                    {/* Form Section */}
                    <form className="flex-1">
                        {/* Form Fields */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Name<span className="text-red-500">*</span>:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="border rounded p-1 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Division<span className="text-red-500">*</span>:</label>
                                {/* Dropdown for Division */}
                                <select
                                    name="division"
                                    value={formData.division}
                                    onChange={handleInputChange}
                                    className="border rounded p-1 w-full"
                                    required
                                >
                                    {divisions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">DOC Category <span className="text-red-500">*</span>:</label>
                                {/* Dropdown for Division */}
                                <select
                                    type="text"
                                    name="docCategory"
                                    value={formData.docCategory}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    required
                                >
                                    {docCategory.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="p-1">
                                <label className="block text-sm font-medium text-gray-600">Choose PDF<span className="text-red-500">*</span>:</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    name="pdfFile"
                                    onChange={handleFileChange}
                                    className="border rounded p-1 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">State<span className="text-red-500">*</span>:</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    required
                                >
                                    {states.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">Receive From<span className="text-red-500">*</span>:</label>
                                <select
                                    name="receiveFrom"
                                    value={formData.receiveFrom}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    required
                                >
                                    {receiveFromOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Keyword<span className="text-red-500">*</span>:</label>
                                <input
                                    type="text"
                                    name="keyword"
                                    value={formData.keyword}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Date<span className="text-red-500">*</span>:</label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="border rounded p-2 w-full"
                                    required
                                />
                            </div>



                        </div>

                        {/* Upload Button */}
                        <button
                            type="button"
                            onClick={handleUpload}
                            className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600"
                        >
                            Upload
                        </button>

                    </form>

                    {/* PDF Viewer Section */}
                    <div className="flex-1 ml-8 border border-dashed border-gray-300 p-4">
                        {formData.pdfFile ? (
                            <div className="mb-4">
                                <h2 className="text-xl font-bold mb-4">PDF Preview:</h2>
                                <iframe
                                    ref={pdfViewerRef}
                                    title="PDF Viewer"
                                    className="w-full h-screen border rounded shadow-md"
                                    style={{ height: 'calc(100vh - 150px)' }}
                                ></iframe>
                            </div>
                        ) : (
                            <p className="text-gray-600 text-center" style={{ height: 'calc(100vh - 150px)' }}>PDF file preview area</p>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UploadPage;
