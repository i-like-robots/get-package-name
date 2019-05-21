const path = require('path')

/**
 * @param {string} modulePath Path to a module file
 * @param {string} [moduleFolder="node_modules"] The dependency folder name
 * @return {string} The package name if it is found or undefined
 */
module.exports = function getPackageName(modulePath, moduleFolder = 'node_modules') {
  const segments = modulePath.split(path.sep)
  const index = segments.lastIndexOf(moduleFolder)

  if (index > -1) {
    const name = segments[index + 1]

    if (name[0] === '@') {
      const scopedName = segments[index + 2]
      return `${name}/${scopedName}`
    } else {
      return name
    }
  }
}
