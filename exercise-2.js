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

    //ใช้ findOne ในการหาข้อมูล Document ของลูกค้าชื่อ Zoe จากนั้นให้ทำการ Transform ข้อมูลให้เหลือแค่ Property total_price และ customer_name
    const result = await collection.findOne(
      { customer_name: "Zoe" },
      { projection: { total_price: 1, customer_name: 1, _id: 0 } }
    );
    console.log(result);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
