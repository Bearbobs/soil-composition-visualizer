import type { NextApiRequest, NextApiResponse } from 'next'

import { MeasurementData } from '../../../interface/index';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<MeasurementData[]>
) {
  const data: MeasurementData[] = require('../../../data/measurement.json');
  res.status(200).json(data)
}