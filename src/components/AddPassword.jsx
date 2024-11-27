import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddPassword = () => {
    const [website, setWebsite] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/add', { website, username, password , loginType:'password'}, { withCredentials: true });
          toast.success('Added Succesfully!')
          navigate('/passwords');
        } catch (err) {
            console.log(err);
            toast.error(err.response?.data?.message || 'An error occurred');
        }
      };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded-md mt-4 bg-zinc-900 h-52 w-[1200px]">
                <span className="text-4xl text-white">Add a New Password</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-10">
                <label>Website:</label>
                <input
                    type='text'
                    className='mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1'
                    placeholder="Enter Website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    required />
                <label>Username:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required />
                <label>Password:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required />
                <button type="submit" className="border border-slate-900 border-2 rounded-md">CREATE</button>
            </form>
        </div>
    )
}

export default AddPassword