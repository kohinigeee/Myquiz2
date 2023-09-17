import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { DataContext } from '@/lib/UserContext';
import { useState, useEffect } from "react"
import { User, setLoginUser } from '@/lib/userdata';
import "../styles/globals/globals.css"

export default function App({ Component, pageProps }: AppProps) {

  const [user, setUser] = useState<User|undefined>(undefined)
  useEffect( () => {
    const tmp = async() => {
      await setLoginUser(setUser)
    }
    tmp();
  }, [])

  return (
  <>
  <DataContext.Provider value={{ user, setUser}}>
  <Component {...pageProps} />
  </DataContext.Provider>
  </>
  )
}
