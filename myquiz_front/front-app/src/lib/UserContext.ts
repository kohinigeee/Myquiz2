import React, {createContext } from "react"
import { User } from "./userdata";

interface UserContext {
    user : User | undefined
    setUser : any
}

export const DataContext = createContext<UserContext>({
    user : undefined,
    setUser : undefined,
}) 