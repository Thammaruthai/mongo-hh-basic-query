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

    //Sort ข้อมูลทั้งหมดด้วย Property total_price จากมากไปน้อย
    const result2 = await collection.find().sort({ total_price: -1 }).toArray();
    //console.log(result2);
    //Sort ข้อมูลทั้งหมดด้วย Property created_at จากวันที่เก่าที่สุดไปใหม่ที่สุด
    const result3 = await collection.find().sort({ created_at: 1 }).toArray();

    console.log(result3);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
