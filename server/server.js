const express = require('express');
const path = require('path');


const app = express();
const publicPath = path.join(__dirname + "/../public")
console.log(path.join(__dirname + "/../public"));
app.use(express.static(publicPath));

app.get('/', (req, res) => {

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Running On Port PORT`));
