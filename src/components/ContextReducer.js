import React, { createContext, useContext, useReducer } from 'react'

const CartStateContext=createContext();
const CartDispatchContext=createContext();

const reducer=(state,action)=>{
  switch(action.type){
    case "ADD":
      const temp = [...state, { id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
      localStorage.setItem('Lastcart',JSON.stringify(temp))
        return temp
        case "Update":
      localStorage.setItem('Lastcart', JSON.stringify(action.data))
          return action.data
    case "REMOVE":
      let newArr=[...state]
      newArr.splice(action.index,1)
      localStorage.setItem('Lastcart', JSON.stringify(newArr))
      return newArr;
      case "DROP":
        let empArr=[]
      localStorage.setItem('Lastcart', JSON.stringify(empArr))
        return empArr;
    default:
        console.log("Error in Reducer");
  }
}

export const CartProvider=({children})=>{
    
    const [state,dispatch]=useReducer(reducer,[]);
    return(
      <CartDispatchContext.Provider value={dispatch}>
        <CartStateContext.Provider value={state}>
            {children}
        </CartStateContext.Provider>
      </CartDispatchContext.Provider>
    )
}

export const useCart=()=>useContext(CartStateContext);
export const useDispathCart=()=>useContext(CartDispatchContext);