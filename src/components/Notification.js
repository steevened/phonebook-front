import React from 'react'

const Notification = ({ persons, numberChanged, isError }) => {
  const lastNameAdded = persons[persons.length - 1]?.name

  return (
    <div>
      {!numberChanged ? (
        <p>Added {lastNameAdded}</p>
      ) : !isError ? (
        <p>Number of {numberChanged.name} has been updated</p>
      ) : (
        <p>
          Information of {numberChanged.name} has already been removed from
          server
        </p>
      )}
    </div>
  )
}

export default Notification
