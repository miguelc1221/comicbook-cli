#!/usr/bin/env node
import { Command } from 'commander/esm.mjs'
import { getAllComics, getComicsByPublisher } from './comics/index.mjs'

const program = new Command()

program.version('1.0.0')

program
  .command('all')
  .description('Search for all recent release')
  .action(getAllComics)

program
  .command('publisher <name>')
  .description('Search for recent releases by publisher')
  .action(getComicsByPublisher)

program.parse(process.argv)
