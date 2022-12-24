import { Button } from 'react-bootstrap';
import React, { useState } from 'react'
import {useSelector,useDispatch } from "react-redux"
import { decrementActionCreator, incrementActionCreator } from '../reducers/countReducer';

function Counter() {
    const [value, setValue] = useState(1);

    const {count} = useSelector(state=>state.count);
    const dispatch = useDispatch();

    // const incrementAsync = ()=>{
    // }

    return (
        <>
            <h1>Count - {count}</h1>
            <h1>value - {value}</h1>
            <input type="number" min="1" max="10" placeholder='change value by' onChange={(e)=>setValue(+e.target.value)}/>
            <Button variant='success' onClick={()=>dispatch(incrementActionCreator(value))}>+</Button>
            <Button variant='danger' onClick={()=>dispatch(decrementActionCreator(value))}>-</Button>
            {/* <Button variant='success' onClick={incrementAsync}>Incremen async</Button> */}
        </>
    )
}

export default Counter