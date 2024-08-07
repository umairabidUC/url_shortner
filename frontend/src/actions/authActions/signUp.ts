"use server";
import axios from 'axios';
import { setAccessToken } from '@/../utils/tokenStorage';

export async function signUpAction(data: { username: string; email: string; password: string; role_id: Number }) {
  try {
    const response = await axios.post('http://localhost:3500/auth/signup', {
      username: data.username,
      email: data.email,
      password_hash: data.password,
      role_id: data.role_id,
    });

    if (response.data.result.access_token) {
      setAccessToken(response.data.result.access_token);
      return {error: null}
    } else {
      return { error: 'Sign-up failed' };
    }
  } catch (error) {
    return { error: 'Server error or invalid data' };
  }
}
