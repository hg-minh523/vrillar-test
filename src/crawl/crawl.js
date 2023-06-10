"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crawlSchedule = exports.crawlDriver = exports.crawlTeam = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio_1 = __importDefault(require("cheerio"));
const Driver_model_1 = require("../models/Driver/Driver.model");
const crawlTeam = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const response = yield axios_1.default.get('https://www.formula1.com/en/teams.html');
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const teams = [];
            $('.listing-link').each((index, element) => {
                const rank = $(element).find('.rank').text().trim();
                const point = $(element).find('.f1-wide--s').text().trim();
                const team = $(element).find('.f1-color--black').text().trim();
                const drivers = [];
                $(element).find('.driver').each((index, element) => {
                    const firstname = $(element).find('.first-name').text().trim();
                    const lastname = $(element).find('.last-name').text().trim();
                    drivers.push(firstname + " " + lastname);
                });
                teams.push({ rank, point, team, drivers });
            });
            console.log(teams);
        }
        catch (error) {
            console.error('Error occurred while crawling:', error);
        }
    }
    catch (error) {
        console.error('Error occurred while crawling:', error);
    }
});
exports.crawlTeam = crawlTeam;
const crawlDriver = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get('https://www.formula1.com/en/drivers.html');
        const html = response.data;
        const $ = cheerio_1.default.load(html);
        const drivers = [];
        $('.listing-item--link ').each((index, element) => {
            const rank = $(element).find('.rank').text().trim();
            const point = $(element).find('.f1-wide--s').text().trim();
            const team = $(element).find('p').text().trim();
            let name = "";
            $(element).find('.listing-item--name').each((index, element) => {
                const nameL = $(element).find('.f1--xxs').text().trim();
                const nameF = $(element).find('.f1-bold--s').text().trim();
                name = nameL + " " + nameF;
            });
            drivers.push({ rank, point, team, name });
        });
        for (var i = 0; i < drivers.length; i++) {
            let driver = drivers[i];
            yield Driver_model_1.Driver.create(driver);
        }
    }
    catch (error) {
        console.error('Error occurred while crawling:', error);
    }
});
exports.crawlDriver = crawlDriver;
const crawlSchedule = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        try {
            const response = yield axios_1.default.get('https://www.formula1.com/en/racing/2023.html');
            const html = response.data;
            const $ = cheerio_1.default.load(html);
            const shedule = [];
            $('.event-item-link').each((index, element) => {
                const date = $(element).find('.no-margin').text().trim();
                const dateComplete = $(element).find('.event-completed').text().trim();
                const round = $(element).find('.card-title').text().trim();
                const eventTitle = $(element).find('.event-title').text().trim();
                const place = $(element).find('.event-place').text().trim();
                shedule.push({ date, dateComplete, round, eventTitle, place });
            });
        }
        catch (error) {
            console.error('Error occurred while crawling:', error);
        }
    }
    catch (error) {
        console.error('Error occurred while crawling:', error);
    }
});
exports.crawlSchedule = crawlSchedule;
