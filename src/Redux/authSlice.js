import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db, storage } from '../config/firebase';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';




const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
};


export const createAccount = createAsyncThunk(
    "/auth/signup",
    async ({ email, password, name, role, profilePic }, { rejectWithValue }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        let profilePicURL = null;
  
        if (profilePic) {
          const profilePicRef = ref(storage, `profile_pics/${userCredential.user.uid}`);
          const snapshot = await uploadBytes(profilePicRef, profilePic);
          profilePicURL = await getDownloadURL(snapshot.ref);
        }
  
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          name: name,
          role: role,
          email: email,
          profilePicURL: profilePicURL
        });
  
        // Optionally, return some user data or success message
        return { uid: userCredential.user.uid, email, name, role, profilePicURL };
      } catch (error) {
        // Log the error for debugging purposes
        console.error("Error creating account:", error);
  
        // Reject the value with a custom error message or error object
        // This allows to handle specific error messages in your component
        return rejectWithValue(error.message || "An error occurred during account creation.");
      }
    }
  );




export const updateProfile = createAsyncThunk(
    '/auth/updateProfile',
    async ({ uid, name, role, profilePic }) => {
        console.log(uid, name, role, profilePic);
        const userDocRef = doc(db, 'users', uid);
        let profilePicURL = null;

        const userDocSnap = await getDoc(userDocRef);
        if (!userDocSnap.exists()) {
            throw new Error('User not found');
        }

        if (profilePic) {
            const profilePicRef = ref(storage, `profile_pics/${uid}`);
            const snapshot = await uploadBytes(profilePicRef, profilePic);
            profilePicURL = await getDownloadURL(snapshot.ref);
        }

        const updateData = { name, role };
        if (profilePicURL) updateData.profilePicURL = profilePicURL;

        await updateDoc(userDocRef, updateData);

        return { uid, name, role, profilePicURL };
    }
);



export const getProfile = createAsyncThunk('/auth/getProfile', async (uid) => {
    const userDocRef = doc(db, 'users', uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        return userDocSnap.data();
    } else {
        throw new Error("User not found");
    }
})



export const login = createAsyncThunk('/auth/login', async ({ email, password }) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const userDocRef = doc(db, 'users', userCredential.user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        userCredential.user.displayName = userData.name;
        return { user: userCredential.user, role: userData };
    } else {
        return { user: userCredential.user, userData: null };
    }
});


export const logout = createAsyncThunk("/auth/logout", async () => {
    await signOut(auth);
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action?.payload?.role.role);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
                state.role = action?.payload?.role.role

            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
                state.role = "";
            })
            .addCase(createAccount.fulfilled, (state, action) => {
                console.log(action.payload);
                localStorage.setItem("data", JSON.stringify({
                    ...action.payload.user,
                    profilePicURL: action.payload.profilePicURL
                }));
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("role", action.payload.role);
                state.isLoggedIn = true;
                state.data = {
                    ...action.payload.user,
                    profilePicURL: action.payload.profilePicURL
                };
                state.role = action.payload.role;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                localStorage.setItem("data", JSON.stringify({ ...state.data, name: action.payload.name, profilePicURL: action.payload.profilePicURL }));
                state.data = { ...state.data, name: action.payload.name, profilePicURL: action.payload.profilePicURL };
                state.role = action.payload.role;
            })
    }
});

export default authSlice.reducer;
