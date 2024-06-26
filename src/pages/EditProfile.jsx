import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, updateProfile } from '../Redux/authSlice';
import { Image } from '@nextui-org/react';
import { FaPen } from "react-icons/fa";

const EditProfile = () => {
  const dispatch = useDispatch();
  const { data, isLoggedIn } = useSelector((state) => state.auth);
  const [name, setName] = useState(data.displayName || '');
  const [role, setRole] = useState(data.role || '');
  const [email, setEmail] = useState(data.email || '');
  const [profilePic, setProfilePic] = useState(null);
  const [previewPic, setPreviewPic] = useState(data.profilePicURL || '');
  const [isEditing, setIsEditing] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      if (isLoggedIn) {
        try {
          const res = await dispatch(getProfile(data.uid));
          if (res.payload) {
            setName(res.payload.name);
            setRole(res.payload.role);
            setEmail(res.payload.email);
            setPreviewPic(res.payload.profilePicURL);
          }
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        }
      }
    };
    fetchProfile();
  }, [dispatch, isLoggedIn, data.uid]);

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
    setPreviewPic(URL.createObjectURL(file));
    setFileName(file.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = data.uid;

    try {
      const res = await dispatch(updateProfile({ uid, name, role, profilePic }));
      setPreviewPic(res.payload.profilePicURL);
      setName(res.payload.name);
      setRole(res.payload.role);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10  p-10 ">
      {!isEditing ? (
        <div className="flex flex-col justify-center items-center text-center p-6 bg-white rounded-lg shadow-lg max-w-sm mx-auto">
          {previewPic ? (
            <div className="mb-4">
              <Image
                src={previewPic}
                alt="Profile"
                className="w-20 h-20 rounded-full mx-auto"
                width={80}
                height={80}
              />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-300 mx-auto mb-4 flex items-center justify-center">
              <span className="text-xl text-white font-bold">{name.charAt(0)}</span>
            </div>
          )}
          <div className='flex flex-col justify-center items-center'>



            <h2 className="text-xl font-semibold mb-2">shivam</h2>
            <p className="text-gray-600 mb-2">vishwakarmashivam@gmail.com</p>
            <p className="text-gray-600 mb-2">879740784</p>
            <p className="text-gray-600 mb-4">Your profile is under review</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 text-blue-800 py-2 px-4 rounded-md flex items-center justify-center bg-blue-100 hover:bg-blue-200 transition"
            >
              <FaPen className="mr-2" /> Edit Details
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 w-full rounded-md border border-gray-300 p-2 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block font-bold text-gray-700">Profile Picture</label>
            {previewPic && <Image src={previewPic} alt="Profile Preview" className="w-20 h-20 rounded-full mb-2" />}
            <div className="flex items-center">
              <label htmlFor="profilePicInput" className="bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-indigo-700">
                Choose File
              </label>
              <input
                id="profilePicInput"
                type="file"
                onChange={handleProfilePicChange}
                className="hidden"
              />
              <span className="ml-2 text-gray-600">{fileName || 'No file chosen'}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Update Profile
          </button>
        </form>
      )}
    </div>
  );
};

export default EditProfile;
