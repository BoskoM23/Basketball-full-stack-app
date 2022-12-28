const mysql = require("mysql");
const dotenv = require("dotenv");
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Bosko2323!",
    database: "employeedb",
    multipleStatements: true,
});
connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log("db " + connection.state);
});
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }
    //get all the data from db
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM players;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            return response;
        } catch (error) {
            console.log(error);
        }
    }
    async insertNewPlayer(firstName, lastName, Team, points, rebounds, asists) {
        try {
            const id = await new Promise((resolve, reject) => {
                const query =
                    "INSERT INTO players (firstName, lastName, Team, points, rebounds, asists) VALUES (?,?,?,?,?,?);";

                connection.query(
                    query,
                    [firstName, lastName, Team, points, rebounds, asists],
                    (err, result) => {
                        if (err) reject(new Error(err.message));
                        else resolve(result.ID);
                    }
                );
            });
            return {
                id: id,
                firstName: firstName,
                lastName: lastName,
                Team: Team,
                points: points,
                rebounds: rebounds,
                asists: asists,
            };
        } catch (error) {
            console.log(error);
        }
    }
    //search by name function
    async searchByName(firstName) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM players WHERE firstName = ?;";

                connection.query(query, [firstName], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
    //deletes row
    async deleteRowById(ID) {
        try {
            ID = parseInt(ID, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM players WHERE ID = ?";

                connection.query(query, [ID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateNameById(ID, firstName) {
        try {
            ID = parseInt(ID, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE players SET firstName = ? WHERE ID = ?";

                connection.query(query, [firstName, ID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    else resolve(result.affectedRows);
                });
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
module.exports = DbService;