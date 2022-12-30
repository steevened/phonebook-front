import React from 'react'

const Notification = ({ persons, numberChanged }) => {
  const lastNameAdded = persons[persons.length - 1]?.name

  return (
    <div>
      {!numberChanged ? (
        <p>Added {lastNameAdded}</p>
      ) : (
        <p>Number of {numberChanged.name} has been updated</p>
      )}
    </div>
  )
}

export default Notification
