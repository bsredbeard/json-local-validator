# JSON Local Validator

...because validating your JSON should be easy.

## What is it?

JSON Local Validator (JLV) is a simple command-line tool to validate JSON schemas, and optionally validate a data file against the schema. Works with draft-04 and draft-07 schemas, properly dereferences JSON $ref's, and prints out an error listing on STDERR if anything went wrong.

## How to use

To install, call `npm install -g json-local-validator`, and the `jlv` command will be installed to your path. The `jlv` command has 2 sub-commands: `validate` and `bundle`.

### Validate a schema

`jlv validate path/to/my.schema.json`

This will parse and validate the dereferenced schema found at the specified path. The tool will output the JSON Schema draft version that it has detected on STDOUT. Should validation encounter any errors, they will be output on STDERR and the program will exit with code 1.

### Validate some data

`jlv validate path/to/my.schema.json path/to/data.json`

This will parse and validate the dereferenced schema found at the specified path, then use that schema to validate the specified data file. The tool will output the JSON Schema draft version that it has detected on STDOUT. Should validation encounter any errors, they will be output on STDERR and the program will exit with code 1.

### Dereference a schema

`jlv bundle path/to/my.schema.json`

This will deference the specified schema file and output the contents on STDOUT. No validation is performed on the schema.

### Examples

```
> jlv validate orderHeaders.schema.json
Using draft-04 validation
Schema validated successfully.
```

```
> jlv validate orderHeaders.schema.json ../examples/orderHeaderes.example.json
Using draft-04 validation
Found 1 errors in your data.
[0] "type" should be object
    at root
```

#### License

MIT Licensed

```
Copyright (c) 2018 Bill Smith

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```