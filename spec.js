const { describe, it } = require('node:test')
const assert = require('node:assert')
const subject = require('./')

describe('get-package-name', () => {
  it('ignores non-string values', () => {
    const tests = [undefined, null, false]

    tests.forEach((test) => {
      assert.equal(subject(test), undefined)
    })
  })

  it('ignores non-package paths', () => {
    const tests = ['/absolute/path/to/file.js', './relative/path/to/file.js']

    tests.forEach((test) => {
      assert.equal(subject(test), undefined)
    })
  })

  it('ignores partial scoped paths', () => {
    const tests = ['/path/to/node_modules/@scope', '/path/to/node_modules/@scope/']

    tests.forEach((test) => {
      assert.equal(subject(test), undefined)
    })
  })

  it('does not throw error when given path ends with package folder', () => {
    const tests = ['node_modules', '/node_modules', '/path/to/node_modules']

    tests.forEach((test) => {
      assert.equal(subject(test), undefined)
    })
  })

  it('finds shallow nested package names', () => {
    const tests = [
      '/path/to/node_modules/package-name',
      '/path/to/node_modules/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      assert.equal(subject(test), 'package-name')
    })
  })

  it('finds deeply nested package names', () => {
    const tests = [
      '/path/to/node_modules/another-package/node_modules/package-name',
      '/path/to/node_modules/another-package/node_modules/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      assert.equal(subject(test), 'package-name')
    })
  })

  it('finds scoped package names', () => {
    const tests = [
      '/path/to/node_modules/@namespace/package-name',
      '/path/to/node_modules/@namespace/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      assert.equal(subject(test), '@namespace/package-name')
    })
  })

  it('finds packages installed into other folders', () => {
    const tests = [
      '/path/to/bower_components/package-name',
      '/path/to/bower_components/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      assert.equal(subject(test, 'bower_components'), 'package-name')
    })
  })
})
