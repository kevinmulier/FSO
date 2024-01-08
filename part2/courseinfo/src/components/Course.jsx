const Course = ({ courses }) => {
  return (
    <>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      ))}
    </>
  );
};

const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => (
        <Part
          key={part.id}
          part={part}
        />
      ))}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, current) => acc + current.exercises, 0);

  return <b>total of {total} exercises</b>;
};

export default Course;
