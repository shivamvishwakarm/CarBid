import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { createAccount } from '../Redux/authSlice';
import { Modal, ModalContent, Button, Input, useDisclosure } from "@nextui-org/react";
import SignIn from './Signin';
import { StyledEngineProvider } from '@mui/material/styles';



// Import Next.js UI components as needed


const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('buyer');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false); // State for loading indicator

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator

    const actionResult = await dispatch(createAccount({ email, password, name, role, profilePic }));

    if (actionResult.error) {
      setError(actionResult.error.message || "An error occurred during sign up.");
      toast.error(actionResult.error.message || "An error occurred during sign up.");
    } else {
      // If you need to use the result here, directly use actionResult.payload or similar
      navigate('/');
      toast.success('Account created successfully!');
      // modal close
      onOpenChange();
    }

    setLoading(false); // Stop loading indicator
  };

  return (
<>
      <button className='' onClick={onOpen}>Sign up</button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (

            <div className=" text-black max-w-md w-full bg-white p-8 border border-gray-200 rounded-lg shadow-md">
              <h2 className=" text-2xl font-bold mb-4 ">Sign Up</h2>
              {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <Input type="name" label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className=" "
                  />
                </div>
                <div>
                  <Input type="email" label="Email"

                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className=''
                    />
                </div>
                <div>
                  <Input type="password" label="Password"
        
                    required            
            
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 
                    className=""
                  />
                </div>
                <div>
                  <label className="block">
                    <label htmlFor="profilePic" className="block ">Profile Picture</label>
                    <div className="mt-3 flex  flex-col">
                      <span className=" bg-blue-600 rounded-md px-3 py-1 size-2/5 flex items-center justify-center text-sm font-medium mr-2 text-white mb-2">
                        Choose file
                      </span>
                      <input
                        type="file"
                        id="profilePic"
                        onChange={handleProfilePicChange}
                        required
                        className="bg-transparent"
                      />
                    </div>
                  </label>
                </div>
                {/* Conditionally render the Next.js UI button for loading state */}
                {isLoading ? (
                  <Button isLoading color="primary" className="w-full">
                    Loading
                  </Button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                  >
                    Sign Up
                  </button>
                )}
                <p className='underline underline-offset-1 text-center'>
                  Already have an account?{' '}
                  <SignIn />
                </p>
              </form>
            </div>

          )}
        </ModalContent>
      </Modal>
      </>

  );
};

export default SignUp;
