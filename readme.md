# JSV

...because getting your JSON schema validator to work shouldn't leave you angry.

## What is it?

JSV is a simple command-line tool to validate JSON schemas, and optionally validate a data file against the schema. Works with draft-04 and draft-07 documents, dereferences JSON references to other schemas, or within the file, and prints out an error listing on STDERR if anything went wrong.

## How to use

`jsv --schema="schema path" --data="data path"`

Schema is required.
Data is not.

### Examples

```
> jsv --schema=orderHeaders.schema.json
Using draft-04 validation
Schema validated successfully.
```

```
> jsv --schema=orderHeaders.schema.json --data=../examples/orderHeaderes.example.json
Using draft-04 validation
Found 1 errors in your data.
[0] "type" should be object
    at []
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