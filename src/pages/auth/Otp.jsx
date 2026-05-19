import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { FaArrowLeft } from 'react-icons/fa';
import leftsideImage from '../../assets/auth/opt.jpg';
import { GoArrowLeft } from 'react-icons/go';

const Otp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;
        
        const newOtp = otp.split('');
        newOtp[index] = value;
        const updated = newOtp.join('');
        setOtp(updated);
        setError('');

        if (value && index < 4) inputRefs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace') {
            if (otp[index]) {
                // clear current box
                const newOtp = otp.split('');
                newOtp[index] = '';
                setOtp(newOtp.join(''));
            } else if (index > 0) {
                // move to previous box
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 5);
        setOtp(text);
        inputRefs.current[Math.min(text.length, 4)]?.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (otp.length < 5) {
            setError('Please enter the complete 5-digit code');
            return;
        }
        console.log('OTP:', otp);
        navigate('/reset-password');
    };

    const handleResend = () => {
        setOtp('');
        setError('');
        inputRefs.current[0]?.focus();
        console.log('Resend OTP');
    };

    return (
        <div className="relative flex h-screen w-full overflow-hidden">
            {/* Left - Image */}
            <div className="hidden md:block w-1/2 h-full overflow-hidden">
                <img
                    src={leftsideImage}
                    className="w-full h-full ken-burns-image object-cover"
                    alt="OTP Verification"
                />
            </div>

            {/* Top-right Back Button */}
            <div className="absolute top-4 right-4 z-50">
                <button
                                    onClick={() => navigate('/login')}
                                    aria-label="Back to Login"
                                    className="flex items-center gap-0.5 duration-300 px-3 py-2 transition cursor-pointer hover:scale-105"
                                >
                                    
                                    <GoArrowLeft className="w-4 h-4 text-gray-500"/>
                                    <span className="text-xs text-gray-500">Back</span>
                                </button>
            </div>

            {/* Right - Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-10 overflow-y-auto">
                <div className="w-full max-w-sm form-stagger">
                    <div className="border border-gray-200 rounded-2xl p-8 shadow-sm">

                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                            OTP Verification
                        </h1>
                        <p className="text-sm text-gray-500 mb-6">
                            Enter the verification code we just sent to your email address
                        </p>

                        <form onSubmit={handleSubmit} noValidate>
                            <div className="flex w-full gap-3 mb-2" onPaste={handlePaste}>
                                {[0, 1, 2, 3, 4].map(index => (
                                    <input
                                        key={index}
                                        ref={el => inputRefs.current[index] = el}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={otp[index] || ''}
                                        onChange={e => handleChange(index, e.target.value)}
                                        onKeyDown={e => handleKeyDown(index, e)}
                                        className={`flex-1 min-w-0 aspect-square text-center text-lg font-semibold rounded-lg border-2 focus:outline-none focus:border-custom transition-colors
                                            ${otp[index] ? 'border-custom' : 'border-gray-200'}
                                            ${error ? 'border-red-400!' : ''}`}
                                    />
                                ))}
                            </div>

                            {error && <p className="text-red-500 text-xs mb-4">{error}</p>}

                            <button type="submit" className="btn-custom w-full text-base font-semibold mt-4">
                                Verify
                            </button>
                        </form>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Didn't receive a code?{' '}
                            <button onClick={handleResend} className="text-custom font-semibold hover:underline">
                                Resend
                            </button>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Otp;