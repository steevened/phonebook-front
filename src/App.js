import { useEffect, useState } from 'react'
import './App.css'
import PersonsItem from './components/PersonsItem'
import PersonsForm from './components/PersonsForm'
import personsService from './services/persons'
import Notification from './components/Notification'

function App() {
  const [persons, setPersons] = useState([])
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [nameRepeated, setNameRepeated] = useState(null)
  const [notificationShowed, setNotificationShowed] = useState(false)
  const [numberChanged, setNumberChanged] = useState(null)
  const [isError, setIsError] = useState(false)
  const [minName, setMinName] = useState(false)
  const [minNumber, setMinNumber] = useState(false)
  const [numberForm, setNumberForm] = useState(false)

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
        setPersons(persons.filter((person) => person.id !== id))
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
      let phoneChanged = { ...nameRepeated, number: newNumber }
      const confirm = window.confirm(
        `${nameRepeated.name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirm) {
        personsService
          .updatePerson(id, phoneChanged)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== id ? person : returnedPerson
              )
            )
          })
          .catch(() => setIsError(true))
        setNewName('')
        setNewNumber('')
        setNotificationShowed(true)
        setNumberChanged(phoneChanged)
      }
    } else if (!newName) {
      alert(`Add a name`)
    } else if (!newNumber) {
      alert(`Add a number`)
    } else {
      setNotificationShowed(true)
      setNumberChanged(null)
      personsService
        .createPerson(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMinName(false)
          setMinNumber(false)
          setNumberForm(false)
        })
        .catch((error) => {
          const { data } = error.response
          if (data.includes('name: ')) {
            setMinName(true)
          }
          if (data.includes('number: ')) {
            setMinNumber(true)
          }
          if (!data.includes('name: ') && data.includes('number: ')) {
            setMinName(false)
            setMinNumber(true)
          }
          if (data.includes('name: ') && !data.includes('number: ')) {
            setMinName(true)
            setMinNumber(false)
          }
          if (data.includes('number: Validator')) {
            setNumberForm(true)
          }
          // console.log(data)
        })
    }
  }

  console.log(numberForm)

  useEffect(() => {
    personsService
      .getPersons()
      .then((initialPersons) => setPersons(initialPersons))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      if (notificationShowed) {
        setNotificationShowed(false)
      }
    }, 5000)
    // setNumberChanged(null)
  }, [notificationShowed])

  // console.log(`min name: ${minName}, min number: ${minNumber}`)

  return (
    <div className='App'>
      <h2>Phonebook</h2>
      {notificationShowed && (
        <Notification
          persons={persons}
          numberChanged={numberChanged}
          isError={isError}
        />
      )}
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
