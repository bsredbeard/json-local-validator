#!/usr/bin/env node
let doingSomething = false;
const jsv = require('./index');
const yargs = require('yargs')
  .command('bundle <schema>', 'Dereference a schema document so it is a standalone JSON schema', (yargs) => {
    yargs.positional('schema', {
      describe: 'The location of the schema document',
      type: 'string'
    })
  }, args => {
    doingSomething = true;
    jsv.bundle(args.schema)
      .then(() => process.exit(), err => {
        console.error(err);
        process.exit(1);
      });
  })
  .command('validate <schema> [data]', 'Validate a JSON schema, and optional data file', (yargs) => {
    yargs.positional('schema', {
      describe: 'The location of the schema document'
    }).positional('data', {
      describe: 'The (optional) location of the data document'
    });
  }, cmd => {
    doingSomething = true;
    jsv.validate(cmd.schema, cmd.data)
      .then(success => {
        console.info(success);
        return 0;
      }, error => {
        console.error(error);
        return 1;
      })
      .then(code => process.exit(code));
  })
  .help()

//execute all the config
const argv = yargs.argv;

//check to see if anything is happening
if(!doingSomething){
  yargs.showHelp();
}