import React, { useState } from 'react'
import { useParams, useSearchParams } from "react-router-dom"

function Routing() {
    const params = useParams();

    const [URLSearchParams,setURLSearchParams] = useSearchParams();
    
    const [balance, setBalance] = useState(100);
    const [num, setNum] = useState(100);

    return (
        <>
            <div>Routing</div>
            <h1>route params - {JSON.stringify(params)}</h1>
            <h1>search params - {URLSearchParams.get("search")} {URLSearchParams.get("capacity")}</h1>
            <input type="search" placeholder='Enter search query' onChange={e=>setURLSearchParams({'search':e.target.value,"capacity":"128gb"})} />
            <h1>Balance- {balance}</h1>
            <input type="number" onChange={e=>setNum(parseInt(e.target.value))} />
            <button onClick={()=>setBalance(balance=>balance+num)}>Add balance</button>
        </>
    )
}

export default Routing