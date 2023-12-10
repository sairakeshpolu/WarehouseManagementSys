const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.set('debug', true)
    //.connect("mongodb://127.0.0.1:27017/warehouse", { useNewUrlParser: true, useUnifiedTopology: true })
    .connect("mongodb+srv://rakeshpolu67890:Rakesh67321@cluster0.gshexdx.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

// Use Routes
app.use(cors(corsOptions));
app.use('/api/setList', require('./routes/api/setList'));
app.use('/api/save', require('./routes/api/save'));
app.use('/api/getList', require('./routes/api/getList'));
app.use('/api/update', require('./routes/api/update'));
app.use('/api/delete', require('./routes/api/delete'));
app.use('/api/v1/user', require('./routes/api/user'));
app.use('/api/v1/inventory/items', require('./routes/api/inventoryItems'));
app.use('/api/v1/orders', require('./routes/api/orders'));
app.use('/api/v1/customers', require('./routes/api/customer'));

app.use(express.static('client/build'));

app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

const port = 8080;
app.listen(port, () => console.log(`Server running on port ${port}`));