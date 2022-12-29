const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require("morgan");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})