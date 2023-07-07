const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const helmet = require('helmet');
const morgan = require('morgan');
const {fileURLToPath} = require('url');
const path = require('path');
const items = require('./data/index.js');
const Item = require('./models/Item');

const app = express();

/** Configs */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
dotenv.config();
app.use(express.json());
app.use(
    helmet({
      contentSecurityPolicy: {
        useDefaults: false,
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "https://checkout.stripe.com", "https://js.stripe.com/v3", "https:", "'unsafe-inline'", "https://ecom-mern-lq59.onrender.com"],
          objectSrc: ["'none'"],
          styleSrc: ["https:", "'unsafe-inline'", "http:"],
          fontSrc: ["https: ", "data:"],
          frameSrc: ["https:"],
          upgradeInsecureRequests: [],
        },
      },
    })
  );
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors(
    {
        origin: ['http://localhost:3001', "https://ecom-mern-lq59.onrender.com"]
    }
));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    // app.use("/assets", express.static(path.join(__dirname, "public/assets")));
    app.use(express.static(path.join(__dirname,'../client/build')));
}

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage});

/** Routes */
// app.post("/item", , createItem);
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/items', require('./routes/api/items'));
app.use('/api/orders', require('./routes/api/orders'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client/build', 'index.html'));
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(() => {

    app.listen(PORT, () => console.log(`Server Port: ${PORT}`))

    /* ADD DATA ONE TIME */
    // Item.insertMany(items);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`))


