import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const getRandomIndex = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };

  const [selected, setSelected] = useState(getRandomIndex());
  const [votes, setVotes] = useState(new Uint32Array(anecdotes.length));
  const [maxVotes, setMaxVotes] = useState(-1);

  const handleVote = () => {
    setVotes((prevVotes) => {
      const newVotes = new Uint32Array(prevVotes);
      newVotes[selected] += 1;

      // Find the index of the anecdote with the highest votes
      const maxVoteIndex = newVotes.indexOf(Math.max(...newVotes));
      setMaxVotes(maxVoteIndex);

      return newVotes;
    });
  };

  const handleNextAnecdote = () => {
    const index = getRandomIndex();
    setSelected(index);
  };

  return (
    <main>
      <div>
        <h2>Anecdote of the day</h2>
        <p>{anecdotes[selected]}</p>
        <p>Has {votes[selected]} votes</p>
        <button onClick={handleVote}>vote</button>
        <button onClick={handleNextAnecdote}>next anecdote</button>
      </div>
      {maxVotes >= 0 && (
        <div>
          <h2>Anecdote with most votes</h2>
          <p>{anecdotes[maxVotes]}</p>
        </div>
      )}
    </main>
  );
};

export default App;
