const fs = require('fs')
const core = require('@actions/core')
const cache = require('@actions/cache')

try {
  const locales = JSON.parse(process.env.LOCALES)

  console.log('ACTIONS_RUNTIME_URL', process.env.ACTIONS_RUNTIME_URL)
  console.log('ACTIONS_RUNTIME_TOKEN', process.env.ACTIONS_RUNTIME_TOKEN)
  console.log('ACTIONS_CACHE_URL', process.env.ACTIONS_CACHE_URL)

  if (locales.length == 0) {
    throw 'No locales were given to be built'
  }

  console.log(`Retrieved the following locales: ${locales}`)

  for (locale of locales) {
    console.log(`Started processing ${locale}`)

    const path = ['build']
    const key = `${locale}-build`

    console.log(locale, key, path)

    cache
      .restoreCache(path, key)
      .then((cacheKey) => {
        console.log(path, key, cacheKey)

        if (!cacheKey) {
          throw `Cache couldn't be restored for locale ${locale}`
        }

        console.log(`Finished processing ${locale}`)
      })
      .catch((error) => {
        throw `Error ocurred while retrieving the cache: ${error}`
      })
  }
} catch (error) {
  core.setFailed(`An issue ocurred while combining locale builds: ${error}`)
}
