'use client';
import React from 'react'
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material'
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material'
import styles from './Footer.module.css'

export default function Footer() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // TODO: Implement newsletter subscription logic
    console.log('Newsletter subscription submitted')
  }

  return (
    <Box component="footer" className={styles.footer} sx={{ bgcolor: 'background.paper', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              123 Shared Space St, City, Country
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: info@sharedspaces.com
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +1 234 567 8900
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://facebook.com" color="inherit" sx={{ pr: 1 }}>
              <Facebook />
            </Link>
            <Link href="https://twitter.com" color="inherit" sx={{ pr: 1 }}>
              <Twitter />
            </Link>
            <Link href="https://instagram.com" color="inherit" sx={{ pr: 1 }}>
              <Instagram />
            </Link>
            <Link href="https://linkedin.com" color="inherit">
              <LinkedIn />
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Newsletter
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                size="small"
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Subscribe
              </Button>
            </form>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
          © {new Date().getFullYear()} Shared Spaces. All rights reserved.
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 1 }}>
          Disclaimer: This is a demo website. All shared spaces listed are fictional and for demonstration purposes only.
        </Typography>
      </Container>
    </Box>
  )
}