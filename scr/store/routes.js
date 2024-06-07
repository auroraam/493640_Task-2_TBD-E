const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get("/book", controller.getBook);
router.get("/wishlist", controller.getWishlist);
router.get("/book/top", controller.getTopRatedBook);
router.get("/review/:BookID", controller.getReviewforBook);
router.get("/book/author/:AuthorID", controller.getBookbyAuthor);
router.get("/book/:keyword", controller.getBookbyKeyword);

router.post("/book/add", controller.addBook);
router.post("/wishlist/add", controller.addWishlist);

router.delete("/wishlist/delete/cust/:CustomerID", controller.deleteWishlistbyIDCust);
router.delete("/wishlist/delete/wish/:WishlistID", controller.deleteWishlistbyIDWL);

router.put("/book/update/quantity/:BookID", controller.updateBookQuantity);
router.put("/wishlist/update/:WishlistID", controller.updateWishlist);

router.post("/book/add/author", controller.addBookandAuthor);

module.exports = router;