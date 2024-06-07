const getBook = 'SELECT * FROM public."a1Book" ORDER BY "BookID" ASC';
const getWishlist = 'SELECT * FROM public."n14Wishlist" ORDER BY "WishlistID" ASC';
const getTopRatedBook = 'SELECT * FROM public."j10Review" WHERE "Rating" = 5';
const getReviewforBook = 'SELECT * FROM public."j10Review" WHERE "BookID" = $1';
const getBookbyID = 'SELECT * FROM public."a1Book" WHERE "BookID" = $1';
const getWishlistbyID = 'SELECT * FROM public."n14Wishlist" WHERE "WishlistID" = $1';
const getBookbyAuthor = `SELECT a."AuthorName", b."BookTitle" FROM public."b2Author" a 
    JOIN public."Book_Author" ba ON a."AuthorID" = ba."Author_AuthorID" JOIN public."a1Book" b ON ba."Book_BookID" = b."BookID" 
    WHERE a."AuthorID" = $1`;
const getAuthorbyID = 'SELECT * FROM public."b2Author" WHERE "AuthorID" = $1';
const getBookbyKeyword = 'SELECT * FROM public."a1Book" WHERE "BookTitle" ILIKE '%' || $1 || '%';';
const getWishlistbyIDCust = 'SELECT * FROM public."n14Wishlist" WHERE "CustomerID" = $1';
const checkBookExistbyID = 'SELECT * FROM public."a1Book" AS b WHERE b."BookID" = $1';
const checkWishlistExistbyID = 'SELECT * FROM public."n14Wishlist" AS w WHERE w."WishlistID" = $1';

const addBook = `INSERT INTO public."a1Book" ("BookID", "BookTitle", "BookPrice", "PublicationYear", "Pages", "PublisherID", "Quantity") 
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;
const addWishlist = `INSERT INTO public."n14Wishlist" ("WishlistID", "CustomerID", "BookID", "DateAdded", "Quantity") 
    VALUES ($1, $2, $3, $4, $5)`;
const addAuthorBook = 'INSERT INTO public."Book_Author" ("Book_BookID", "Author_AuthorID") VALUES ($1, $2)';

const updateWishlist = 'UPDATE public."n14Wishlist" SET "BookID" = $1, "Quantity" = $2 WHERE "WishlistID" = $3';
const updateBookQuantity = 'UPDATE public."a1Book" SET "Quantity" = $1 WHERE "BookID" = $2';

const deleteWishlistbyIDCust = 'DELETE FROM public."n14Wishlist" WHERE "CustomerID" = $1';
const deleteWishlistbyIDWL = 'DELETE FROM public."n14Wishlist" WHERE "WishlistID" = $1';

module.exports = {
    getBook,
    getWishlist,
    getTopRatedBook,
    getReviewforBook,
    getBookbyAuthor,
    getAuthorbyID,
    getBookbyKeyword,
    getWishlistbyIDCust,
    deleteWishlistbyIDCust,
    checkBookExistbyID,
    checkWishlistExistbyID, 
    addWishlist, 
    addBook,
    updateBookQuantity,
    addAuthorBook,
    getBookbyID,
    getWishlistbyID, 
    updateWishlist,
    deleteWishlistbyIDWL,
};

