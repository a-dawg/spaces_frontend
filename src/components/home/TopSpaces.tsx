import React from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { sharedSpaces } from '../../data/testData'
import { Star } from '@mui/icons-material'

export default function TopSpaces() {
  return (
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Top 5 Shared Spaces
      </Typography>
      <Grid container spacing={2}>
        {sharedSpaces.map((space) => (
          <Grid item xs={12} sm={6} md={4} key={space.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={space.image}
                alt={space.name}
              />
              <CardContent>
                <Typography variant="h6" component="div">
                  {space.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {space.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {space.category}
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Star style={{ color: '#FFD700' }} />
                  <Typography variant="body2" style={{ marginLeft: '4px' }}>
                    {space.rating.toFixed(1)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}