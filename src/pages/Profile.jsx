// pages//profile.jsx

import React, { useState, useEffect } from 'react';
import adhar from '../assets/aadhaar-1.svg';
import Menu from '../components/Menu';
import Navbar from '../components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiUrl } from '../api/api';

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        designation: '',
        mobileNumber: '',
        role: '',
        dateOfJoining: '',
        employeeID: '',
    });

    const [editableFields, setEditableFields] = useState({
        name: false,
        designation: false,
        mobileNumber: false,
        role: false,
        dateOfJoining: false,
        employeeID: false,
    });

    const [isDateValid, setIsDateValid] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${apiUrl}/user/${userId}`, {
                    method: 'GET',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    const userData = await response.json();
                    setUserProfile(userData);
                } else if (response.status === 401) {
                    // Unauthorized, handle as needed (e.g., redirect to login)
                    console.error('Unauthorized: Please log in.');
                } else {
                    console.error('Failed to fetch user profile. Status:', response.status);
                    toast.error('Failed to fetch user profile. Please try again.');
                }
            } catch (error) {
                console.error('Error fetching user profile:', error);
                toast.error('Internal Server Error. Please try again later.');
            }
        };
        if (token && userId) {
            fetchUserProfile();
        } else {
            // Handle case where token or userId is not available (e.g., redirect to login)
            console.error('Token or userId not available. Please log in.');
        }
    }, []);

    const handleChange = (field, value) => {
        if (field === 'dateOfJoining') {
            const currentDate = new Date();
            const selectedDate = new Date(value);

            // Check if the selected date is in the future
            const isValid = selectedDate <= currentDate;
            setIsDateValid(isValid);

            if (!isValid) {
                toast.error('Date of Joining cannot be set to a future date.');
                return;
            }
        }

        setUserProfile((prevProfile) => ({ ...prevProfile, [field]: value }));
    };

    const toggleEdit = (field) => {
        setEditableFields((prevEditableFields) => ({
            ...prevEditableFields,
            [field]: !prevEditableFields[field],
        }));
    };

    const renderInputField = (label, field, type = 'text') => (
        <div className="flex justify-between items-center mb-4" key={field}>
            <label className="text-sm text-gray-600">{label}:</label>
            <input
                type={type}
                value={userProfile[field] || ''}
                className="border rounded p-1 flex-grow"
                onChange={(e) => handleChange(field, e.target.value)}
                readOnly={!editableFields[field]}
                disabled={field === 'email' || field === 'designation'}
            />
            {(field !== 'email' && field !== 'designation') && (
                <button
                    className="text-blue-500 py-1 px-2 rounded ml-2"
                    onClick={() => toggleEdit(field)}
                    disabled={field === 'email' || field === 'designation'}
                >
                    {editableFields[field] ? 'Save' : 'Edit'}
                </button>
            )}
        </div>
    );


    const inputFields = [
        { label: 'Name', field: 'name' },
        { label: 'Email', field: 'email', type: 'text' },
        { label: 'Designation', field: 'designation', type: 'text' },
        { label: 'Mobile Number', field: 'mobileNumber', type: 'number' },
        { label: 'Role', field: 'role', type: 'text' },
        { label: 'Date of Joining', field: 'dateOfJoining', type: 'date' },
        { label: 'Employee ID', field: 'employeeID', type: 'text' },
    ];

    const renderInputFields = () => inputFields.map((field) => renderInputField(field.label, field.field, field.type));

    const handleUpdate = async () => {
        const requiredFields = ['name', 'mobileNumber'];

        for (const field of requiredFields) {
            if (!userProfile[field]) {
                toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} cannot be blank.`);
                return;
            }
        }

        try {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            const response = await fetch(`${apiUrl}/edit/${userId}`, {
                method: 'PUT',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userProfile),
                credentials: 'include',
            });

            if (response.ok) {
                const updatedUser = await response.json();
                setUserProfile(updatedUser);
                toast.success('Profile updated successfully!');
            } else {
                console.error('Failed to update profile. Status:', response.status);
                toast.error('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Internal Server Error. Please try again later.');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Left Sidebar */}
            <Menu />

            {/* Main Content */}
            <div className="flex-1 p-8">
                <Navbar />
                <div className="grid grid-cols-2 gap-4">
                    {/* Profile Picture */}
                    <div className="col-span-2 flex flex-col items-center">
                        <img src={adhar} alt="Profile" className="w-20 h-20 rounded-full mb-2" />
                        {/* Add input for profile picture change if needed */}
                    </div>

                    {/* Other Profile Details */}
                    {renderInputFields()}
                </div>

                {/* Update button */}
                <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4"
                    onClick={handleUpdate}
                    disabled={!isDateValid}
                >
                    Update
                </button>

                {/* Toast Container for Notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default Profile;
