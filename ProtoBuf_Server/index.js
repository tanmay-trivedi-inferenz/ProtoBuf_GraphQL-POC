const express = require("express");
// const fetch = require("node-fetch");
const resJson = require("./MOCKDATA.json");
const app = express();
const port = 3001;
var proto = require("protobufjs");
// const https = require("https");
let Employees;


async function run() {
    const root = await proto.load("employees.proto");
    Employees = root.lookupType("employeespackage.Employees");
}
run().catch((err) => console.log(err));


app.get("/protoData", async (req, res) => {
    // const agent: new https.Agent({
        //     rejectUnauthorized: false;
        // });
        
    const buffer = Employees.encode({ employees: resJson }).finish();
    
    // console.log(buffer)
    res.send(buffer);
    // let p_data = Employees.decode(buffer)
    // console.log(p_data)
});



app.get("/", async (req, res) => {
    res.send(resJson);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})