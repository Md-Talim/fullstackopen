import { useState } from "react";

const StatisticLine = ({ title, value }) => {
  return (
    <p>
      {title}: {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + bad + neutral;
  const average = (good - bad) / total;
  const positive = (good / total) * 100;

  return (
    <div>
      <StatisticLine title={"Good"} value={good} />
      <StatisticLine title={"Neutral"} value={neutral} />
      <StatisticLine title={"Bad"} value={bad} />
      <StatisticLine title={"All"} value={total} />
      <StatisticLine title={"Average"} value={average} />
      <StatisticLine title={"Positive"} value={positive} />
    </div>
  );
};

const Button = ({ title, onClick }) => {
  return <button onClick={onClick}>{title}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <main>
      <h1>Give Feedback</h1>

      <div>
        <Button onClick={handleGood} title={"good"} />
        <Button onClick={handleNeutral} title={"neutral"} />
        <Button onClick={handleBad} title={"bad"} />
      </div>

      <h2>Statistics</h2>

      {good === 0 && bad === 0 && neutral === 0 ? (
        <p>No feedback given</p>
      ) : (
        <Statistics good={good} neutral={neutral} bad={bad} />
      )}
    </main>
  );
};

export default App;
