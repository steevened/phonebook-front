import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = 'https://fsopen-part3.vercel.app/api/persons'

const getPersons = () => {
  const request = axios.get(baseUrl)
  return request.then((res) => res.data)
}

const createPerson = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then((res) => res.data)
}

const updatePerson = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then((res) => res.data)
}

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((res) => res.data)
}

export default {
  getPersons,
  createPerson,
  updatePerson,
  deletePerson,
}
