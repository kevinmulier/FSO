import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    const sortAnecdotes = (anecdotes) =>
      anecdotes.sort((a, b) => b.votes - a.votes);

    return filter
      ? sortAnecdotes(
          anecdotes.filter((anecdote) =>
            anecdote.content.toLowerCase().includes(filter.toLowerCase()),
          ),
        )
      : sortAnecdotes([...anecdotes]);
  });

  const dispatch = useDispatch();

  const voteFor = (id, content) => {
    dispatch(vote(id));
    dispatch(setNotification(`you voted for ${content}`));

    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteFor(anecdote.id, anecdote.content)}>
          vote
        </button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
