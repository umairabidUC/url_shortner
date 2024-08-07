"use server";
import axios from 'axios';
import { setAccessToken } from '@/../utils/tokenStorage';
import { redirect } from 'next/navigation';

export async function signInAction(data: { email: string; password: string }) {
  try {
    const response = await axios.post('http://localhost:3500/auth/signin', {
      email: data.email,
      password: data.password,
    });
    if (response.data.result.access_token) {
      console.log("REACHED HERE ACCESS TOKEN: ", response.data.result.access_token)
      setAccessToken(response.data.result.access_token);
      return {error: null}
    } else {
      return { error: 'Authentication failed' };
    }
  } catch (error) {
    console.log(error)
    return { error: 'Invalid credentials or server error' };
  }
}
