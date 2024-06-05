const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
// const ExpressError = require("../utils/ExpressError.js");
// const { ListingSchema , reviewSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const { isLoggedIn , isOwner , validateLisiting} = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({storage });

//Index Route
// create route
router.route("/")
    .get( wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.single("listing[image]"),
        validateLisiting,
        wrapAsync(listingController.createRoute)
    );


//Add new Listings
router.get("/new" ,isLoggedIn, listingController.newForm);


//Show Route //update route //Delete route
router.route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateLisiting,
    wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isOwner,
    wrapAsync(listingController.deleteListing))

//Edit route
router.get("/:id/edit" ,
isLoggedIn,
isOwner,
wrapAsync(listingController.renderEditForm));

module.exports = router;
