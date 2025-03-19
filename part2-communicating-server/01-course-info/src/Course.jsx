const Header = (props) => {
  return <h2>{props.title}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};

const Total = (props) => {
  const totalExercises = props.parts.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );
  return <p>Number of exercises {totalExercises}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
