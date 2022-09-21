import algoliasearch from 'algoliasearch/lite'

const APP_ID = process.env.APP_ID
const API_KEY = process.env.API_KEY

const client = algoliasearch(APP_ID, API_KEY)
const index = client.initIndex('dev_xkcd')

const CACHE = {}

export const searchService = async ({ query }) => {
  if (CACHE[query]) return { results: CACHE[query] }

  const { hits } = await index.search(query, {
    attributesToRetrieve: ['id', 'title', 'img', 'alt', 'day', 'month', 'year'],
    hitsPerPage: 10,
  })

  CACHE[query] = hits

  return { results: hits }
}
