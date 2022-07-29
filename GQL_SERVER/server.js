const { ApolloServer, gql } = require('apollo-server');
// const { employeeData } = require('./MOCKDATA')
var proto = require("protobufjs");
// import proto from './employees.proto'
let Employees;
// const { employeeData } = require('../Protobuf/MOCK-DATA')
// const typeDefs = require('./schema')
// const Query = require("./resolvers/Query")
// const express = require("express");
// const fetch = require("node-fetch");
const fs = require("fs")
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));


async function run() {
  const root = await proto.load("employees.proto");
  Employees = root.lookupType("employeespackage.Employees");
}
run().catch((err) => console.log(err));


  let p_data

  const fetch_proto_data = () => {
    fetch("http://localhost:3001/protoData")
      .then((data) => data.arrayBuffer())
      .then((result) => {
        const decodeData = Buffer.from(result);
        p_data = Employees.decode(decodeData)
        fs.writeFileSync("p_data", p_data.toString())
        console.log(p_data.employees);
        // fs.writeFileSync("p_data", p_data)
        // console.log(p_data)
        // return p_data;
      })
  }

// ------------------------------------


fetch_proto_data();

setTimeout(()=>{

  const typeDefs = gql`

  type Employee {
        ID: Int
        firstname: String
        lastname: String
        email: String 
        gender: String
  }

  type Query {
    queryData: [Employee]
  }
`
const resolvers = {
  Query: {
    queryData: () => p_data.employees,
  },
};
// return resolvers
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
})
// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

// console.log(p_data)

}, 5000)








