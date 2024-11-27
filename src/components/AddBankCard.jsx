import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from "react-hot-toast";

const AddBankCard = () => {
    const [cardHolder, setCardHolder] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [bank, setBank] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3000/add', { cardHolder, cardNumber, expiry, cvv, bank, loginType:'card' }, {withCredentials: true});
          toast.success('Added Successfully!')
          navigate('/cards');
        } catch (err) {
          setError('Error adding bank card');
          toast.error(err.response?.data?.message || 'An error occurred');        }
      };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center rounded-md mt-4 bg-zinc-900 h-52 w-[1200px]">
                <span className="text-4xl text-white">Add a New Bank Card</span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col mt-10">
                <label>Card Number:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required />
                <label>CVV:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required />
                <label>Card Holder:</label>
                <input
                    type='text'
                    className='mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1'
                    placeholder="Enter Card Holder's Name"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required />
                <label>Expiry:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter Card Expiry Date"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    required />
                <label>Bank:</label>
                <input
                    type='text'
                    className="mt-1 mb-2 border border-slate-900 border-2 rounded-md px-2 py-1"
                    placeholder="Enter Bank Name"
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    required />
                <button type="submit" className="border border-slate-900 border-2 rounded-md">CREATE</button>
            </form>
        </div>
    )
}

export default AddBankCard