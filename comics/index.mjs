import Table from 'cli-table'
import axios from 'axios'
import * as cheerio from 'cheerio'

const formatDate = (date) => {
  let day = date.getDate()

  if (day < 10) {
    day = `0${day}`
  }

  let month = date.getMonth() + 1

  if (month < 10) {
    month = `0${month}`
  }

  let year = date.getFullYear()

  return month + '/' + day + '/' + year
}

const url = 'https://leagueofcomicgeeks.com/comics/new-comics'

const table = new Table({
  head: ['Name', 'Publisher', 'Issue #', 'Date'],
  colWidths: [50, 20, 10, 15],
})

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
  'Young Animal',
]

const getComics = ($, cb) => {
  return $('#comic-list-issues')
    .children()
    .each(function () {
      const name = $(this).find('.title a').text().replace(/#.*/g, '').trim()
      const publisher = $(this).find('.publisher').text().trim()
      const date = $(this)
        .find('.date')
        .text()
        .trim()
        .replace(/st|nd|rd|th/g, '')
      const formattedDate = formatDate(new Date(date))

      let issue = $(this)
        .find('.title a')
        .text()
        .match(/(#\d.*?\s|#\d.*)/)

      // if comic has no issue number
      if (issue === null) {
        issue = 0
      } else {
        issue = issue[0].substr(1, issue.length).trim()
      }

      cb(name, publisher, issue, formattedDate)
    })
}

export const getAllComics = async () => {
  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    getComics($, (...args) => table.push([...args]))

    console.log(table.toString())
  } catch (error) {
    console.log(error)
    return
  }
}

export const getComicsByPublisher = async (publisherName) => {
  if (choices.indexOf(publisherName) < 0) {
    console.log('Please make sure to select one of the following publishers')
    choices.forEach((choice) => console.log(`- ${choice}`))
    return
  }

  try {
    const response = await axios.get(url)
    const $ = cheerio.load(response.data)

    getComics($, (name, publisher, issue, date) => {
      if (publisher === publisherName) {
        table.push([name, publisher, issue, date])
      }
    })

    console.log(table.toString())
  } catch (error) {
    console.log('Oops something went wrong...')
    return
  }
}
