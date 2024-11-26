'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import axios from 'axios'
import { Container, Typography, Grid, Paper, Button, Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { Star, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'

const API_URL = '/api/spaces'

interface SharedSpace {
  id: string;
  space_name: string;
  address: string;
  category: string;
  total_capacity: number;
  rooms: number;
  opening_hours: string;
  description: string;
  services: string[];
  size: number;
  rating: number;
  availability: {
    calendar: Date;
  };
  geolocation: {
    latitude: number;
    longitude: number;
  };
}

export default function SpaceDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [space, setSpace] = useState<SharedSpace | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [openDialog, setOpenDialog] = useState(false)

  useEffect(() => {
    const fetchSpace = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<SharedSpace>(`${API_URL}/${id}`)
        setSpace(response.data)
      } catch (err) {
        setError('Failed to fetch space details. Please try again later.')
        console.error('Error fetching space details:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSpace()
  }, [id])

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      router.push('/spaces')
    } catch (err) {
      setError('Failed to delete space. Please try again later.')
      console.error('Error deleting space:', err)
    }
    setOpenDialog(false)
  }

  const handleEdit = () => {
    router.push(`/spaces/${id}/edit`)
  }

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error || !space) {
    return (
      <Container>
        <Typography color="error">{error || 'Space not found'}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img src={`/placeholder.svg?height=300&width=500`} alt={space.space_name} style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h1" gutterBottom>
              {space.space_name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {space.address}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Star sx={{ color: 'gold', mr: 1 }} />
              <Typography variant="h6">{space?.rating?.toFixed(1)}</Typography>
            </Box>
            <Typography variant="body1" paragraph>
              {space.description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Details:
            </Typography>
            <Typography variant="body1">Category: {space.category}</Typography>
            <Typography variant="body1">total_capacity: {space.total_capacity} people</Typography>
            <Typography variant="body1">Rooms: {space.rooms}</Typography>
            <Typography variant="body1">Size: {space.size} sq ft</Typography>
            <Typography variant="body1">Opening Hours: {space.opening_hours}</Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
              Services:
            </Typography>
            <ul>
              {space.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<EditIcon />}
                onClick={handleEdit}
              >
                Edit Space
              </Button>
              <Button
                variant="contained"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={() => setOpenDialog(true)}
              >
                Delete Space
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete this space?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this space? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}