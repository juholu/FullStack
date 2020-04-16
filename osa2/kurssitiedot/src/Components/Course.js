import React from 'react'

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts = {props.course.parts} />
      <Total exerciseCount = {props.course.parts.reduce((x, y) => {return x + y.exercises}, 0)}/>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
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
   console.log(parts)
  
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

export default Course