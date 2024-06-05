const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");

const ListingSchema = new Schema({
    title : {
        type: String,
        required: true,
    } ,
    description : String,
    image: {
        url: String,
        filename: String,
    },
    price: Number,
    location: String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    geometry: {
      type: { 
        type: String, // dont do location: {type : string}
        enum: ['Point'], //location type must be point
        // required: true
    },
    coordinates: {
        type: [Number],
        // required: true
    }
}
});

ListingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", ListingSchema);
module.exports = Listing;