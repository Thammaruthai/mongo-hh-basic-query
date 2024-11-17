import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:27017";
const dbName = "practice-mongo";
const collectionName = "pizzaOrders";

async function run() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const result = await collection.deleteMany({ customer_name: "Jack" });
    console.log(result);
    
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
