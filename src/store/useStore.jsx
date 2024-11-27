import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

const useStore = create((set) => ({
  passwords: [],
  bankCards: [],

  loadPasswords: async () => {
    try {
      const response = await axios.get('http://localhost:3000/passwords', { withCredentials: true });
      set({ passwords: Array.isArray(response.data) ? response.data : [] });
    } catch (err) {
      console.error('Error fetching passwords:', err);
    }
  },

  loadBankCards: async () => {
    try {
      const response = await axios.get('http://localhost:3000/cards', {withCredentials:true});
      set({ bankCards: Array.isArray(response.data) ? response.data : [] });
    } catch (err) {
      console.error('Error fetching bank cards:', err);
    }
  },

  deletePassword: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/passwords/${id}`, { withCredentials: true });
      set((state) => ({
        passwords: state.passwords.filter(password => password.id !== id),
      }));
      toast.success('Deleted Successfully')
    } catch (err) {
      console.error('Error deleting password:', err);
      toast.error('Error While Deleting')
    }
  },

  deleteBankCard: async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cards/${id}`, { withCredentials: true });
      set((state) => ({
        bankCards: state.bankCards.filter(card => card.id !== id),
      }));
      toast.success('Deleted Successfully')
    } catch (err) {
      console.error('Error deleting bank card:', err);
      toast.error('Error While Deleting')
    }
  },

  updatePassword: async (id, updatedData) => {
    updatedData = { ...updatedData, loginType: "password" };
    try {
      await axios.patch(`http://localhost:3000/passwords/${id}`, updatedData, { withCredentials: true });
      set((state) => ({
        passwords: state.passwords.map(password =>
          password.id === id ? { ...password, ...updatedData } : password
        ),
      }));
      toast.success('Updated!')
    } catch (err) {
      console.error('Error updating password:', err);
      toast.error('Cannot Be Updated')
    }
  },

  updateBankCard: async (id, updatedData) => {
    updatedData = { ...updatedData, loginType: "card" };
    try {
      await axios.patch(`http://localhost:3000/cards/${id}`, updatedData, { withCredentials: true });
      set((state) => ({
        bankCards: state.bankCards.map(card =>
          card.id === id ? { ...card, ...updatedData } : card
        ),
      }));
      toast.success('Updated!')
    } catch (err) {
      console.error('Error updating bank card:', err);
      toast.error('Cannot Be Updated')
    }
  },
}));

export default useStore;
