import React from 'react';
// import { render } from 'react-dom';
import Row from './Row';

function Sheet(rowsNo) {
    const rows = [];
    for(let i = 0;i<rowsNo;i++){
        rows.push(<Row ></Row>)
    }
    return <div>{rows}</div>
}

export default Sheet;