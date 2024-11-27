import React, { useState } from 'react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link, useNavigate , Navigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';

const Signup = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  if(isAuthenticated){
    return <Navigate to='/passwords' replace />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/signup', {
        email,
        password,
        username,
        confirmPassword
      }, { withCredentials: true });
      toast.success('Signup successful');
      setIsAuthenticated(true)
      navigate('/passwords');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className='w-screen h-screen grid grid-cols-2'>
      <div className='text-left align-center content-center bg-gradient-to-tr from-cyan-300 to-blue-700 h-full p-20 tilted-right'>
        <h1 className='text-2xl md:text-3xl lg:text-3xl text-white'>Welcome to <span className='text-purple-900'>KEEPER</span></h1>
        <h2 className='text-3xl mt-4 md:text-4xl lg:text-5xl w-[700px]'>
          Keep all your passwords safe with keeper. <br />
          Save login credentials or card details
        </h2>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <div className='gap-2 flex flex-col'>
          <div className='bg-gray-200 p-4 rounded-md border-[3px] border-purple-900'>
            <span className='text-2xl text-purple-900 font-bold'>SIGN UP</span>
            <form onSubmit={handleSubmit} className='mt-3'>
              <div className='mb-2'>
                <label>Email:</label><br />
                <input
                  type="text"
                  className='mt-1 mb-2 border border-purple-900 border-2 rounded-md w-full px-2 py-1'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className='mb-2'>
                <label>Username:</label><br />
                <input
                  type="text"
                  className='mt-1 mb-2 border border-purple-900 border-2 rounded-md w-full px-2 py-1'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              
              <div className='mb-2'>
                <label>Password:</label><br />
                <input
                  type="password"
                  className='mt-1 mb-2 border border-purple-900 border-2 rounded-md w-full px-2 py-1'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className='mb-2'>
                <label>Confirm Password:</label><br />
                <input
                  type="password"
                  className='mt-1 mb-2 border border-purple-900 border-2 rounded-md w-full px-2 py-1'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Link to='/signin' className='underline text-blue-700'>Already have an account?</Link>
            </form>
          </div>
          <button type='submit' className='bg-gray-200 p-1 mt-3 rounded-md border-[3px] border-purple-900 w-full' onClick={handleSubmit}>
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
