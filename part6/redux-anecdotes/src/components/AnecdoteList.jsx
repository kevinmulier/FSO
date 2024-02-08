import { useDispatch, useSelector } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes),
  );
  const dispatch = useDispatch();

  const voteFor = (id) => {
    dispatch(vote(id));
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteFor(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
