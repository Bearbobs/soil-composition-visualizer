// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { Paddockdata } from '../../../interface/index';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Paddockdata[]>
) {
  const paddockData: Paddockdata[] = require('../../../data/paddock.json');
  res.status(200).json(paddockData)
}
