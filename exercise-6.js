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

    await collection.updateMany(
      { customer_name: "Jack" },
      { $set: { isAdmin: false } }
    );

    await collection.updateMany(
      {}, 
      { $set: { country: "Thailand" } } 
    );
    

    await collection.updateOne(
      { customer_name: "M" }, 
      {
        $set: {
          size: "large",
          total_price: 200000,
          quantity: 20,
          customer_name: "M",
          credit_card_type: "mastercard",
          created_at: "2022-01-01T10:48:40Z",
        },
      },
      { upsert: true } 
    );
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
