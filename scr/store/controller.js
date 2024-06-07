const pool = require('../../database');
const queries = require('./queries');


//select
const getBook = (req, res) => {
    pool.query(queries.getBook, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getWishlist = (req, res) => {
    pool.query(queries.getWishlist, (error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getTopRatedBook = (req,res) => {
    pool.query(queries.getTopRatedBook, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

const getReviewforBook = (req, res) => {
    const BookID = parseInt(req.params.BookID);
    
    pool.query(queries.getBookbyID, [BookID], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Book does not exist.");
        }
        pool.query(queries.getReviewforBook, [BookID], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    });
};

const getBookbyAuthor = (req, res) => {
    const AuthorID = parseInt(req.params.AuthorID);
    
    pool.query(queries.getAuthorbyID, [AuthorID], (error, results) => {
        const noAuthorFound = !results.rows.length;
        if (noAuthorFound) {
            res.send("Author does not exist.");
        }
        pool.query(queries.getBookbyAuthor, [AuthorID], (error, results) => {
            if (error) throw error;
            res.status(200).json(results.rows);
        });
    });
};

const getBookbyKeyword = (req, res) => {
    const { keyword } = req.params;
    
    pool.query(queries.getBookbyKeyword, [keyword], (error, results) => {
        if (error) throw error;
        const noBooksFound = !results.rows.length;
        if (noBooksFound) {
            res.status(404).send("There was not a book title with the given keyword.");
        } else {
            res.status(200).json(results.rows);
        }
    });
};


//add
const addBook = (req,res) => {
    const { BookID, BookTitle, BookPrice, PublicationYear, Pages, PublisherID, Quantity } = req.body;

    pool.query(queries.checkBookExistbyID, [BookID], (error, results) => {
        if (results.rows.length) {
            res.send("Book already exists.");
        }
        pool.query(queries.addBook, [BookID, BookTitle, BookPrice, PublicationYear, Pages, PublisherID, Quantity], (error, results) => {
            if (error) throw error;
            res.status(201).send("New Book added successfully.");
        });
    });
};

const addWishlist = (req,res) => {
    const { WishlistID, CustomerID, BookID, DateAdded, Quantity } = req.body;

    pool.query(queries.checkWishlistExistbyID, [WishlistID], (error, results) => {
        if (results.rows.length) {
            res.send("Wishlist already exists.");
        }
        pool.query(queries.addWishlist, [WishlistID, CustomerID, BookID, DateAdded, Quantity], (error, results) => {
            if (error) throw error;
            res.status(201).send("New Wishlist added successfully.");
        });
    });
};


//delete
const deleteWishlistbyIDCust = (req, res) => {
    const CustomerID = parseInt(req.params.CustomerID);
    
    pool.query(queries.getWishlistbyIDCust, [CustomerID], (error, results) => {
        const noWishlistFound = !results.rows.length;
        if (noWishlistFound) {
            res.send("Failed to delete because the wishlist does not exist.");
        }
        pool.query(queries.deleteWishlistbyIDCust, [CustomerID], (error, results) => {
            if (error) throw error;
            res.status(200).send("Wishlist removed successfully.");
        });
    });
};

const deleteWishlistbyIDWL = (req, res) => {
    const WishlistID = parseInt(req.params.WishlistID);
    
    pool.query(queries.getWishlistbyID, [WishlistID], (error, results) => {
        const noWishlistFound = !results.rows.length;
        if (noWishlistFound) {
            res.send("Failed to delete because the wishlist does not exist.");
        }
        pool.query(queries.deleteWishlistbyIDWL, [WishlistID], (error, results) => {
            if (error) throw error;
            res.status(200).send("Wishlist removed successfully.");
        });
    });
};


//update
const updateBookQuantity = (req,res) => {
    const BookID = parseInt(req.params.BookID);
    const { Quantity } = req.body;
    pool.query(queries.getBookbyID, [BookID], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Failed to update because the book does not exist.");
        }
        pool.query(queries.updateBookQuantity, [Quantity, BookID], (error, results) => {
            if (error) throw error;
            res.status(200).send("Book quantity updated successfully.");
        });
    });
};

const updateWishlist = (req, res) => {
    const WishlistID = parseInt(req.params.WishlistID);
    const { BookID, Quantity } = req.body;

    pool.query(queries.getWishlistbyID, [WishlistID], (error, results) => {
        const noWishlistFound = !results.rows.length;
        if (noWishlistFound) {
            res.send("Failed to update because the wishlist does not exist.");
        }
        pool.query(queries.updateWishlist, [BookID, Quantity, WishlistID], (error, results) => {
            if (error) throw error;
            res.status(200).send("Wishlist updated successfully.");
        });
    });
};


//transaction
const addBookandAuthor = async (req, res) => {
    const client = await pool.connect();
    const { BookID, BookTitle, BookPrice, PublicationYear, Pages, PublisherID, Quantity, AuthorID } = req.body;
    
    try {
        await client.query('BEGIN');
        // Check if BookID already exists
        const bookExists = await client.query(queries.checkBookExistbyID, [BookID]);
        if (bookExists.rows.length) {
            await client.query('ROLLBACK');
            return res.status(400).send("Book already exists.");
        }
        // Add new book
        const result = await client.query(queries.addBook, [BookID, BookTitle, BookPrice, PublicationYear, Pages, PublisherID, Quantity]);
        // Add to author_book table
        await client.query(queries.addAuthorBook, [BookID, AuthorID]);

        await client.query('COMMIT');
        res.status(201).send("New book and author association added successfully.");
    } catch (error) {
        await client.query('ROLLBACK');
        throw error;
    } finally {
        client.release();
    }
};

module.exports = {
    getBook,
    getWishlist,
    getTopRatedBook,
    getReviewforBook,
    getBookbyAuthor,
    getBookbyKeyword,

    addBook,
    addWishlist,
    addBookandAuthor,

    deleteWishlistbyIDCust,
    deleteWishlistbyIDWL,

    updateBookQuantity,
    updateWishlist,
};