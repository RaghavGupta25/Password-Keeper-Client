import React, { useState, useEffect } from "react";
import { IoSearchCircle} from "react-icons/io5";
import { TbZoomCancelFilled } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { MdModeEditOutline } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { MdDelete } from "react-icons/md";
import useStore from "../store/useStore";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../context/authContext";

const BankCardList = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const { bankCards, loadBankCards, deleteBankCard, updateBankCard } = useStore();
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({ cardHolder: '', expiry: '', bank: '', cardNumber: '', cvv: '' });
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([]);
    const [show, setShow] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        loadBankCards();
    }, [loadBankCards]);

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

    const handleEditClick = (card) => {
        setEditingId(card.id);
        setEditForm({ cardHolder: card.cardHolder, expiry: card.expiry, bank: card.bank, cardNumber: card.cardNumber, cvv: card.cvv });
    };

    const handleEditFormChange = (e) => {
        setEditForm({ ...editForm, [e.target.name]: e.target.value });
    };

    const handleUpdateCard = (id) => {
        updateBankCard(id, editForm);
        setEditingId(null);
    };

    const handleSearch = () => {
        const filtered = bankCards.filter(card =>
            card.bank.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setIsSearching(true)
        setSearchResults(filtered);
    };

    const cancelSearch = () => {
        setIsSearching(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <div className='bg-zinc-900 w-[1200px] mt-4 pt-4 rounded-md h-52 flex flex-col items-center'>
                <span className="text-white bolder mt-[5px] text-6xl">YOUR BANK CARDS</span>
                <div className="flex flex-row space-x-4 mt-6">
                    <button onClick={() => navigate('/addcard')} className="bg-white text-black rounded-sm px-4 py-2">Create New</button>
                    <Link to='/passwords' className="bg-white text-black rounded-sm px-4 py-2 flex items-center">Passwords</Link>
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

                {(isSearching && searchResults.length === 0) || (bankCards.length === 0) ? (
                    <p className="ml-4 mb-4 mt-4">No cards found. Create a new one Now!</p>
                ) : (<ul>
                    {(searchResults.length > 0 ? searchResults : bankCards).map((card) => (
                        <li key={card.id} className="border border-zinc-900 border-[2px] rounded-md p-4 mt-4 ml-4 mb-4 mr-4">
                            {editingId === card.id ? (
                                <div className="flex flex-col">
                                    <label htmlFor='cardHolder'>Card Holder:</label>
                                    <input
                                        type="text"
                                        name="cardHolder"
                                        value={editForm.cardHolder}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor='cardNumber'>Card Number:</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={editForm.cardNumber}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor='expiry'>Expiry Date:</label>
                                    <input
                                        type="text"
                                        name="expiry"
                                        value={editForm.expiry}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor='cvv'>CVV:</label>
                                    <input
                                        type="text"
                                        name="cvv"
                                        value={editForm.cvv}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <label htmlFor='bank'>Bank Name:</label>
                                    <input
                                        type="text"
                                        name="bank"
                                        value={editForm.bank}
                                        onChange={handleEditFormChange}
                                        className='border border-zinc-900 rounded-md px-2 py-1'
                                    />
                                    <div className="space-x-2  mt-2">
                                        <button onClick={() => handleUpdateCard(card.id)}
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
                                    <span className="font-semibold cursor-pointer" onClick={() => setShow(show === card.id ? null : card.id)}>{card.bank}</span>
                                    {show === card.id && (<>
                                        <p>Card Holder: {card.cardHolder}</p>
                                        <p>Card Number: {card.cardNumber}</p>
                                        <p>Expiry: {card.expiry}</p>
                                        <p>CVV: {card.cvv}</p>
                                        <div className="space-x-2">
                                            <button onClick={() => handleEditClick(card)} className="bg-zinc-900 text-white mt-2 p-1 rounded-md"><MdModeEditOutline />
                                            </button>
                                            <button onClick={() => deleteBankCard(card.id)} className="bg-zinc-900 text-white mt-2 p-1 rounded-md"><MdDelete />
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

export default BankCardList;