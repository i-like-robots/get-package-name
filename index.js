const path = require('path')

/**
 * @param {string} filePath Path to a module file
 * @param {string} [folderName="node_modules"] The dependency folder name
 * @return {string} The package name if it is found
 */
module.exports = function getPackageName(filePath, folderName = 'node_modules') {
  const segments = filePath.split(path.sep)
  const index = segments.lastIndexOf(folderName)

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
