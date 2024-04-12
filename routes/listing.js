const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

//SEARCH ROUTE

router.post("/search" , listingController.searchListing);

//CREATE ROUTE and INDEX ROUTE
router
    .route("/")
    .get(wrapAsync (listingController.index))
    .post(isLoggedIn , upload.single('listing[image]') , validateListing  ,wrapAsync (listingController.createListing));

//FILTER ROUTE

router.get("/filter/:id" , wrapAsync(listingController.filterListing));


//NEW ROUTE
 router.get("/new" , isLoggedIn ,listingController.renderNewForm);
     
//SHOW ROUTE, UPDATE AND DELETE  ROUTE
router.route("/:id")
.get( wrapAsync ( listingController.showListing))
.put(isLoggedIn , isOwner, upload.single('listing[image]'), validateListing ,wrapAsync ( listingController.updateListing))
.delete(isLoggedIn, isOwner,wrapAsync (listingController.destroyListing )); 



//EDIT ROUTE

 router.get("/:id/edit" , isLoggedIn ,isOwner ,wrapAsync (listingController.renderEditForm));


 module.exports = router;
 