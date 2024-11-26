'use client'

import React, { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import { Container, Typography, Grid, Card, CardContent, CardMedia, CardActionArea, TextField, Select, MenuItem, FormControl, InputLabel, Checkbox, FormGroup, FormControlLabel, Box, CircularProgress, Pagination, Button } from '@mui/material'
import { useRouter, useSearchParams } from 'next/navigation'
import { Star, Search as SearchIcon, Add as AddIcon } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import Link from 'next/link'

const API_URL = '/api/spaces'
const ITEMS_PER_PAGE = 20

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
    calendar: string;
  };
  room_calendar_availability: string[];
  geolocation: {
    latitude: number;
    longitude: number;
  };
}

export default function SharedSpacesList() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [allSpaces, setAllSpaces] = useState<SharedSpace[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '')
  const [sortBy, setSortBy] = useState('space_name')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [page, setPage] = useState(1)

  const [categories, setCategories] = useState<string[]>([])
  const [allServices, setAllServices] = useState<string[]>([])

  const handleSpaceClick = (id: string) => {
    router.push(`/spaces/${id}`)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSortBy(event.target.value as string)
    setPage(1)
  }

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string)
    setPage(1)
  }

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const service = event.target.space_name
    setSelectedServices(prev => 
      event.target.checked ? [...prev, service] : prev.filter(s => s !== service)
    )
    setPage(1)
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const fetchSpaces = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await axios.get<SharedSpace[]>(API_URL)

      if (Array.isArray(response.data) && response.data.every(space => 
        typeof space === 'object' && 
        'id' in space && 
        'space_name' in space && 
        'address' in space && 
        'category' in space
      )) {
        setAllSpaces(response.data)
        
        const fetchedCategories = Array.from(new Set(response.data.map(space => space.category)))
        const fetchedServices = Array.from(new Set(response.data.flatMap(space => space.services)))
        
        setCategories(fetchedCategories)
        setAllServices(fetchedServices)
      } else {
        console.error('Invalid data structure:', response.data)
        throw new Error('Invalid data structure received from API')
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Failed to fetch spaces: ${err.message}`)
        console.error('Axios error:', err.response?.data || err.message)
      } else {
        setError('An unexpected error occurred while fetching spaces.')
        console.error('Unexpected error:', err)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSpaces()
  }, [])

  useEffect(() => {
    const search = searchParams?.get('search')
    if (search) {
      setSearchTerm(search)
    }
  }, [searchParams])

  const filteredAndSortedSpaces = useMemo(() => {
    return allSpaces
      .filter(space => 
        space.space_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        space.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(space => selectedCategory ? space.category === selectedCategory : true)
      .filter(space => selectedServices.length ? selectedServices.every(service => space.services.includes(service)) : true)
      .filter(space => selectedDate ? new Date(space.availability.calendar).toDateString() === selectedDate.toDateString() : true)
      .sort((a, b) => {
        if (sortBy === 'space_name') return a.space_name.localeCompare(b.space_name)
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'date') return new Date(b.availability.calendar).getTime() - new Date(a.availability.calendar).getTime()
        return 0
      })
  }, [allSpaces, searchTerm, selectedCategory, selectedServices, selectedDate, sortBy])

  const paginatedSpaces = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    return filteredAndSortedSpaces.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  }, [filteredAndSortedSpaces, page])

  const pageCount = Math.ceil(filteredAndSortedSpaces.length / ITEMS_PER_PAGE)

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          All Shared Spaces
        </Typography>
        <Link href="/spaces/create" passHref>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
          >
            Create Space
          </Button>
        </Link>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, location, or category"
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{ mb: 2 }}
        />
        
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select value={sortBy} onChange={handleSortChange} label="Sort By">
                <MenuItem value="space_name">Name</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="date">Date Added</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select value={selectedCategory} onChange={handleCategoryChange} label="Category">
                <MenuItem value="">All</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Availability Date"
                value={selectedDate}
                onChange={(newValue: Date | null) => {
                  setSelectedDate(newValue)
                  setPage(1)
                }}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        
        <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>Services</Typography>
        <FormGroup row>
          {allServices.map(service => (
            <FormControlLabel
              key={service}
              control={
                <Checkbox
                  checked={selectedServices.includes(service)}
                  onChange={handleServiceChange}
                  name={service}
                />
              }
              label={service}
            />
          ))}
        </FormGroup>
      </Box>

      <Grid container spacing={2}>
        {paginatedSpaces.map((space) => (
          <Grid item xs={12} sm={6} md={4} key={space.id}>
            <Card>
              <CardActionArea onClick={() => handleSpaceClick(space.id)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={`/placeholder.svg?height=140&width=280`}
                  alt={space.space_name}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {space.space_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {space.address}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {space.category}
                  </Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Star style={{ color: '#FFD700' }} />
                    <Typography variant="body2" style={{ marginLeft: '4px' }}>
                      {space?.rating?.toFixed(1)}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <Pagination 
          count={pageCount} 
          page={page} 
          onChange={handlePageChange} 
          color="primary" 
        />
      </Box>
    </Container>
  )
}