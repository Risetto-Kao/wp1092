import Grid from '../components/Grid'
export default function Row ({key,row_value}) {
    return (

        <tr>
          {row_value.map((value,column_idx)=>(<Grid row_idx={key} column_idx={column_idx} value={value}></Grid>))}
        </tr>

    );
};


