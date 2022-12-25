const state = { count: 0 }


state.count+=5
state.count--;

console.log(state.count);

const updatedState = {...state,count:state.count+5};