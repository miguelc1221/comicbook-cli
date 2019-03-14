const axios = require('axios');
const Table = require('cli-table');
const cheerio = require('cheerio');
const url = 'https://leagueofcomicgeeks.com/comics/new-comics';

const table = new Table({
  head: ['Name', 'Publisher', 'Issue #', 'Date'],
  colWidths: [50, 20, 10, 15]
});

const choices = [
  'Marvel Comics',
  'Antarctic Press',
  'Icon',
  'Archaia',
  'Keenspot',
  'DC Comics',
  'IDW Publishing',
  'Image Comics',
  'Dynamite',
  'BOOM! Studios',
  'Dark Horse Comics',
  'Action Lab Comics',
  'Archie Comics',
  'American Mythology',
  'Oni Press',
  'AfterShock Comics',
  'Aspen Comics',
  'Lion Forge Comics',
  'Scout Comics',
  'Valiant',
  'Zenescope',
  'Archaia',
  'Joe Books',
  'Papercuts',
  'Space Goat Publishing',
  'Titan Books',
  'Vault Comics',
  'Young Animal'
];

const getAllComics = async () => {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const date = $('#date_release_week').val();

    $('#comic-list .media-list')
      .children()
      .each(function(val, ele) {
        const name = $(this)
          .find('.comic-title a')
          .text()
          .replace(/#.*/g, '')
          .trim();

        const publisher = $(this)
          .find('.comic-list-content .comic-details strong')
          .text();

        let issue = $(this)
          .find('.comic-title a')
          .text()
          .match(/(#\d.*?\s|#\d.*)/);

        // if comic has no issue number
        if (issue === null) {
          issue = 0;
        } else {
          issue = issue[0].substr(1, issue.length).trim();
        }

        table.push([name, publisher, issue, date]);
      });

    console.log(table.toString());
  } catch (error) {
    console.log(error);
    return;
  }
};

const getComicsByPublisher = async publisherName => {
  if (choices.indexOf(publisherName) < 0) {
    console.log('Please make sure to select one of the following publishers');
    choices.forEach(val => console.log(`- ${val}`));
    return;
  }

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const date = $('#date_release_week').val();

    $('#comic-list .media-list')
      .children()
      .each(function(val, ele) {
        const name = $(this)
          .find('.comic-title a')
          .text()
          .replace(/#.*/g, '')
          .trim();

        const publisher = $(this)
          .find('.comic-list-content .comic-details strong')
          .text();

        let issue = $(this)
          .find('.comic-title a')
          .text()
          .match(/(#\d.*?\s|#\d.*)/);

        // if comic has no issue number
        if (issue === null) {
          issue = 0;
        } else {
          issue = issue[0].substr(1, issue.length).trim();
        }

        if (publisher === publisherName) {
          table.push([name, publisher, issue, date]);
        }
      });

    console.log(table.toString());
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = {
  getAllComics,
  getComicsByPublisher
};
