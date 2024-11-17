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

    //ใช้ findOne ในการหาข้อมูล Document ของลูกค้าชื่อ Cherlyn
    const result = await collection.findOne({ customer_name: "Cherlyn" });
    console.log(result);

    //ใช้ find ในการหาข้อมูล Document ทั้งหมดที่จ่ายเงินด้วย Credit Card ของ mastercard
    const result2 = await collection
      .find({ credit_card_type: "mastercard" })
      .toArray();
    console.log(result2);

    //ใช้ find ในการหาข้อมูล Document ทั้งหมดที่สั่ง Pizza ขนาด medium โดย Limit จำนวนข้อมูลแค่ 5 Documents
    const result3 = await collection
      .find({ credit_card_type: "mastercard" })
      .limit(5)
      .toArray();
    console.log(result3);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

run();
