"use server";
import axios from 'axios';
import { setAccessToken } from '@/../utils/tokenStorage';
import { jwtDecode } from "jwt-decode"
export async function signInAction(data: { email: string; password: string }) {
  try {
    const response = await axios.post('http://localhost:3500/auth/signin', {
      email: data.email,
      password: data.password,
    });
    if (response.data.result.access_token) {
      console.log("REACHED HERE ACCESS TOKEN: ", response.data.result.access_token)
      setAccessToken(response.data.result.access_token);
      const decode = jwtDecode(response.data.result.access_token)
      console.log("PAYLOAD", decode)

      return { error: null, decode, token:response.data.result.access_token }
    } else {
      return { error: 'Authentication failed' };
    }
  } catch (error) {
    console.log(error)
    return { error: 'Invalid credentials or server error' };
  }
}
