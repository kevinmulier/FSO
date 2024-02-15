import { useQuery } from '@tanstack/react-query';

import { getAnecdotes } from './requests';

import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';

import AnecdotesList from './components/AnecdotesList';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  });

  if (result.isError) {
    return <p>Error while fetching anecdotes</p>;
  }

  if (result.isLoading) {
    return <p>Result is loading</p>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      <AnecdotesList anecdotesReceived={result.data} />
    </div>
  );
};

export default App;
