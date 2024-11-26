import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Search as SearchIcon } from '@mui/icons-material'
import Typography from '@mui/material/Typography'
import styles from './Hero.module.css'

interface HeroProps {
  onSearch: (term: string) => void
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <Box className={styles.hero}>
      <Box className={styles.searchContainer}>
        <Typography variant="h2" component="h1" gutterBottom color="white" textAlign="center">
          Find Your Perfect Shared Space
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search by location, name, or category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                style: { backgroundColor: 'white' }
              }}
            />
            <Button type="submit" variant="contained" color="primary">
              <SearchIcon />
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  )
}