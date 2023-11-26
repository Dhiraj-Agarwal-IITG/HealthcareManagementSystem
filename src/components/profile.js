import React, { useState, useEffect } from "react";
import profilePic from "../assets/iitg_logo.jpg";
import axios from "axios";
import { UserState } from "../Context/UserProvider";

const Profile = () => {
    const { user, getUserFromToken } = UserState();

    useEffect(() => {
        if (!user) {
            getUserFromToken();
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        patientId: "",
        gender: "",
        bloodGroup: "",
        mobile: "",
        dateOfBirth: "",
        city: "",
        address: "",
        pincode: "",
        state: "",
    });
    const {
        firstName,
        lastName,
        email,
        patientId,
        gender,
        bloodGroup,
        mobile,
        dateOfBirth,
        city,
        address,
        pincode,
        state,
    } = formData;

    const fetchData = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/api/v1/auth/${user.role}/getById`,
            { params: { id: user.id } }
        );
        console.log(response.data.data);
        setFormData((prevData) => ({
            ...prevData,
            firstName: response.data.data.firstName ?? response.data.data.firstname,
            lastName: response.data.data.lastName ?? response.data.data.lastname,
            patientId: response.data.data.rollno,
            dateOfBirth: response.data.data.dateOfBirth?.substr(0, 10),
            gender: response.data.data.gender,
            bloodGroup: response.data.data.bloodGroup,
            mobile: response.data.data.mobile,
            email: response.data.data.email,
            state: response.data.data.state,
            city: response.data.data.city,
            pincode: response.data.data.pincode,
            address: response.data.data.address,
        }));
    };

    return (
        <div className="text-[1.2rem]">
            <div className="mt-5 ml-10 font-bold text-2xl">User Details</div>
            <div className="flex rounded-full mt-4 ml-5 p-5 h-32">
                <img src={profilePic} />
            </div>
            <div className="grid grid-cols-2 gap-x-10 mt-4 ml-10">
                <div class="grid grid-cols-2 w-4/5 gap-y-6">
                    <div class="text-left font-bold">
                        {user?.role === "patient" ? (
                            <>Patient ID:</>
                        ) : (
                            <>Doctor ID: </>
                        )}
                    </div>
                    <div class="text-left">{patientId ?? user?.id?.substring(0, 4)}</div>
                    <div class="text-left font-bold">First Name:</div>
                    <div class="text-left">{firstName}</div>
                    <div class="text-left font-bold">Last Name:</div>
                    <div class="text-left">{lastName}</div>
                    <div class="text-left font-bold">Mobile No.:</div>
                    <div class="text-left">{mobile}</div>
                    <div class="text-left font-bold">Email ID:</div>
                    <div class="text-left">{email}</div>
                    <div class="text-left font-bold">Blood Group:</div>
                    <div class="text-left">{bloodGroup}</div>
                    <div class="text-left font-bold"> Address:</div>
                    <div class="text-left">{address}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="text-left font-bold">City:</div>
                    <div class="text-left">{city}</div>
                    <div class="text-left font-bold">State:</div>
                    <div class="text-left">{state}</div>
                    <div class="text-left font-bold">PinCode:</div>
                    <div class="text-left">{pincode}</div>
                    <div class="text-left font-bold">DOB:</div>
                    <div class="text-left">{dateOfBirth}</div>
                    <div class="text-left font-bold">Age:</div>
                    <div class="text-left">22 Years</div>
                    <div class="text-left font-bold">Gender:</div>
                    <div class="text-left">{gender}</div>
                    <div class="text-left">Mobile Number:</div>
                    <div class="text-left">{mobile}</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
