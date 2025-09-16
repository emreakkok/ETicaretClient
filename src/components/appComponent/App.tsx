import './App.css'
import Header from '../headerComponent/Header';
import { Box, CircularProgress } from '@mui/material';
import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import requests from '../../api/request';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setCart } from '../../pages/counter/cartSlite';
import { fetchCurrentUser } from '../../pages/counter/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);
  const [cartLoading, setCartLoading] = useState(true);

  useEffect(() => {
    const fetchInitData = async () => {
      // Token varsa kullanıcı ve sepeti çek
      if (localStorage.getItem("jwt")) {
        await dispatch(fetchCurrentUser());
        try {
          const cart = await requests.Cart.get();
          dispatch(setCart(cart));
        } catch (error) {
          console.error("Cart loading error:", error);
          dispatch(setCart(null));
        }
      } else {
        // Token yoksa sepeti temizle
        dispatch(setCart(null));
      }
      setCartLoading(false);
    };

    fetchInitData();
  }, [dispatch]); // Bağımlılık dizisi sadece dispatch içermeli

  if (loading || cartLoading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress size={100} />
    </Box>
  }

  return (
    <>
      <ToastContainer position='top-right' hideProgressBar theme="colored" />
      <Header />
      <Box sx={{ width: '100%', px: 0 }}>
        <Outlet />
      </Box>
    </>
  )
}


export default App
