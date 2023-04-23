import { LocalUser } from "lib/authSlice";
import { useEffect, useState } from "react";

type IState = {
  item: LocalUser | {} 
}

const useLocalStorage = (key: string, initialValue: LocalUser | {} ) => {
  const [value, setValue] = useState(initialValue)
  
  useEffect(() => {
    const item: IState = JSON.parse(localStorage.getItem(key) || '{}');
    if (item) setValue(item)
    return 
  },[])


  return value;
};

export default useLocalStorage;