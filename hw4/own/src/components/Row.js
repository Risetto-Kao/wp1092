import React from 'react';
import Cell from './Cell';

// const Row = () => {
    
//     const cells = [];
//     for(let i = 0; i<5 ;i++){
//         cells.push(<Cell text='456' isSelected={true}></Cell>)
//     }
//     return <div>
//         {cells}
//     </div>
// }

function Row(props){
    const cells = [];
    for(let i = 0; i<props.columnNo ;i++){
        
        cells.push(<Cell text='{props.text}' isSelected={i===1?true:false}></Cell>)
    }
    return <div>
        {cells}
    </div>
}
// const Row = () => {
//     const cells = []

//     for (let x = 0; x < 5; x += 1) {
//       cells.push(
//         <Cell
//         isSelected = {true}
//         text = 'test'
//         />,
//       )
//     }
//     return (
//       <div>
//         {cells}
//       </div>
//     )
//   }


export default Row;