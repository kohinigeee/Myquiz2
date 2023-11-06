import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { useState, useEffect } from "react"
import { User, setLoginUser } from '@/lib/userdata';
import { store } from "../store/store";
import { Provider } from 'react-redux';
import "../styles/globals/globals.css"


export default function App({ Component, pageProps }: AppProps) {
  
  // useEffect( () => {
  //   const tmp = async() => {
  //     await setLoginUser(setUser)
  //   }
  //   tmp();
  // }, [])

  return (
  <>
  <Provider store={store}>
  <Component {...pageProps} />
  </Provider>
  </>
  )
}
