import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Button, Grid } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';

function App() {
  const [quote, setQuote] = useState('');
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await axios.get('https://ron-swanson-quotes.herokuapp.com/v2/quotes');
      setQuote(response.data[0]);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  const saveQuote = () => {
    if (!savedQuotes.includes(quote)) {
      setSavedQuotes([...savedQuotes, quote]);
    }
  };

  const removeQuote = (quoteToRemove) => {
    setSavedQuotes(savedQuotes.filter(q => q !== quoteToRemove));
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '2rem' }}>
      <Typography style={{ "textAlign":"center"}} variant="h4" gutterBottom>Ron Swanson Quotes</Typography>
      <Card style={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h6">{quote}</Typography>
          <Button
            startIcon={<FavoriteBorder />}
            onClick={saveQuote}
            color="primary"
            style={{ marginTop: '1rem' }}
          >
            Save Quote
          </Button>
        </CardContent>
      </Card>
      <Button variant="contained" color="primary" onClick={fetchQuote}>
        Get New Quote
      </Button>
      <Typography variant="h5" style={{ marginTop: '2rem' }}>Saved Quotes</Typography>
      <Grid container spacing={2}>
        {savedQuotes.map((savedQuote, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card>
              <CardContent>
                <Typography variant="body1">{savedQuote}</Typography>
                <Button
                  startIcon={<Favorite />}
                  onClick={() => removeQuote(savedQuote)}
                  color="secondary"
                  style={{ marginTop: '1rem' }}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;