import { useState } from "react";

const Statistics = (props) => {
  if (props.totalFeedbacks <= 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <div>
        <p>good {props.good}</p>
        <p>neutral {props.neutral}</p>
        <p>bad {props.bad}</p>
        <p>all {props.totalFeedbacks}</p>
        <p>average {props.average}</p>
        <p>positive {props.positive}</p>
      </div>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedbacks = good + neutral + bad;
  const average = (good - bad) / totalFeedbacks;
  const positive = (good / totalFeedbacks) * 100 + " %";

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        totalFeedbacks={totalFeedbacks}
        average={average}
        positive={positive}
      />
    </div>
  );
};

export default App;
