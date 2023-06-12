import axios from "axios";
import cheerio from 'cheerio';
import { Driver, driverType } from '../models/Driver/Driver.model';
import { Race, raceType } from '../models/Race/Race.model';
import { RaceDetail, raceDetailType } from '../models/RaceDetail/RaceDetail.model';
import { Team, teamType } from '../models/Team/Team.model';

export async function crawData() {
  for (var i = 1950; i <= 2023; i++) {
    await crawlDriverTable(i);
    await crawlTeam(i);
    await crawlRace(i);
  }

}

async function crawlDriverTable(year: number) {
  const url = `https://www.formula1.com/en/results.html/${year}/drivers.html`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);


    const driverTableRows = $('table.resultsarchive-table tbody tr');

    const driverData: driverType[] = [];

    driverTableRows.each((index, element) => {
      const name = $(element).find('.hide-for-tablet').text().trim() + " " + $(element).find('.hide-for-mobile').text().trim();
      const team = $(element).find('.grey.semi-bold.uppercase.ArchiveLink').text().trim();
      const nationality = $(element).find('td.dark.semi-bold.uppercase').text().trim();
      const points = $(element).find('td.dark.bold').text().trim();
      driverData.push({ name, team, nationality, points });
    });
   
    for (var i = 0; i < driverData.length; i++) {
      const driverItem: driverType = driverData[i];
      driverItem.year = year;
      await Driver.create(driverItem);
    }
  } catch (error) {
    console.error('An error occurred while crawling driver table:', error);
  }
}


async function crawlTeam(year: number) {
  const url = `https://www.formula1.com/en/results.html/${year}/team.html`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const driverTableRows = $('table.resultsarchive-table tbody tr');

    const teamData: teamType[] = [];

    driverTableRows.each((index, element) => {
      const td = $(element).find('td');
      var points = 0, name = "", pos = "";
      td.each((index, element) => {
        if (index == 1) {
          pos = $(element).text().trim();

        }
        if (index == 3) {
          points = parseInt($(element).text().trim());
        }
        if (index == 2) {
          name = $(element).text().trim();
        }
      })

      teamData.push({ pos, name, points });
    });
    if (teamData.length > 0) {
      for (var i = 0; i < teamData.length; i++) {
        const teamItem = teamData[i];
        // teamItem.id = i + 1;
        teamItem.year = year;
        Team.create(teamItem);
      }
    }
  } catch (error) {
    console.error('An error occurred while crawling driver table:', error);
  }
}


async function crawlRace(year: number) {
  const url = `https://www.formula1.com/en/results.html/${year}/races.html`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const raceList = $('.resultsarchive-filter');
    const raceArr: String[] = []
    const raceMap: raceType[] = []

    raceList.each((index, element) => {
      if (index == 2) {
        $(element).find('a').each((index, element) => {
          let data = $(element).attr('href');
          if (!!data) {
            raceArr.push(data);
          }
        })
      }
    });
    const driverTableRows = $('.resultsarchive-table tbody tr');
    driverTableRows.each((index, element) => {
      const td = $(element).find('td')
      var grand = "", date = "", driver = "", car = "", laps = "", time = "", winner = ""
      td.each((index, element) => {
        {
          if (index == 1) {
            grand = $(element).text().trim();
          }
          if (index == 2) {
            date = $(element).text().trim();
          }
          if (index == 3) {
            winner = $(element).find('.hide-for-tablet').text().trim() + " " + $(element).find('.hide-for-mobile').text().trim();

          }
          if (index == 4) {
            car = $(element).text().trim()

          }
          if (index == 5) {

            laps = $(element).text().trim()
          }
          if (index == 6) {
            time = $(element).text().trim()
          }

        }
      })
      raceMap.push({ grand, date, winner, car, laps, time });
    });
    console.log(raceMap);
    if (raceMap.length > 0) {
      for (var i = 0; i < raceMap.length; i++) {
        const raceItem: raceType = {
          grand: raceMap[i].grand,
          date: raceMap[i].date,
          winner: raceMap[i].winner,
          car: raceMap[i].car,
          laps: raceMap[i].laps,
          time: raceMap[i].time,
          year: year,
        };
        await Race.create(raceItem);
      }
    }
    raceArr.shift()
    if (raceArr.length > 0) {
      for (var i = 0; i < raceArr.length; i++) {
        const parts = raceArr[i].split("/");
        let grand =  parts[parts.length - 2].replace(/-/g, " ");;
        grand = grand.replace(/\b\w/g, (match) => match.toUpperCase());
        await crawlRaceDetail(raceArr[i], year, grand);
      }
    }
  } catch (error) {
    console.error('An error occurred while crawling driver table:', error);
  }
}
async function crawlRaceDetail(path: String, year: number, raceMap: String) {
  const url = `https://www.formula1.com${path}`;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const driverTableRows = $('table.resultsarchive-table tbody tr');

    const raceDetail: raceDetailType[] = [];

    driverTableRows.each((index, element) => {
      const td = $(element).find('td')
      var pos = "", no = 0, driver = "", car = "", laps = "", time = "", points = 0
      td.each((index, element) => {
        {
          if (index == 1) {
            pos = $(element).text().trim();
          }
          if (index == 2) {
            no = parseInt($(element).text().trim())
          }
          if (index == 3) {
            driver = $(element).find('.hide-for-tablet').text().trim() + " " + $(element).find('.hide-for-mobile').text().trim();

          }
          if (index == 4) {
            car = $(element).text().trim()
          }
          if (index == 5) {

            laps = $(element).text().trim()
          }
          if (index == 6) {
            time = $(element).text().trim()
          }
          if (index == 7) {
            points = parseInt($(element).text().trim());
          }

        }
      })
      raceDetail.push({ pos, no, driver, car, laps, time, points });
    });
    console.log(raceDetail)
    if (raceDetail.length > 0) {
      for (var i = 0; i < raceDetail.length; i++) {
        const raceDetailItem: raceDetailType = raceDetail[i];
        raceDetailItem.year = year;
        raceDetailItem.map = raceMap;
        RaceDetail.create(raceDetailItem);
      }
    }
  } catch (error) {
    console.error('An error occurred while crawling driver table:', error);
    return [];
  }
}