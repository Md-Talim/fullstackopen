const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exerciseCount}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      <Part name={props.name1} exerciseCount={props.count1} />
      <Part name={props.name2} exerciseCount={props.count2} />
      <Part name={props.name3} exerciseCount={props.count3} />
    </>
  );
};

const Total = (props) => {
  return <p>Number of exercises {props.total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

  return (
    <div>
      <Header course={course} />
      <Content
        name1={part1.name}
        name2={part2.name}
        name3={part3.name}
        count1={part1.exercises}
        count2={part2.exercises}
        count3={part3.exercises}
      />
      <Total total={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  );
};

export default App;
