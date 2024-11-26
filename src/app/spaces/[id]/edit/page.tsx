'use client'

import React, { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { Container, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, FormGroup, FormControlLabel, CircularProgress } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const API_URL = '/api/spaces'

interface FormData {
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
}

const categories = ['Co-working', 'Meeting Room', 'Event Space', 'Studio', 'Workshop']
const allServices = ['Wi-Fi', 'Projector', 'Whiteboard', 'Coffee Machine', 'Printing', 'Air Conditioning']

export default function EditSpace({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { id } = useParams()

  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      space_name: '',
      address: '',
      category: '',
      total_capacity: 0,
      rooms: 0,
      opening_hours: '',
      description: '',
      services: [],
      size: 0,
      rating: 0,
      availability: {
        calendar: new Date(),
      },
    },
  })

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`)
        const spaceData = response.data
        reset({
          ...spaceData,
          availability: {
            calendar: new Date(spaceData.availability.calendar),
          },
        })
      } catch (err) {
        setError('Failed to fetch space data. Please try again.')
        console.error('Error fetching space:', err)
      }
    }

    fetchSpace()
  }, [id, reset])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setError(null)
    try {
      const formattedData = {
        ...data,
        rooms: Math.round(data.rooms),
        total_capacity: Math.round(data.total_capacity),
        size: parseFloat(data.size.toString())
      }
      await axios.put(`${API_URL}/${params.id}`, formattedData)
      router.push(`/spaces/${params.id}`)
    } catch (err) {
      setError('Failed to update space. Please try again.')
      console.error('Error updating space:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Space
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Controller
            name="space_name"
            control={control}
            rules={{ required: 'Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="outlined"
                fullWidth
                error={!!errors.space_name}
                helperText={errors.space_name?.message}
              />
            )}
          />

          <Controller
            name="address"
            control={control}
            rules={{ required: 'Address is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                variant="outlined"
                fullWidth
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            )}
          />

          <Controller
            name="category"
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.category}>
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category">
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    {errors.category.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />

          <Controller
            name="total_capacity"
            control={control}
            rules={{ required: 'total_capacity is required', min: { value: 1, message: 'total_capacity must be at least 1' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="total_capacity"
                variant="outlined"
                fullWidth
                type="number"
                error={!!errors.total_capacity}
                helperText={errors.total_capacity?.message}
              />
            )}
          />

          <Controller
            name="rooms"
            control={control}
            rules={{ required: 'Number of rooms is required', min: { value: 1, message: 'Must have at least 1 room' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Number of Rooms"
                variant="outlined"
                fullWidth
                type="number"
                error={!!errors.rooms}
                helperText={errors.rooms?.message}
              />
            )}
          />

          <Controller
            name="opening_hours"
            control={control}
            rules={{ required: 'Opening hours are required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Opening Hours"
                variant="outlined"
                fullWidth
                error={!!errors.opening_hours}
                helperText={errors.opening_hours?.message}
              />
            )}
          />

          <Controller
            name="description"
            control={control}
            rules={{ required: 'Description is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Description"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          <Controller
            name="services"
            control={control}
            render={({ field }) => (
              <FormGroup>
                {allServices.map((service) => (
                  <FormControlLabel
                    key={service}
                    control={
                      <Checkbox
                        checked={field.value.includes(service)}
                        onChange={(e) => {
                          const updatedServices = e.target.checked
                            ? [...field.value, service]
                            : field.value.filter((s: string) => s !== service)
                          field.onChange(updatedServices)
                        }}
                      />
                    }
                    label={service}
                  />
                ))}
              </FormGroup>
            )}
          />

          <Controller
            name="size"
            control={control}
            rules={{ required: 'Size is required', min: { value: 1, message: 'Size must be at least 1' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Size (sq ft)"
                variant="outlined"
                fullWidth
                type="number"
                error={!!errors.size}
                helperText={errors.size?.message}
              />
            )}
          />

          <Controller
            name="rating"
            control={control}
            rules={{ required: 'Rating is required', min: { value: 0, message: 'Rating must be between 0 and 5' }, max: { value: 5, message: 'Rating must be between 0 and 5' } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Rating"
                variant="outlined"
                fullWidth
                type="number"
                inputProps={{ step: 0.1 }}
                error={!!errors.rating}
                helperText={errors.rating?.message}
              />
            )}
          />

          <Controller
            name="availability.calendar"
            control={control}
            rules={{ required: 'Availability date is required' }}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Availability Date"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue)
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.availability?.calendar}
                      helperText={errors.availability?.calendar?.message}
                    />
                  )}
                />
              </LocalizationProvider>
            )}
          />

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : 'Update Space'}
          </Button>
        </Box>
      </form>
    </Container>
  )
}