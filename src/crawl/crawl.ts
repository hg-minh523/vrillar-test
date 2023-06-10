import axios from "axios";
import cheerio from 'cheerio';
import { driverType, Driver } from '../models/Driver/Driver.model';
export const crawlTeam = async () => {
    try {
        try {
            const response = await axios.get('https://www.formula1.com/en/teams.html');
            const html = response.data;
        
            const $ = cheerio.load(html);
            
            const teams: any[] = [];
            $('.listing-link').each((index, element) => {
              const rank = $(element).find('.rank').text().trim();
              const point = $(element).find('.f1-wide--s').text().trim();
              const team = $(element).find('.f1-color--black').text().trim();
              const drivers:String[] = [];

              $(element).find('.driver').each((index, element) => {
                const firstname  = $(element).find('.first-name').text().trim();
                const lastname = $(element).find('.last-name').text().trim();
                drivers.push(firstname+ " "+ lastname );
              });
              teams.push({ rank,point,team,drivers });
            });
        
            console.log(teams);
          } catch (error) {
            console.error('Error occurred while crawling:', error);
          }

    } catch (error) {
        console.error('Error occurred while crawling:', error);
    }
}


export const crawlDriver = async () => {
        try {
            const response = await axios.get('https://www.formula1.com/en/drivers.html');
            const html = response.data;
        
            const $ = cheerio.load(html);
            
            const drivers: driverType[] = [];
            $('.listing-item--link ').each((index, element) => {
              const rank = $(element).find('.rank').text().trim();
              const point = $(element).find('.f1-wide--s').text().trim();
              const team = $(element).find('p').text().trim();
              let name = ""

              $(element).find('.listing-item--name').each((index, element) => {
                const nameL  = $(element).find('.f1--xxs').text().trim();
                const nameF  = $(element).find('.f1-bold--s').text().trim();
                name = nameL + " "+nameF;
              });
              drivers.push({ rank,point,team,name });
            });
          
          for (var i = 0 ; i < drivers.length;i++){
            let driver:driverType = drivers[i];
            await Driver.create(driver); 
          }
          } catch (error) {
            console.error('Error occurred while crawling:', error);
          }
}


export const crawlSchedule = async () => {
    try {
        try {
            const response = await axios.get('https://www.formula1.com/en/racing/2023.html');
            const html = response.data;
        
            const $ = cheerio.load(html);
            
            const shedule: any[] = [];
            $('.event-item-link').each((index, element) => {
              const date = $(element).find('.no-margin').text().trim();
              const dateComplete = $(element).find('.event-completed').text().trim();
              const round = $(element).find('.card-title').text().trim();
              const eventTitle = $(element).find('.event-title').text().trim();
              const place = $(element).find('.event-place').text().trim();
           
              shedule.push({ date,dateComplete,round,eventTitle,place });
            });
            
          } catch (error) {
            console.error('Error occurred while crawling:', error);
          }

    } catch (error) {
        console.error('Error occurred while crawling:', error);
    }
}