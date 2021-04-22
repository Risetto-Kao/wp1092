import React, { useEffect, useState } from 'react';

const Cell = ({ columnIndex, rowIndex }) => {

    let cellID = `cell-${columnIndex}-${rowIndex}`;
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

    useEffect(() => {
        // setIsEditMode(true)
        console.log(`${columnIndex}-${rowIndex} is selected`)
    }, [isEditMode])


    
    const generateColumnIndex = columnIndex =>{
        let letter = ''
        let tmp = columnIndex;
        while ( tmp > 26 ){
            letter = String.fromCharCode(96 + (tmp % 26 !== 0 ? tmp % 26 : 26)).toUpperCase() + letter;
            tmp = parseInt(tmp/26);
        }
        letter = String.fromCharCode(96 + (tmp % 26 !== 0 ? tmp % 26 : 26)).toUpperCase() + letter;
        
        return letter;
    }

    let fixedValue = '';

    if (rowIndex !== 0 && columnIndex === 0){
        fixedValue = rowIndex;
    } else if (rowIndex === 0 && columnIndex !== 0){
        fixedValue = generateColumnIndex(columnIndex);
    } 


    let inputCell = <input id={cellID} className='input-cell' type='text' onKeyDown={(e) => handleInputSubmit(e)} ></input>;
    let showCell = <div id={cellID} className='show-cell' onClick={handleEditMode} onDoubleClick={handleEditMode}>{inputText}</div>




    if (rowIndex !== 0 && columnIndex !== 0) {
        return (<td>
            {isEditMode ? inputCell : showCell}
        </td>)
    } else {
            return (<td>
                <div id={cellID} className='fixed-cell'>{fixedValue}</div>
            </td>)
    }

}
export default Cell;