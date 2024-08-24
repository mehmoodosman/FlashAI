'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button, Container, Toolbar, Typography, AppBar, Box, Grid } from "@mui/material";
import Head from 'next/head'

export default function Home() {

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      },
    })

    const checkoutSessionJson = await checkoutSession.json()

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message)
      return
    }

    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id
    })

    if (error) {
      console.warn(error.message)
    }
  }

  return (
    <Container maxWidth="100vw">
      <Head>
        <title>FLashAI</title>
        <meta name="description" content="Create Flashcard from your text" />
      </Head>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{flexGrow: 1}}>FlashAI</Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in"> Login</Button>
            <Button color="inherit" href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>   
        </Toolbar>  
      </AppBar>

      <Box 
      sx={{
        textAlign: 'center',
        my: 4,
      }}
      >
        <Typography variant="h2" gutterBottom>Welcome to Flashcard AI</Typography>
        <Typography variant="h5" gutterBottom>
          {' '}
          Easily create flashcards with a prompt
        </Typography>
        <Button variant="contained" color="primary" sx={{mt: 2}} href="/generate">
          Get Started
        </Button>
      </Box>
      <Box sx={{my: 6}}>
        <Typography variant="h4" gutterBottom>
          Features
        </Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Easy Prompt Input</Typography>
            <Typography>
              {' '}
              Simply input your prompt related to your Flashcards.
            </Typography>  
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Smart Flashcards</Typography>
            <Typography>
              {' '}
              Our AI will generate a Flashcard for you.
            </Typography>  
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {' '}
              Access your Flashcards on any device, at any time.
            </Typography>  
          </Grid>
        </Grid>
      </Box>
      <Box sx={{my: 6, textAlign: "center"}}>
        <Typography variant="h4" gutterBottom>Pricing</Typography>
        <Grid container spacing = {4}>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2, 
            }}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$5 / month</Typography>
              <Typography>
                {' '}
                Access to basic flashcard features and limited storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose Basic Plan
              </Button>  
            </Box>  
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2, 
            }}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$10 / month</Typography>
              <Typography>
                {' '}
                Access to unlimited flashcard features and storage.
              </Typography>
              <Button variant="contained" color="primary" sx={{mt: 2}} onClick={handleSubmit}>
                Choose Pro Plan
              </Button>  
            </Box>  
          </Grid>
        </Grid>
      </Box>  
    </Container>  
  )
}
