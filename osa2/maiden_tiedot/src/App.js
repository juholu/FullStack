import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

const Country = (props) => {
  return (
    <p>
      {props.country.name}
      <button onClick={() => props.showCountry(props.country)}>show</button>
    </p>
  )
}

const CountryStats = (props) => {
  let country = props.country
  return (
    <div>
      <h2>{country.name}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) =>
        <li key={lang.name}>{lang.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" height="80"></img>
    </div>
  )
}

const Countries = (props) => {
  //Filter the persons objects
  let filteredCountries = 
    props.countries.filter(country => 
    country.name.toLowerCase().includes(props.filter.toLowerCase()))
  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>  
    )
  }
  else if (filteredCountries.length === 1) {
    props.showCountry(filteredCountries[0])
    return (
      ''
    )
  }
  else {
    return (
      <div>
        {filteredCountries.map((country) => 
          <Country key={country.name} country={country} showCountry={props.showCountry}/>
        )}
      </div>
    )
  }

} 

const Filter = (props) => {
  return (
    <div>
      find countries <input 
      value={props.filter}
      onChange={props.handleFilterChange}
    />
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setNewFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if (selectedCountry) {
      showCountry('')
    } 
  }

  const showCountry = (country) => {
    console.log("aaa", country.name)
    setSelectedCountry(country)
  }

  return (
    <div>
      <Filter filter ={filter} 
      handleFilterChange={handleFilterChange}/>
      {selectedCountry === '' ? <Countries countries={countries} filter={filter} showCountry={showCountry}/> : ''}
      {selectedCountry != '' ? <CountryStats country={selectedCountry}/> : ''}
    </div>
  )
}

export default App
