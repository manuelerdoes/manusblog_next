'use server'

import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebase';
 
export async function authenticate(formData) {
    const { email, password } = Object.fromEntries(formData);
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log(auth.currentUser);
  } catch (error) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}