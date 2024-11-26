import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL + '/spaces'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const response = await axios.get(`${API_URL}/${id}`)
      res.status(200).json(response.data)
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: 'Failed to fetch space' })
    }
  } else if (req.method === 'PUT') {
    try {
      const response = await axios.put(`${API_URL}/${id}`, req.body)
      res.status(200).json(response.data)
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: 'Failed to update space' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await axios.delete(`${API_URL}/${id}`)
      res.status(200).json({ message: 'Space deleted successfully' })
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: 'Failed to delete space' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}