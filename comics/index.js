const axios = require('axios');
const Table = require('cli-table');
const cheerio = require('cheerio');
const url = 'https://leagueofcomicgeeks.com/comics/new-comics';

const table = new Table({
  head: ['Name', 'Publisher', 'Issue #', 'Date'],
  colWidths: [50, 20, 10, 20]
});

const choices = [
  "Marvel Comics",
  "DC Comics",
  "IDW Publishing",
  "Image Comics",
  "Dynamite",
  "BOOM! Studios",
  "Dark Horse Comics",
  "Action Lab Comics",
  "Archie Comics",
  "American Mythology",
  "Oni Press",
  "AfterShock Comics",
  "Aspen Comics",
  "Lion Forge Comics",
  "Scout Comics",
  "Valiant",
  "Zenescope",
  "Archaia",
  "Joe Books",
  "Papercuts",
  "Space Goat Publishing",
  "Titan Books",
  "Vault Comics",
  "Young Animal"
]

const getAllComics = async () => {
  let response;

  try {
    response = await axios.get(url)
  } catch (error) {
    console.log(error)
    return;
  }

  const $ = cheerio.load(response.data);

  $('#comic-list .media-list').children().each(function(val, ele) {
    const name = $(this).find('.comic-title a').text().replace(/#.*/g,'').trim()
    const issue = $(this).find('.comic-title a').text().replace(/.*#/g,'')
    const publisher = $(this).find('.comic-list-content .comic-details strong').text();
    table.push([name, publisher, issue])
  })

  console.log(table.toString());
}

const getComicsByPublisher = async (publisherName) => {

  let response;

  if (choices.indexOf(publisherName) < 0) {
    console.log('Please make sure to select one of the following publishers');
    choices.forEach((val) => console.log(`- ${val}`));
    return
  }

  try {
    response = await axios.get(url)
  } catch (error) {
    console.log(error);
    return;
  }

  const $ = cheerio.load(response.data);

  $('#comic-list .media-list').children().each(function(val, ele) {
    let newDate = null;
    const name = $(this).find('.comic-title a').text().replace(/#.*/g,'').trim();
    const issue = $(this).find('.comic-title a').text().replace(/.*#/g,'');
    const publisher = $(this).find('.comic-list-content .comic-details strong').text();
    const date = $(this).find('.comic-list-content .comic-details').text().match(/\·(.*)\·/)
    if (date !== null) {
      validDate = date.pop().trim()
    }
    if (publisher === publisherName) {
      table.push([name, publisher, issue, validDate]);
    }
  })

  console.log(table.toString());
}

module.exports = {
  getAllComics,
  getComicsByPublisher
}
