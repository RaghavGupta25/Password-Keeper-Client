import { Toaster } from "react-hot-toast"
import AddBankCard from "./components/AddBankCard"
import AddPassword from "./components/AddPassword"
import PasswordList from "./components/PasswordList"
import BankCardList from "./components/BankCardList"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import './index.css'
import { Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/authContext"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/passwords' element={<ProtectedRoute><PasswordList /></ProtectedRoute>} />
          <Route path='/cards' element={<ProtectedRoute><BankCardList /></ProtectedRoute>} />
          <Route path='/addpassword' element={<ProtectedRoute><AddPassword /></ProtectedRoute>} />
          <Route path='/addcard' element={<ProtectedRoute><AddBankCard /></ProtectedRoute>} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </>
  )
}

export default App
