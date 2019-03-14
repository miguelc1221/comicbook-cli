#!/usr/bin/env node

const program = require('commander');
const comics = require('./comics');

program
  .version('0.1.0')
  .option('-c, --comics <publisher>', 'Search for recent releases by publisher')
  .option('-C', 'Search for all recent release')
  .parse(process.argv);

if (program.C) {
  comics.getAllComics();
}

if (program.comics) {
  comics.getComicsByPublisher(program.comics);
}
