#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
import { getAllComics, getComicsByPublisher } from './comics/index.mjs'

const program = new Command()

program
  .version('1.0.0')
  .option(
    '-p, --publisher "<publisher>"',
    'Search for recent releases by publisher'
  )
  .option('--all', 'Search for all recent release')
  .parse(process.argv)

const options = program.opts()

if (options.all) {
  getAllComics()
}

if (options.publisher) {
  getComicsByPublisher(options.publisher)
}
