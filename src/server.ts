import axios from 'axios';
import express, { Request, Response } from 'express';
import { crawlDriver, crawlTeam , crawlSchedule } from './crawl/crawl';
import { connectToDatabase } from './database/database'
const app = express();


try {
    
    connectToDatabase();
} catch (error) {
    
}
// Crawling data 
crawlDriver();
crawlTeam();
crawlSchedule();
app.get('/', async (req: Request, res: Response) => {
    res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});