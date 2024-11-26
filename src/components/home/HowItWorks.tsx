import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Search, BookOnline, Home, Star } from '@mui/icons-material'

export default function HowItWorks() {
  const steps = [
    { name: 'Search', icon: <Search /> },
    { name: 'Book', icon: <BookOnline /> },
    { name: 'Use', icon: <Home /> },
    { name: 'Review', icon: <Star /> }
  ]

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        How It Works
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {steps.map((step) => (
          <Grid item xs={6} sm={3} key={step.name}>
            <Card>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {step.icon}
                <Typography variant="body2" sx={{ mt: 1 }}>{step.name}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}