// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { searchService } from '../../services/searchService';

export default async function handler(req, res) {
  const {
    query: { ask },
  } = req;

  const { results } = await searchService({ query: ask });

  return res.status(200).json(results);
}
