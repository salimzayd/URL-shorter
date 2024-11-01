import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import Routes from './routes/route.js';

const app = express();
const PORT = 4000;

mongoose.connect('mongodb://localhost:27017/url-shortener', {
    useNewUrlParser: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Failed to connect to MongoDB", err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/url', Routes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
