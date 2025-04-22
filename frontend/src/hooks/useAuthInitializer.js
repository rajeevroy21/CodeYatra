import  { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';
import axios from 'axios';

const useAuthInitializer = () => {
  const [auth, setAuth] = useRecoilState(authState); 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get('https://codeyatra.onrender.com/api/auth/me', {
          withCredentials: true, 
        });
        if (res.status === 200) {
          setAuth({
            isLoggedIn: true,
            user: res.data.user, 
          });
        } else {
          setAuth({
            isLoggedIn: false,
            user: null,
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setAuth({
          isLoggedIn: false,
          user: null,
        });
      }
    };
    fetchUser();
  }, [setAuth]);
  return null; 
};
export default useAuthInitializer;
