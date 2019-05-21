# Get Package Name

Get the name of a dependency from a module file path.

```js
const getPackageName = require('get-package-name')
getPackageName('./project/node_modules/@babel/parser/lib/index.js') // @babel/parser
```


## Installation

This is a [Node.js] package available through the [npm] registry. Before installing, download and install Node.js. Node.js 8 or higher is required.

Installation is done using the [npm install] command:

```sh
$ npm install --save-dev get-package-name
```

[Node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally


## API

### getPackageName(filePath, [folderName])

Returns the package name for the given module file path.

#### filePath

An absolute or relative path to a module.

#### folderName

The name of the folder in which dependencies are installed. Defaults to `"node_modules"`.


## License

This package is MIT licensed.
