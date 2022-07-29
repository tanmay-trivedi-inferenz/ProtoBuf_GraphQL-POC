
import './App.css';
import { useState } from "react";
import { useQuery, gql } from "@apollo/client"




const FETCH_EMPLOYEE_DATA = gql`
{
  queryData {
    ID
    firstname
    lastname
    email
    gender
  }
}
`

function App() {
  const [query, setQuery] = useState("")
  const { loading, error, data } = useQuery(FETCH_EMPLOYEE_DATA)
  // console.table(data)
  if (loading) return <div>loading...</div>
  if (error) return <div>Some error happen</div>
  return (
    <div className="App" style={{ justifyContent:'center', alignItems: 'center' }}>
      <h5>Employees Data</h5>
      <input placeholder='Search Employee Here' onChange={event => setQuery(event.target.value)} />

      <br></br>
      <br></br>
&nbsp;
      {data.queryData.filter(emp => {
        if (query === '') {
          return (
            emp
          )
        } else if (emp.firstname.toLowerCase().includes(query.toLocaleLowerCase())) {
          return (
            emp
          )
        } else if (emp.lastname.toLowerCase().includes(query.toLocaleLowerCase())) {
          return (
            emp
          )
        } else if (emp.email.toLowerCase().includes(query.toLocaleLowerCase())) {
          return (
            emp
          )
        } else if (emp.gender.toLowerCase().includes(query.toLocaleLowerCase())) {
          return (
            emp
          )
        }
      }).map(emp => {
        return (
          <div key={emp.ID} className="box">
            {/* <th>ID</th>
            
                <th>First Name</th>
                <th>Last Name</th>
                <th>E-Mail</th>
                <th>Gender</th> */}
            ID: {emp.ID}    
            <br></br>
            First Name: {emp.firstname}    
            <br></br>   
            Last Name: {emp.lastname}    
            <br></br>
            E-mail: {emp.email}     
            <br></br>
            Gender: {emp.gender}    
          </div>
        )
      })}
    </div >
  );
}

export default App;
