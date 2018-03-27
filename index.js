const $RefParser = require('json-schema-ref-parser');
const Ajv = require('ajv');
const fs = require('fs');
const os = require('os');

const compilerForSchema = (schema) => {
  if(schema.$schema.startsWith('http://json-schema.org/draft-04')){
    console.info('Using draft-04 validation');
    const ajv = new Ajv({ schemaId: 'auto' });
    ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
    return ajv;
  } else {
    console.info('Using default validation');
    return new Ajv();
  }
}

module.exports = (schemaLoc, dataLoc) => {
  if(schemaLoc == null){
    return Promise.reject('You must specify a schema location.');
  }
  return $RefParser.dereference(schemaLoc)
    .then(schema => {
      const ajv = compilerForSchema(schema);
      const schemaValid = ajv.validateSchema(schema);
      if(schemaValid){
        return ajv.compile(schema);
      } else {
        console.warn('Errors:', ajv.errorsText());
        //schema invalid
        if(ajv.errors && ajv.errors.length){
          //errors present
          return Promise.reject([
            `Found ${ajv.errors.length} errors in your schema.`,
            ...ajv.errors.map((err, idx) => `[${idx}] "${err.keyword}" ${err.message}\n    at [${err.dataPath}]`)
          ].join(os.EOL));
        } else {
          //errors missing
          return Promise.reject('Schema did not validate, however no errors were present.');
        }
      }
    }).then(validator => {
      //schema valid
      if(dataLoc){
        return new Promise((resolve, reject) => {
          fs.readFile(dataLoc, { encoding: 'utf8' }, (err, data) => {
            if(err) {
              reject(err);
            } else {
              const dataValid = validator(data);
              if(dataValid){
                resolve('Data validated successfully');
              } else {
                reject([
                  `Found ${validator.errors.length} errors in your data.`,
                  ...validator.errors.map((err, idx) => `[${idx}] "${err.keyword}" ${err.message}\n    at [${err.dataPath}]`)
                ].join(os.EOL));
              }
            }
          });
        });
      } else {
        return 'Schema validated successfully.';
      }
    });
};