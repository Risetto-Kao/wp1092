import { useEffect, useState } from 'react';
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
// align-items: center;
// justify-content: center;
const Row = styled.div`
  display: flex;

  width: 100%;
  padding: 1em;
  & button {
    margin-right: 3em;
  }
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

  const [canGoToNext, setCanGoToNext] = useState(false);
  const [queryDataLength, setQueryDataLength] = useState(0);
  const [showDataLength, setShowDataLength] = useState('Data: - / -')
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxInOnePage = 3;
  const handleChange = (func) => (event) => {
    func(event.target.value);
  };

  useEffect(() => {
    if (queryDataLength === 0) {
      setCanGoToNext(false);
      setShowDataLength('Data: - / -');}
    else if (queryDataLength === 1) {
      setCanGoToNext(false)
      setShowDataLength(`Data: 1 / 1`);}
    else if (queryDataLength <= currentIndex + maxInOnePage) {
      setCanGoToNext(false)
      setShowDataLength(`Data: ${currentIndex + 1}~${queryDataLength} / ${queryDataLength}`);}
    else if (queryDataLength > currentIndex + maxInOnePage){
      setCanGoToNext(true)
      setShowDataLength(`Data: ${currentIndex + 1}~${currentIndex + maxInOnePage} / ${queryDataLength}`);}
  }, [currentIndex, queryDataLength])



  const handleAdd = async () => {

    const {
      data: { message, card },
    } = await axios.post('/api/create-card', {
      name,
      subject,
      score,
    });
    console.log(message)
    if (!card) {
      addErrorMessage(message); setShowDataLength('Data: - / -');
    }
    else addCardMessage(message);
    setInitialState();
    setQueryDataLength(0);
  };

  const handleQuery = async () => {

    const {
      data: { messages, message, allDataLength },
    } = await axios.post('/api/query-data', {
      queryString,
      queryType,
      currentIndex,
      maxInOnePage
    })

    setQueryDataLength(allDataLength) // TODO: axios.xxx call the right api

    if (!messages) {
      addErrorMessage(message); setShowDataLength('Data: - / -');
    }
    else {
      const parsedMessages = JSON.parse(messages);
      let showData = [];
      parsedMessages.map((e) => showData.push(`Name: ${e.name}, Subject: ${e.subject}, Score: ${e.score}`))
      addRegularMessage(...showData);
    }
    setInitialState();
  };

  const setInitialState = () => {
    // setQueryString('')
    setName('');
    setSubject('');
  }



  const handleNextPage = async () => {
    setCurrentIndex(3);
    console.log(currentIndex)
    let sendIndex = currentIndex + maxInOnePage
    console.log('before handleQuery');
    const {
      data: { messages, message },
    } = await axios.post('/api/query-data', {
      queryString,
      queryType,
      currentIndex: sendIndex,
      maxInOnePage
    })
    if (!messages) {
      addErrorMessage(message); setShowDataLength('Data: - / -');
    }
    else {
      const parsedMessages = JSON.parse(messages);
      let showData = [];
      parsedMessages.map((e) => showData.push(`Name: ${e.name}, Subject: ${e.subject}, Score: ${e.score}`))
      addRegularMessage(...showData);
    }
  }


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
      <ContentPaper variant="outlined">
        {messages.map((m, i) => (
          <Typography variant="body2" key={m + i} style={{ color: m.color }}>
            {m.message}
          </Typography>
        ))}
      </ContentPaper>
      <Row>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          disabled={!canGoToNext}
          onClick={handleNextPage}
        >Next</Button>
        <Typography variant="h5">{showDataLength}</Typography>
      </Row>
    </Wrapper>
  );
};

export default Body;
