import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { sharedSpaces } from '../../data/testData'

export default function WhatIsSharedSpace() {
  const categories = Array.from(new Set(sharedSpaces.map(space => space.category)))

  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        What is a Shared Space?
      </Typography>
      <Typography variant="body1" paragraph>
        Shared spaces are versatile environments designed for collaboration, creativity, and community. They offer flexible workspaces, meeting rooms, and amenities to suit various needs and preferences.
      </Typography>

      <Typography variant="h5" component="h3" gutterBottom>
        Categories
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={3} key={category}>
            <Card>
              <CardContent>
                <Typography variant="body2">{category}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}