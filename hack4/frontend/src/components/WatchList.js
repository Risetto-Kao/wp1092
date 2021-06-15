import constants from '../constants';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql } from '@apollo/client';
// Look at this file and see how the watchList is strucutred
const STATUS_COUNT_QUERY = gql`
    query statusCount(
        $severity:Int
        $locationKeyWords:[String!]!
    ){
        statusCount(
            severity:$severity
            locationKeyWords:$locationKeyWords
        )
    }
`



export default function WatchList() {

    // TODO
    // query countStats
    // save the result in a counts variable
  
    // const { loading, error, data, subscribeToMore } = useQuery(STATUS_COUNT_QUERY);


    const { loading, error, data, subscribeToMore } = useQuery(STATUS_COUNT_QUERY,{
        variables:{
            severity:1,
            locationKeyWords:constants.watchList
        }
    });

    console.log(error)
    console.log(data)


 
    const counts = data;

    // TODO
    // use subscription

    // DO NOT MODIFY BELOW THIS LINE
    return (
        <table>
            <tbody>
                <tr>
                    <th>Keyword</th>
                    <th>Count</th>
                </tr>
                {
                    constants.watchList.map(
                        (keyword, idx) =>
                            <tr key={keyword}>
                                <td>{keyword}</td>
                                {/* You might need to see this */}
                                <td id={`count-${idx}`}>{!counts || !counts.statsCount || counts.statsCount[idx]}</td>
                            </tr>
                    )
                }
            </tbody>
        </table>
    );
}