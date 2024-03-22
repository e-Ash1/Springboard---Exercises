import { useEffect, useState } from 'react';
import axios  from 'axios';
import { v1 as uuid } from 'uuid';

export const useFlip = () => {
    const [isFacingUp, setIsFacingUp] = useState(true);

    const flipCard = () =>{
        setIsFacingUp(isUp => !isUp);
    };

    return [isFacingUp, flipCard];
};

export const useLocalStorage = (key, init) =>{
    //Intializes a useState with a value that is from local storage or init:
    const [item, setItem] = useState(() =>{
        const storedVal = (window.localStorage.getItem(key));
        //Returns a cached value if there is a storedVal:
            return storedVal !== null ? JSON.parse(storedVal) : init;
    });

    //Updates the local storage when the item-value changes:
    useEffect(()=>{
        window.localStorage.setItem(key,JSON.stringify(item));
    },[item]); //Only updates when "item" changes value

    return [item,setItem];
};

export const useAxios = (baseUrl, storageKey) => {
    //Intializiation of the data with localStorage, providing a key and an initial value:
    const [data, setData] = useLocalStorage(storageKey, []);

    const addItem = async (urlParam='') => {
        try {
            //Edge-case handling that prevents objects from appending to the end of the url:
            const url= typeof (urlParam) === 'string' ? `${baseUrl}${urlParam}`:baseUrl;
            const response = await axios.get(url);
            setData(currentData => [...currentData, { ...response.data, id: uuid() }]);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const clearItems = () => {
        setData([]);  // Clears the data
    };

    return [data, addItem, clearItems];
};


