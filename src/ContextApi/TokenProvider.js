import { useState } from "react";
import Token from "./TokenApi";

export default function TokenProvider(props){


    const ID=localStorage.getItem("TokenId")
    const [tokenID,setTokenId]=useState(ID)

    function LoggInHandler(id){
        localStorage.setItem("TokenId",id)
        setTokenId(id)
    }
    function LogOutHandler(){
        setTokenId(null)
        localStorage.removeItem("TokenId")
    }

    const defaultValues={
        token:tokenID,
        LoggInHandler:LoggInHandler,
        LogOutHandler:LogOutHandler
    }
    return(
        <Token.Provider value={defaultValues}>
            {props.children}
        </Token.Provider>
    )
}