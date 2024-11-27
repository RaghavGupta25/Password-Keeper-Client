import React, { useState, useEffect } from "react";
import { IoSearchCircle } from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import toast from 'react-hot-toast';
import useStore from "../store/useStore";
import { useAuth } from "../context/authContext";

const PasswordList = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { passwords, loadPasswords, deletePassword, updatePassword, handleLogout } = useStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState({})
    const [editingId, setEditingId] = useState('')
    const [editForm, setEditForm] = useState({ username: '', website: '', password: '' })
    const [show, setShow] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {
        loadPasswords();
    }, [loadPasswords]);

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:3000/signout', {}, { withCredentials: true });
            if (response.status === 200) {
                toast.success('Logged Out Successfully')
                setIsAuthenticated(false)
                navigate('/signin', {replace: true})
            }
        } catch (err) {
            toast.error("Error in logout")
        }
    }

    const handleEditClick = (password) => {
        setEditingId(password.id);
        setEditForm({ username: password.username, website: password.website, password: password.password });
    };

    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleUpdatePassword = (id) => {
        updatePassword(id, editForm);
        setEditingId(null);
    };

    const handleSearch = () => {
        const filtered = passwords.filter(password =>
            password.website.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setIsSearching(true);
        setSearchResults(filtered);
    };

    const cancelSearch = () => {
        setSearchQuery('');
        setIsSearching(false);
        setSearchResults([]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-zinc-900 w-[1200px] mt-4 pt-4 rounded-md h-52 flex flex-col items-center'>
                <span className="text-white bolder mt-[5px] text-6xl">YOUR PASSWORDS</span>
                <div className="flex flex-row space-x-4 mt-6">
                    <button onClick={() => navigate('/addpassword')} className="bg-white text-black rounded-sm px-4 py-2">Create New</button>
                    <Link to='/cards' className="bg-white text-black rounded-sm px-4 py-2 flex items-center">Bank Cards</Link>
                    <button onClick={logout} className="bg-white text-black rounded-sm px-4 py-2">Logout</button>
                </div>
            </div>
            <div className="mt-20 border border-[3px] border-zinc-900 w-[1200px] rounded-md">
                <div className="mt-4 ml-4 mb-4 space-x-1 flex items-center">
                    <input
                        type='text'
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className='border border-zinc-900 rounded-md px-2 py-1' />
                    <button onClick={handleSearch}>
                        <IoSearchCircle className="w-12 h-12" />
                    </button>
                    {isSearching && <button onClick={cancelSearch}><TbZoomCancelFilled className="w-12 h-12" />
                    </button>}
                </div>

                {(isSearching && searchResults.length === 0) || (passwords.length === 0) ? (
                    <p className="ml-4 mb-4 mt-4">No passwords found. Create a new one Now!</p>
                ) : (<ul>
                    {(searchResults.length > 0 ? searchResults : passwords).map((password) => (
                        <li key={password.id} className="border border-zinc-900 border-[2px] rounded-md p-4 mt-4 ml-4 mb-4 mr-4">
                            {editingId === password.id ? (
                                <div className="flex flex-col">
                                    <label htmlFor="website">Website:</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={editForm.website}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor="username" className="mt-2">Username:</label>
                                    <input
                                        type="text"
                                        name="username"
                                        value={editForm.username}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor="password" className="mt-2">Password:</label>
                                    <input
                                        type="text"
                                        name="password"
                                        value={editForm.password}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <div className="space-x-2  mt-2">
                                        <button onClick={() => handleUpdatePassword(password.id)}
                                            className="bg-zinc-900 text-white mt-2 p-1 rounded-md">
                                            <FaCheck />
                                        </button>
                                        <button onClick={() => setEditingId(null)}
                                            className="bg-zinc-900 text-white mt-2 p-1 rounded-md">
                                            <RxCross2 />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <span className="font-semibold cursor-pointer" onClick={() => setShow(show === password.id ? null : password.id)}>{password.website}</span>
                                    {show === password.id && (<>
                                        <p>Username: {password.username}</p>
                                        <p>Password: {password.password}</p>
                                        <div className="space-x-2">
                                            <button onClick={() => handleEditClick(password)} className="bg-zinc-900 text-white mt-2 p-1 rounded-md"><MdModeEditOutline />
                                            </button>
                                            <button onClick={() => deletePassword(password.id)} className="bg-zinc-900 text-white mt-2 p-1 rounded-md"><MdDelete />
                                            </button>
                                        </div>
                                    </>)}
                                </>
                            )}
                        </li>
                    ))}
                </ul>)}
            </div>

        </div>
    )
}

export default PasswordList