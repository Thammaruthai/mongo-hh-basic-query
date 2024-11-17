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

    const result1 = await collection
      .find({
        quantity: { $lt: 5 },
        credit_card_type: "mastercard"
      })
      .toArray();

    console.log(result1);

    const result2 = await collection
      .find({
        size: "small",
        quantity: { $gte: 1, $lte: 5 }
      })
      .toArray();

    console.log(result2);

    const result3 = await collection
      .find({
        quantity: { $gt: 10 },
        credit_card_type: null
      })
      .toArray();

    console.log(result3);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
