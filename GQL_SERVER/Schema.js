const { gql } = require('apollo-server');

const typeDefs = gql`

  type EmployeeData {
        ID: Int
        first_name: String
        last_name: String
        email: String 
        gender: String
  }

  type Query {
    employeeData: [EmployeeData]
  }
`

module.exports = typeDefs
