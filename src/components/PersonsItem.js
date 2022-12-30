import React from 'react'

const personsItem = ({ person, persons, filterValue, handleDelete }) => {
  // const allNames = persons.map((person) => person.name)
  // const joined = allNames.map((name) => {
  //   return name.split('')
  // })

  // const isIncluded = joined.filter((e) => e.includes(filterValue))
  // console.log(isIncluded)

  return (
    <li>
      {(filterValue.includes(person.name) || filterValue.length === 0) && (
        <>
          <p>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person.id)}>delete</button>
          </p>
        </>
      )}
    </li>
  )
}

export default personsItem
