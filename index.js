const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
var cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xgh8h2c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const userCollection = client.db("briteScholars").collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log({ user });
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }

  app.get("/", (req, res) => {
    res.send("Brite scholar is running!");
  });
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Brite scholar is running!");
});

app.listen(port, () => {
  console.log(`Brite scholars are listening on port ${port}`);
});
