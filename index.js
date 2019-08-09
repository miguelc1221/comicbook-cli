#!/usr/bin/env node

const program = require('commander');
const comics = require('./comics');

program
  .version('0.1.0')
  .option('-p, --publisher "<publisher>"', 'Search for recent releases by publisher')
  .option('--all','Search for all recent release')
  .parse(process.argv);

if (program.all) {
  comics.getAllComics();
}

if (program.publisher) {
  comics.getComicsByPublisher(program.comics);
}
