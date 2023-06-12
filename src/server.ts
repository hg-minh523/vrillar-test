import express, { Request, Response,Application } from 'express';
import { connectToDatabase } from './database/database';
import {routes} from './routes/app'
import {crawData} from './crawl/crawl'
const app: Application = express();

try {
    connectToDatabase();
} catch (error) {
    
}
// crawData();
routes(app);

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});