import { useContext } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] });
      notificationDispatch({
        type: 'DISPLAY',
        payload: `You added '${newAnecdote.content}'`,
      });
      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' });
      }, 5000);
    },
    onError: (error) => {
      notificationDispatch({
        type: 'DISPLAY',
        payload: error.response?.data?.error || error.message,
      });

      setTimeout(() => {
        notificationDispatch({ type: 'REMOVE' });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value.trim();
    event.target.anecdote.value = '';
    newNoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input
          name="anecdote"
          minLength={5}
        />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
