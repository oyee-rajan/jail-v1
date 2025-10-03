"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


// This component simulates the client-side Next.js login page
// Note: In a real Next.js app, you would not use the Tailwind CDN script tag,
// but rather set up Tailwind configuration.
const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  // Simulates the API call to your backend/Next.js API Route
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    

    // --- START: API Call Simulation ---
    // In a real Next.js application, this URL would point to your API Route,
    // usually '/api/login'.

    try {
      // Step 1: Prepare the payload
      const payload = {
        email: email,
        password: password,
      };

      // Step 2: Simulate fetch call to the server
      // We will use a mock response logic here since we cannot run a real server.
      const simulatedResponse = await new Promise((resolve) => {
        setTimeout(() => {
          if (email === 'user@example.com' && password === 'password123') {
            resolve({
              ok: true,
              json: () => Promise.resolve({ 
                token: 'mock-jwt-token-12345',
                user: { name: 'React User', email: email }
              }),
            });
          } else {
            resolve({
              ok: false,
              status: 401,
              json: () => Promise.resolve({ 
                message: 'Invalid email or password. Try user@example.com / password123' 
              }),
            });
          }
        }, 1500); // Simulate network delay
      });
      
      // Step 3: Process the response
      if (simulatedResponse.ok) {
        const data = await simulatedResponse.json();
        setSuccess('Login successful! Welcome, ' + data.user.name + '. Token: ' + data.token);
        // In a real app, you would save the token/session cookie here and redirect.
        router.push('/profilepage');
      } else {
        const errorData = await simulatedResponse.json();
        setError(errorData.message || 'Login failed due to an unexpected error.');
      }
    } catch (err) {
      console.error("Login fetch error:", err);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
    // --- END: API Call Simulation ---
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      // Simulate server-side signup
      const simulatedResponse = await new Promise((resolve) => {
        setTimeout(() => {
          // Very simple mock: reject if email already used
          if (email === 'user@example.com') {
            resolve({ ok: false, status: 409, json: () => Promise.resolve({ message: 'Email already registered.' }) });
          } else {
            resolve({ ok: true, json: () => Promise.resolve({ message: 'Signup successful' }) });
          }
        }, 1500);
      });

      if (simulatedResponse.ok) {
        const data = await simulatedResponse.json();
        setSuccess('Signup successful! You can now sign in.');
        // Reset sign up fields and switch to login
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setIsSignUp(false);
      } else {
        const err = await simulatedResponse.json();
        setError(err.message || 'Signup failed.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError('Network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Use a Fragment to contain both the setup elements (Helmet) and the main layout (div)
    <>
      {/* Helmet is used here to inject styles/scripts at the top level */}
      <Helmet /> 
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-2xl rounded-xl p-8 transition duration-300 hover:shadow-3xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-extrabold text-gray-900">
                {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
              </h2>
              <button
                type="button"
                onClick={() => { setIsSignUp((s) => !s); setError(''); setSuccess(''); }}
                className="text-sm text-blue-600 hover:text-blue-500"
              >
                {isSignUp ? 'Have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>

            {!isSignUp ? (
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="user@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="password123"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm transition-all duration-300">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-sm transition-all duration-300">
                    {success}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white transition duration-300 
                      ${loading 
                        ? 'bg-blue-400 cursor-not-allowed' 
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:shadow-xl'
                      }
                    `}
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Sign In'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignUp} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email_signup" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email_signup"
                    name="email_signup"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="password_signup" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password_signup"
                    name="password_signup"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm password</label>
                  <input
                    id="confirm_password"
                    name="confirm_password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150 sm:text-sm"
                    placeholder="Confirm your password"
                  />
                </div>

                {error && (
                  <div className="p-3 bg-red-100 text-red-700 border border-red-300 rounded-lg text-sm transition-all duration-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-100 text-green-700 border border-green-300 rounded-lg text-sm transition-all duration-300">
                    {success}
                  </div>
                )}

                <div>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-lg text-base font-medium text-white transition duration-300 
                      ${loading 
                        ? 'bg-green-400 cursor-not-allowed' 
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 hover:shadow-xl'
                      }
                    `}
                  >
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : 'Create account'}
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 text-center">
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Helper component to load Tailwind CSS in a single-file React environment
// NOTE: The <head> tag was removed to fix the DOM nesting warning. 
// It now returns a Fragment containing the necessary setup elements.
const Helmet = () => (
  <React.Fragment>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Custom hover shadow to enhance the card aesthetic */
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.2), 0 10px 10px -5px rgba(59, 130, 246, 0.1);
        }
      `}
    </style>
  </React.Fragment>
);

export default LoginPage;
