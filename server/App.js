const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const dbService = require("./dbService");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create
app.post("/insert", (request, response) => {
    const { firstName } = request.body;
    const { lastName } = request.body;
    const { team } = request.body;
    const { points } = request.body;
    const { rebounds } = request.body;
    const { asists } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewPlayer(
        firstName,
        lastName,
        team,
        points,
        rebounds,
        asists
    );

    result
        .then((data) => response.json({ data: data }))
        .catch((err) => console.log(err));
});
// read
app.get("/getAll", (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();

    result
        .then((data) => response.json({ data: data }))
        .catch((err) => console.log(err));
});
//search
app.get("/search/:name", (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    result
        .then((data) => response.json({ data: data }))
        .catch((err) => console.log(err));
});
// delete
app.delete("/delete/:id", (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);

    result
        .then((data) => response.json({ success: data }))
        .catch((err) => console.log(err));
});
// update
app.patch("/update", (request, response) => {
    console.log(request);
    console.log(request.body);

    const { id, firstName } = request.body;
    console.log(id, firstName);
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, firstName);

    result
        .then((data) => response.json({ success: data }))
        .catch((err) => console.log(err));
});
app.listen(process.env.PORT, () => console.log("app is running"));





