export const getAccessToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  };
  
  export const setAccessToken = (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', token);
    }
  };
  
  export const removeAccessToken = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
  };
  