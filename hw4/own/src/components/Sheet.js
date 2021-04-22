import React, { useState } from 'react';
// import { render } from 'react-dom';
import Row from './Row';

const Sheet = () => {
    const [columnNo, setColumnNo] = useState(26);
    const [rowNo, setRowNo] = useState(100)
    const columnIndex = <Row columnNo={columnNo} rowIndex={0} key={0}/>
    const rows = [columnIndex];

    for (let i = 0; i < rowNo; i++) {
        rows.push(<Row columnNo={columnNo} rowIndex={i+1} key={i+1}/>)
        console.log(i)
    }

    const addColumnNo = () => {
        setColumnNo(columnNo+1)
    }

    const minusColumnNo = () => {
        setColumnNo(columnNo-1)
    }

    const addRowNo = () => {
        setRowNo(rowNo+1)
    }

    const minusRowNo = () => {
        setRowNo(rowNo-1)
    }



    return <>

        <div>
        <span>Column </span>
            <span><button id='add-column' onClick={addColumnNo}>+</button></span>
            <span><button id='minus-column' onClick={minusColumnNo}>-</button></span>
        </div>
        <div>
            <span>Row </span>
        <span><button id='add-row' onClick={addRowNo}>+</button></span>
        <span><button id='minus-row' onClick={minusRowNo}>-</button></span>
        <table>
            <tbody>{rows}</tbody>
        </table>
        </div>
        
    </>
}

export default Sheet;