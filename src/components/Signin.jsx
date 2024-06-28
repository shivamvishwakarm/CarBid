import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { login } from '../Redux/authSlice.js'; // Update import
import {Modal, ModalContent, Button,Input, useDisclosure} from "@nextui-org/react";
import SignUp from './Signup.jsx';
import { StyledEngineProvider } from '@mui/material/styles';




const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false); // State for loading indicator
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = async () => {
    setLoading(true)

    try {
      const res = await dispatch(login({ email, password }));
      console.log(res);
      toast.success('Login successful!'); // Show success toast
      onOpenChange(); // close the modal
      navigate('/'); // Redirect on successful login
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.');
      toast.error('Login failed. Please check your credentials and try again.'); // Show error toast
    }
    setLoading(false)
  };

  return (
    <StyledEngineProvider injectFirst>

    <button onClick={onOpen}>Login</button>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>   
           <ModalContent>
           {(onClose) => (
      <div className="max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 ">Login/register</h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <div className="mb-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" "
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full"
          />
        </div>
        {isLoading ? (
            <Button isLoading color="primary" className="w-full">
              Loading
            </Button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={handleSignIn}
            >
              Sign In
            </button>
          )}
        <div className="mt-4 text-center">
          <p className='underline underline-offset-1'>
            Don't have an account?{' '}
        

            <SignUp />
        
          </p>
        </div>
      </div>
  )}
  </ModalContent>
</Modal>
</StyledEngineProvider>
  );
};

export default SignIn;
