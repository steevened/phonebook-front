import { useEffect, useState } from 'react'
import './App.css'
import PersonsItem from './components/PersonsItem'
import PersonsForm from './components/PersonsForm'
import personsService from './services/persons'

function App() {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [nameRepeated, setNameRepeated] = useState(null)

  useEffect(() => {
    let nameRepeatedFromArray = persons.find(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    )
    setNameRepeated(nameRepeatedFromArray)
  }, [newName])

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id)
    const confirm = window.confirm(`Delete ${personToDelete.name}?`)
    if (confirm) {
      personsService.deletePerson(id).then((returnedPerson) => {
        setPersons(
          persons.map((person) => (person.id !== id ? person : returnedPerson))
        )
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }

    if (nameRepeated && newNumber) {
      const id = nameRepeated.id
      const phoneChanged = { ...nameRepeated, number: newNumber }
      const confirm = window.confirm(
        `${nameRepeated.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirm) {
        personsService.updatePerson(id, phoneChanged).then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== id ? person : returnedPerson
            )
          )
        })
      }
    } else if (!newName) {
      alert(`Add a name`)
    } else if (!newNumber) {
      alert(`Add a number`)
    } else {
      personsService.createPerson(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  useEffect(() => {
    personsService
      .getPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  console.log(persons)

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      <div>
        Filter shown with{' '}
        <input
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        />
      </div>
      <h2>Add a new</h2>
      <div>
        <PersonsForm
          handleSubmit={handleSubmit}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
        />
      </div>

      <h2>Numbers</h2>
      {persons && (
        <div>
          {
            <ul>
              {persons.map((person, i) => (
                <PersonsItem
                  key={person ? person.id : i}
                  person={person}
                  filterValue={filterValue}
                  handleDelete={handleDelete}
                  persons={persons}
                />
              ))}
            </ul>
          }
        </div>
      )}
    </div>
  )
}

export default App
