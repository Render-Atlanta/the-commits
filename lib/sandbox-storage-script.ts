// A sandboxed iframe without allow-same-origin cannot read the parent origin, and
// the browser throws if that frame touches localStorage, sessionStorage, or
// cookies. Spline touches those APIs while booting. This script substitutes
// empty in-memory stores, so the scene can load without seeing the site's storage.
export const sandboxStorageScript = `
(function () {
  function memoryStorage() {
    var data = new Map()
    return {
      getItem: function (key) {
        key = String(key)
        return data.has(key) ? data.get(key) : null
      },
      setItem: function (key, value) {
        data.set(String(key), String(value))
      },
      removeItem: function (key) {
        data.delete(String(key))
      },
      clear: function () {
        data.clear()
      },
      key: function (index) {
        return Array.from(data.keys())[index] || null
      },
      get length() {
        return data.size
      },
    }
  }

  function replace(name) {
    try {
      window[name].getItem('__probe__')
    } catch (error) {
      var store = memoryStorage()
      Object.defineProperty(window, name, {
        configurable: true,
        get: function () {
          return store
        },
      })
    }
  }

  replace('localStorage')
  replace('sessionStorage')

  try {
    void document.cookie
  } catch (error) {
    var jar = ''
    Object.defineProperty(Document.prototype, 'cookie', {
      configurable: true,
      get: function () {
        return jar
      },
      set: function (value) {
        jar = String(value)
      },
    })
  }
})()
`
