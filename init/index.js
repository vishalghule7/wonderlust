const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MongoUrl = "mongodb://127.0.0.1:27017/bharatbnb"

main()
.then(() => {
    console.log("connected to DBs");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MongoUrl);
}

const initDB = async () => {
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj , owner : "661ad66d41e3e5390ba3b38f"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();