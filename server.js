const express = require('express');
const storeRoutes = require('./scr/store/routes'); // Ensure this path is correct

const app = express();
const port = 3000;  // Corrected the port number

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/db", storeRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));