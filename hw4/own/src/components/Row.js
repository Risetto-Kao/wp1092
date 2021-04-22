import React from 'react';
import Cell from './Cell';

const Row = ({columnNo,rowIndex}) => {
    const rowIndexCell = <Cell columnIndex={0} rowIndex={rowIndex} key={0}/>
    const cells = [rowIndexCell];

    for (let j = 0; j<columnNo;j++){

        cells.push(<Cell columnIndex={j+1} rowIndex={rowIndex} key={j+1}/>)
    }


    return (
        <tr>
            {cells}
        </tr>
    )
}



export default Row;