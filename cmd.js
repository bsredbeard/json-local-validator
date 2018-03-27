#!/usr/bin/env node
const argv = require('yargs')
  .usage('Usage: $0 -s [schema] -d [data] ')
  .alias('s', 'schema')
  .alias('d', 'data')
  .default('d', null)
  .demandOption(['s'])
  .help('h')
  .alias('h', 'help')
  .describe('s', 'Path to the schema to validate')
  .describe('d', 'Path to the data to validate with the schema')
  .argv;

const jsv = require('./index');
jsv(argv.s, argv.d)
  .then(success => {
    console.info(success);
    return 0;
  }, error => {
    console.error(error);
    return 1;
  })
  .then(code => process.exit(code));