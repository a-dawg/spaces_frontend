import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/spaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      console.log(API_URL)
      const response = await axios.post(API_URL, req.body)
      res.status(201).json(response.data)
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: 'Failed to create space' })
    }
  } else if (req.method === 'GET') {
    try {
      const { search, category, services, sortBy, date } = req.query

      console.log("spaces")
      const response = await axios.get(API_URL, {
        params: {
          search,
          category,
          services,
          sortBy,
          date
        },
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers here
        }
      })

      res.status(200).json(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Axios error:', error.response?.data || error.message)
        res.status(error.response?.status || 500).json({ error: error.response?.data || 'An error occurred while fetching data' })
      } else {
        console.error('Unexpected error:', error)
        res.status(500).json({ error: 'An unexpected error occurred' })
      }
    }

  }
  else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}