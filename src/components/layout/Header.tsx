'use client'

import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [anchorEl1, setAnchorEl1] = React.useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)

  const handleMenu1Click = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl1(event.currentTarget)
  }

  const handleMenu2Click = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl1(null)
    setAnchorEl2(null)
  }

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
            Shared Spaces
          </Link>
        </Typography>
        <Button color="inherit" component={Link} href="/spaces">
          Spaces
        </Button>
        <Button color="inherit" onClick={handleMenu1Click}>What is a Shared Space</Button>
        <Menu
          anchorEl={anchorEl1}
          open={Boolean(anchorEl1)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>What is it?</MenuItem>
          <MenuItem onClick={handleMenuClose}>Who are we?</MenuItem>
        </Menu>
        <Button color="inherit" onClick={handleMenu2Click}>How to Start</Button>
        <Menu
          anchorEl={anchorEl2}
          open={Boolean(anchorEl2)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Create your space</MenuItem>
          <MenuItem onClick={handleMenuClose}>Register</MenuItem>
          <MenuItem onClick={handleMenuClose}>Financials</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}