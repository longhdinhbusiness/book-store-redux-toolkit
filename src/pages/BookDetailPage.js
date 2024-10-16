import React, { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../apiService';
import { Container, Button, Box, Grid, Stack, Typography } from '@mui/material';
import {
  fetchBooksFailure,
  fetchBooksStart,
  setSelectedBook,
} from '../features/books/bookSlice';
import { useDispatch, useSelector } from 'react-redux';

const BACKEND_API = process.env.REACT_APP_BACKEND_API;

const BookDetailPage = () => {
  const [addingBook, setAddingBook] = useState(null);
  const params = useParams();
  const bookId = params.id;

  const { selectedBook, loading } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const addToReadingList = (book) => {
    setAddingBook(book);
  };

  useEffect(() => {
    const postData = async () => {
      if (!addingBook) return;
      try {
        await api.post(`/favorites`, addingBook);
        toast.success('The book has been added to the reading list!');
      } catch (error) {
        dispatch(fetchBooksFailure(error.message));
        toast.error(error.message);
        console.log(error.message);
      }
    };
    postData();
  }, [addingBook, dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchBooksStart());
      try {
        const res = await api.get(`/books/${bookId}`);
        console.log(res.data);
        dispatch(setSelectedBook(res.data));
      } catch (error) {
        dispatch(fetchBooksFailure(error.message));
        toast.error(error.message);
      }
    };
    fetchData();
  }, [bookId, dispatch]);

  return (
    <Container>
      {loading ? (
        <Box sx={{ textAlign: 'center', color: 'primary.main' }}>
          <ClipLoader color="#inherit" size={150} loading={true} />
        </Box>
      ) : (
        <Grid
          container
          spacing={2}
          p={4}
          mt={5}
          sx={{ border: '1px solid black' }}
        >
          <Grid item md={4}>
            {selectedBook && (
              <img
                width="100%"
                src={`${BACKEND_API}/${selectedBook.imageLink}`}
                alt=""
              />
            )}
          </Grid>
          <Grid item md={8}>
            {selectedBook && (
              <Stack>
                <h2>{selectedBook.title}</h2>
                <Typography variant="body1">
                  <strong>Author:</strong> {selectedBook.author}
                </Typography>
                <Typography variant="body1">
                  <strong>Year:</strong> {selectedBook.year}
                </Typography>
                <Typography variant="body1">
                  <strong>Country:</strong> {selectedBook.country}
                </Typography>
                <Typography variant="body1">
                  <strong>Pages:</strong> {selectedBook.pages}
                </Typography>
                <Typography variant="body1">
                  <strong>Language:</strong> {selectedBook.language}
                </Typography>
                <Button
                  variant="outlined"
                  sx={{ width: 'fit-content' }}
                  onClick={() => addToReadingList(selectedBook)}
                >
                  'Add to Reading List'
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default BookDetailPage;
