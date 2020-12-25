const express = require('express');
const app = express();
const PORT = process.env.PORT || 300;
app.use(express.json());

app.get('/', (req, res) => res.sendStatus(200))

app.listen(PORT, () => console.log(PORT))
