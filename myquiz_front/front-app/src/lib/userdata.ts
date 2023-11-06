import axios from "axios"
import { BACK_INDEX } from "./constants"
import { makeCORSRequest } from "./axioshelper"

enum accountType {
    Normal, Guest, Admin
}

export interface User {
    id : number
    nameid : string
    namestr : string
    accountType : accountType
}

export const convertJsonToUser = (data : any ) : User | undefined => {
    if ( data.id === undefined ) {
        return undefined
    }
    if ( data.nameid === undefined ) {
        return undefined
    }
    if ( data.namestr === undefined ) {
        return undefined
    }

    const id = data.id
    const nameid = data.nameid 
    const namestr = data.namestr
    let accountTypeValue : accountType

    switch ( data.accountType ) {
        case 0:
           accountTypeValue = accountType.Normal 
           break;
        case 1:
            accountTypeValue = accountType.Guest
            break;
        case 2:
            accountTypeValue = accountType.Admin
            break;
        default:
            return undefined
    };


    const user: User = {
        id : id,
        nameid: nameid,
        namestr :namestr,
        accountType : accountTypeValue,
    } ;

    return user;
}

export const getLoginUser = async ()  => {
    const url = BACK_INDEX+"/api/login"
    let myUser : User | undefined = undefined
    
    await axios.get(url, makeCORSRequest({}))
    .then( res => {
        const userData = res.data.data
        myUser = convertJsonToUser(userData)
    })
    .catch ( err => {
        console.error(err)
    })

    return myUser
}

export const setLoginUser = async ( setUserFunc : any ) => {
    const getUser = await getLoginUser()
    if ( getUser !== undefined ) {
        setUserFunc(getUser)
        console.log("Set Login User :", getUser)
    }
}

export const isLogin = ( user : User | undefined ) : boolean => {
    if ( user === undefined ) return false;
    if ( user.accountType == accountType.Guest ) {
        return false;
    }

    return true;
}

export const createGuestUser = () : User => {
    return {
        id : 0,
        nameid : "Noname",
        namestr : "Noname",
        accountType : accountType.Guest
    }
}