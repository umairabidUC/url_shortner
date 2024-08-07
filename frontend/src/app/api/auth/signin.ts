// src/pages/api/auth/login.ts
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

export default async function loginHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  try {
    // Send a request to your NestJS backend
    const response = await axios.post('http://localhost:3500/auth/login', {
      email,
      password,
    });

    const { accessToken, refreshToken } = response.data;

    // Set the tokens in cookies
    setCookie({ res }, 'accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

    setCookie({ res }, 'refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    // Return success response
    return res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
}
