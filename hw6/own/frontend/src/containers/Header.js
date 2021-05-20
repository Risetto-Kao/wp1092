import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
  const { addRegularMessage,addErrorMessage } = useScoreCard();
  // const addRegularMessage = useScoreCard().addRegularMessage;
  const handleClear = async () => {
    try {
      console.log('axios frontend before delete');
      const {
        data: { message },
      } = await axios.delete('/api/delete');
      console.log('axios frontend after delete');
      addRegularMessage(message);
          // TODO: axios.xxx call the right api
    } catch (error) {
      const message = error.toString();
      addErrorMessage(message);
    }
  };

  return (
    <Wrapper>
      <Typography variant="h2">ScoreCard DB</Typography>
      <Button variant="contained" color="secondary" onClick={handleClear}>
        Clear
      </Button>
    </Wrapper>
  );
};

export default Header;
