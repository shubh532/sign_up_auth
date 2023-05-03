import { useState } from "react";
import Token from "./TokenApi";

export default function TokenProvider(props){
    const [tokenID,setTokenId]=useState(null)

    function StoreTokenId(id){
        setTokenId(id)
    }
    function DeleteTokenId(id){
        setTokenId(null)
    }

    const defaultValues={
        token:tokenID,
        StoreTokenId:StoreTokenId,
        DeleteTokenId:DeleteTokenId
    }
    return(
        <Token.Provider value={defaultValues}>
            {props.children}
        </Token.Provider>
    )
}