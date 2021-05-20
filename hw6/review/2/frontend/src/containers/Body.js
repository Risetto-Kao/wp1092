import { useState } from 'react';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { useStyles } from '../hooks';
import axios from '../api';
import { useScoreCard } from '../hooks/useScoreCard';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
  const classes = useStyles();

  const { messages, addCardMessage, addRegularMessage, addErrorMessage } =
    useScoreCard();

  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [score, setScore] = useState(0);

  const [queryType, setQueryType] = useState('name');
  const [queryString, setQueryString] = useState('');
  const [sorttype,setsorttype]=useState("none");

  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  const handleAdd = async () => {
    console.log("send")
    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });

    if (!card) addErrorMessage(message);
    else addCardMessage(message);
    console.log(card);
    
  };

  const handleQuery = async () => {
    console.log("query:"+queryType+" "+queryString)
    const {
      data: { messages, message },
    } = await axios.get('/api/Query',{params:{queryType,queryString}});// TODO: axios.xxx call the right api

    if (!messages) addErrorMessage(message);
    else {
      //messages.map((card)=>("name:"+card.name+" subject:"+card.subject+" score:"+card.score))
      //console.log(messages.map((card)=>("name:"+card.name+" subject:"+card.subject+" score:"+card.score)))
      if(messages.length===0){
        addRegularMessage([queryType+"("+queryString+") not found"])
        return;
      }
      if(sorttype=="high2low"){
        messages.sort((a,b)=>(a.score<b.score?1:-1))
      }else if(sorttype=="low2high"){
        messages.sort((a,b)=>(a.score>b.score?1:-1))
      }
      //console.log(sortmsg);
      const cardsmsg=messages.map((card)=>("name:"+card.name+" subject:"+card.subject+" score:"+card.score))
      addRegularMessage(...cardsmsg)
     // addRegularMessage(...messages)
    };
  };

  return (
    <Wrapper>
      <Row>
        {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
        <TextField
          className={classes.input}
          placeholder="Name"
          value={name}
          onChange={handleChange(setName)}
        />
        <TextField
          className={classes.input}
          placeholder="Subject"
          style={{ width: 240 }}
          value={subject}
          onChange={handleChange(setSubject)}
        />
        <TextField
          className={classes.input}
          placeholder="Score"
          value={score}
          onChange={handleChange(setScore)}
          type="number"
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!name || !subject}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={queryType}
              onChange={handleChange(setQueryType)}
            >
              <FormControlLabel
                value="name"
                control={<Radio color="primary" />}
                label="Name"
              />
              <FormControlLabel
                value="subject"
                control={<Radio color="primary" />}
                label="Subject"
              />
              <FormControlLabel
                value="score"
                control={<Radio color="primary" />}
                label="score-higher-than"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
        <TextField
          placeholder="Query string..."
          value={queryString}
          onChange={handleChange(setQueryString)}
          style={{ flex: 1 }}
        />
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!queryString}
          onClick={handleQuery}
        >
          Query
        </Button>
      </Row>
      <Row>
        <StyledFormControl>
          <FormControl component="fieldset">
            <RadioGroup
              row
              value={sorttype}
              onChange={handleChange(setsorttype)}
            >
              <FormControlLabel
                value="high2low"
                control={<Radio color="primary" />}
                label="sort_score_high_to_low"
              />
              <FormControlLabel
                value="low2high"
                control={<Radio color="primary" />}
                label="sort_score_low_to_high"
              />
              <FormControlLabel
                value="none"
                control={<Radio color="primary" />}
                label="unsort"
              />
            </RadioGroup>
          </FormControl>
        </StyledFormControl>
      </Row>
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
    </Wrapper>
  );
};

export default Body;
