import React,{useEffect,useState} from 'react';

export default function NewCell() {

    let cellID = `cell-${0}-${0}`;
    const [isEditMode, setIsEditMode] = useState(false);
    const [inputText, setInputText] = useState('');

    const handleEditMode = () => {
        if (isEditMode) {
            setIsEditMode(false);
        } else {setIsEditMode(true);}

    }

    const handleInputSubmit = (e) => {
        setInputText(e.target.value);
        if (e.key === 'Enter') {
            handleEditMode();
        } else if (e.key === 'Delete'){
            setInputText('');
        }
        console.log(inputText);
    }

    useEffect(()=>{
        
    },[isEditMode])


    let canInput =         <input 
    className='show-cell'
    value={inputText}
    on={handleEditMode}
    onKeyDown={(e)=>handleInputSubmit(e)}
    onChange={(e)=>setInputText(e.target.value)}/>
    let cantInput = <div className='show-cell' onClick={handleEditMode}>{inputText}</div>
    return isEditMode ? canInput : cantInput
}
