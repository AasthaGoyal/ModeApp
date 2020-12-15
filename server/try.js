const mongoose = require("mongoose");

try {
  mongoose.connect("mongodb://127.0.0.1:27017/dbmode", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(()=> console.log("Database connected"))
  .catch(err => console.log('err is', err));

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));

  db.once("open", function () {
    console.log("we are connected");
  });
} catch (error) {
  console.log("some error", error);
}

// module.exports = app;

// MongoClient = require("mongodb").MongoClient;

// async function main() {
//     /**
//      * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
//      * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
//      */
//     const uri = "mongodb+srv://aasthag:daasthag@cluster0.ktmdx.mongodb.net/dbmode?retryWrites=true&w=majority";

//     const client = new MongoClient(uri);

//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Make the appropriate DB calls
//         await listDatabases(client);

//     } catch (e) {
//         console.error('error is', e);
//     } finally {
//         await client.close();
//     }
// }

// async function listDatabases(client) {

//     databasesList = await client.db().admin().listDatabases();

//     console.log("Databases:");

//     databasesList.databases.forEach(db => console.log(` - ${db.name}`));

// };

// main().catch(console.error);
