import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addName}>
      <div>
        name: <input 
        value={props.newName}
        onChange={props.handleNameChange}
      />
      </div>
      <div>
        number: <input 
        value={props.newNumber}
        onChange={props.handleNumberChange}
      />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = (props) => {
  return (
    <p>
      {props.person.name} {props.person.number}
      <button onClick={() => props.deletePerson(props.person)}>delete</button>
    </p>
  )
}

const Persons = (props) => {
  //Filter the persons objects
  let filteredPersons = 
    props.persons.filter(person => 
    person.name.toLowerCase().includes(props.filter.toLowerCase()))
  return (
    <div>
      {filteredPersons.map((person) => 
        <Person key={person.id} person={person} 
        deletePerson={props.deletePerson}/>
      )}
    </div>
  )
} 

const Filter = (props) => {
  return (
    <div>
      filter shown with <input 
      value={props.filter}
      onChange={props.handleFilterChange}
    />
    </div>
  )
}
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
    let person = persons.find(el => el.name === newName)
    if (person) {
      if (person.number !== newNumber) {
        if (window.confirm(`${person.name} is already added to phonebook, 
        replace the old number with a new one?`)) {
          const personObject = {
            name: newName, number: newNumber
          }
          let id = person.id
          personService
            .update(person.id, personObject)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== id ? person : returnedPerson))  
              setNotification(
                `Updated ${person.name}`
              )
              setTimeout(() => {
                setNotification(null)
              }, 5000)
          })
        }
      }
      else {
        window.alert(`${newName} is already added to phonebook`)
      }
    }
    else {
      const personObject = {
        name: newName, number: newNumber
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotification(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data)
        })
    }
    setNewName('')
    setNewNumber('')
  }
  const deletePerson = (person) => {
    let deletePerson = window.confirm(`Delete ${person.name} ?`) 
    if(deletePerson) {
      let id = person.id
      personService
        .destroy(id)
        .then(data => {
          setPersons(persons.filter((pers) => pers.id !== id))
          setNotification(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook aaa</h2>
      <Notification message={notification} />
      <Filter filter ={filter} 
      handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange = {handleNumberChange}
        addName = {addName}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson}/>
    </div>
  )
}

export default App