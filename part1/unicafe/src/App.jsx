import { useState } from "react";

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>;
};

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

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
      <table>
        <tbody>
          <StatisticLine
            text="good"
            value={props.good}
          />
          <StatisticLine
            text="neutral"
            value={props.neutral}
          />
          <StatisticLine
            text="bad"
            value={props.bad}
          />
          <StatisticLine
            text="all"
            value={props.totalFeedbacks}
          />
          <StatisticLine
            text="average"
            value={props.average}
          />
          <StatisticLine
            text="positive"
            value={props.positive}
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
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
        <Button
          onClick={() => setGood(good + 1)}
          text={"good"}
        />
        <Button
          onClick={() => setNeutral(neutral + 1)}
          text={"neutral"}
        />
        <Button
          onClick={() => setBad(bad + 1)}
          text={"bad"}
        />
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
