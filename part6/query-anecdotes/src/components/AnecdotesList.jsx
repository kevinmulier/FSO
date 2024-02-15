import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../requests';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdotesList = ({ anecdotesReceived }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries(['anecdotes']);
      notificationDispatch({
        type: 'DISPLAY',
        payload: `You voted for '${updatedAnecdote.content}'`,
      });

      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: 'DISPLAY',
        payload:
          error.message ||
          `There was an error with your request. Please try again`,
      });

      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
  };

  console.log();

  const anecdotes = [...anecdotesReceived].sort((a, b) => b.votes - a.votes);

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleVote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdotesList;
