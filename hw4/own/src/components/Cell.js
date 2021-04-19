import React,{useState} from 'react';
const Cell = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputText, setInputText] = useState('46321');
    const changeMode = () =>{
        if(isEditMode){
            setIsEditMode(false);
        } else setIsEditMode(true);
    }
 
    return isEditMode ? <input type='text' onClick={changeMode}></input>:<button onClick={changeMode}>{inputText}</button>


    
}
export default Cell;