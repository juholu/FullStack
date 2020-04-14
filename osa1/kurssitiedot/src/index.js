import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.name}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
    {props.name} {props.exercises}
    </p>
  )
}

const Content = (props) => {
   const {parts} = props
  
  return (
    <div>
      {parts.map((part, i) =>
      <Part key={i} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}
const Total = (props) => {
  return (
    <p><b>total of {props.exerciseCount} exercises</b></p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name}/>
      <Content parts = {course.parts} />
      <Total exerciseCount = {course.parts.reduce((x, y) => {return x + y.exercises}, 0)}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
