// src/pages/Register.jsx
import { useState } from 'react';
import leftsideImage from '../../assets/auth/register.webp';
import { VscEye, VscEyeClosed } from 'react-icons/vsc';
import KamuiImage from '../../components/shared/KamuiImage';
import { Link, useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import { GoArrowLeft } from 'react-icons/go';

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            {/* Left - Image */}
            <div className="hidden md:block w-1/2 h-full overflow-hidden">
                <img
                    src={leftsideImage}
                    className="w-full h-full ken-burns-image object-cover"
                    alt="Register"
                />
                {/* <KamuiImage src={leftsideImage} alt="Register"/> */}
            </div>

            {/* Top-right Back Button */}
            <div className="absolute top-4 right-4 z-50">
                <button
                                    onClick={() => navigate('/')}
                                    aria-label="Back to Home"
                                    className="flex items-center gap-0.5 duration-300 px-3 py-2 transition cursor-pointer hover:scale-105"
                                >
                                    
                                    <GoArrowLeft className="w-4 h-4 text-gray-500"/>
                                    <span className="text-xs text-gray-500">Home</span>
                                </button>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 overflow-y-auto">
                <div className="w-full max-w-md py-10 form-stagger">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                        Register Account
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mb-6 md:mb-8">
                        Provide your basic personal details to create your user profile.
                    </p>

                    {/* First Name & Last Name */}
                    <div className="flex gap-3 mb-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your first name"
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your last name"
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your business email.."
                            className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Number
                        </label>
                        <input
                            type="tel"
                            placeholder="Enter your Phone number.."
                            className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="write password"
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VscEyeClosed /> : <VscEye />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="confirm password"
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <VscEyeClosed /> : <VscEye />}
                            </button>
                        </div>
                    </div>

                    {/* Sign Up Button */}
                    <button className="btn-custom w-full text-base font-semibold">
                        Sign UP
                    </button>

                    {/* Log In */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Already Have an account{' '}
                        <Link to="/login" className="text-custom font-semibold hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;