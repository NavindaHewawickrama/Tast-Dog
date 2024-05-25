// auth.js
import { auth, googleProvider, facebookProvider } from '../firebaseConfig';
import { signInWithPopup } from 'firebase/auth';
import axios from 'axios';

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Extract user information
    const fullName = user.displayName || '';
    const emailOrPhoneNumber = user.email || '';
    const profilePhotoUrl = user.photoURL || '';

    //  const userToSend = {
    //   fullName,
    //   emailOrPhoneNumber,
    //   password: '', // Set a default password or handle it appropriately
    //   profilePhoto: profilePhotoUrl
    // };

    const response = await axios.post('https://tasty-dog.onrender.com/api/v1/customers/register', {
        fullName,
        password: '', 
        emailOrPhoneNumber,
        profilePhoto: profilePhotoUrl
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      }); 
  
      console.log(response.status); // Logs the status code
    console.log(response.data); // Logs the response data

      if (response.status !== 201) { 
        alert(`Registration failed: ${response.data.message}`);
        throw new Error('Registration failed');
      } else {
        // Registration successful
        window.alert("Registration Successful");
        localStorage.setItem("userName", fullName);
        localStorage.setItem("userEmail", emailOrPhoneNumber);
        localStorage.setItem("pwReg", '');
        localStorage.setItem("userId", response.data.customer._id);
      }
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google: ", error);
    throw error;
  } 
};
 
export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Facebook: ", error);
    throw error;
  }
};

export const logInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
  
      const emailOrPhoneNumber = user.email || '';
  
      const response = await axios.post('https://tasty-dog.onrender.com/api/v1/customers/login', {
        emailOrPhoneNumber,
        password: '' 
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      if (response.status === 200) {
        const data = response.data;
  
        window.alert("Sign in Successful");
        localStorage.setItem("userEmail", emailOrPhoneNumber);
        localStorage.setItem("userName", user.displayName || ''); 
        localStorage.setItem("profilePhotoUrl", user.photoURL || '');
        localStorage.setItem("userId", user._id || '');
      } else {
        throw new Error('Sign in failed');
      }
    } catch (error) {
      console.error('Error signing in with Google:', error);
      window.alert('Sign in failed: ' + error.message);
    }
  };
