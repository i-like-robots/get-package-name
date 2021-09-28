const subject = require('..')

describe('get-package-name', () => {
  it('ignores non-string values', () => {
    const tests = [undefined, null, false]

    tests.forEach((test) => {
      expect(subject(test)).toBeUndefined()
    })
  })

  it('ignores non-package paths', () => {
    const tests = ['/absolute/path/to/file.js', './relative/path/to/file.js']

    tests.forEach((test) => {
      expect(subject(test)).toBeUndefined()
    })
  })

  it('finds shallow nested package names', () => {
    const tests = [
      '/path/to/node_modules/package-name',
      '/path/to/node_modules/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('package-name')
    })
  })

  it('finds deeply nested package names', () => {
    const tests = [
      '/path/to/node_modules/another-package/node_modules/package-name',
      '/path/to/node_modules/another-package/node_modules/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('package-name')
    })
  })

  it('finds namespaced package names', () => {
    const tests = [
      '/path/to/node_modules/@namespace/package-name',
      '/path/to/node_modules/@namespace/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test)).toBe('@namespace/package-name')
    })
  })

  it('finds packages installed into other folders', () => {
    const tests = [
      '/path/to/bower_components/package-name',
      '/path/to/bower_components/package-name/folder/file.js'
    ]

    tests.forEach((test) => {
      expect(subject(test, 'bower_components')).toBe('package-name')
    })
  })

  it('should not throw error when pass node_modules', () => {
    const tests = ['node_modules', '/node_modules', '/path/to/node_modules']

    tests.forEach((test) => {
      expect(subject(test)).toBe('')
    })
  })

  it('should return "" with incomplete scope path', () => {
    const tests = ['/path/to/node_modules/@scope', '/path/to/node_modules/@scope/']

    tests.forEach((test) => {
      expect(subject(test)).toBe('')
    })
  })
})
