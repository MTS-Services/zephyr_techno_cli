// src/pages/Login.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import leftImage from '../../assets/auth/login.jpg';
import { getRoles } from '../../utils/roles';
import { GoArrowLeft } from 'react-icons/go';
import { BsArrowLeft } from 'react-icons/bs';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const lower = email.toLowerCase();
        if (lower.includes('admin')) {
            navigate(getRoles('admin'));
        } else if (lower.includes('user')) {
            navigate(getRoles('user'));
        }
    };

    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            {/* Left - Image */}
            <div className="hidden md:block w-1/2 h-full overflow-hidden">
                <img
                    src={leftImage}
                    className="w-full h-full ken-burns-image object-cover"
                    alt="Login"
                />
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
                <div className="w-full max-w-sm form-stagger">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                        Login to Continue
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 mb-6 lg:mb-8">
                        Sign in to your account to view contact details.
                    </p>

                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email here..."
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="block text-sm md:text-base font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password here..."
                                className="input w-full bg-[#ebecf0] border-none focus:outline-none"
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right mb-5">
                            <Link to="/forget-password" className="text-sm font-semibold text-custom hover:underline">
                                Forget Password?
                            </Link>
                        </div>

                        {/* Sign In Button */}
                        <button type="submit" className="btn-custom w-full text-base font-semibold">
                            Sign In
                        </button>
                    </form>

                    {/* Sign Up */}
                    <p className="text-center text-sm text-gray-600 mt-4">
                        Don't Have an account{' '}
                        <Link to="/register" className="text-custom font-semibold hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;