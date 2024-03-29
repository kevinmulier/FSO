import axios from 'axios';
const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const newObject = {
    content: content,
    votes: 0,
  };
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const addVote = async (id) => {
  const { data: objectData } = await axios.get(`${baseUrl}/${id}`);
  const updatedObject = { ...objectData, votes: objectData.votes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, updatedObject);
  return response.data;
};

export default { getAll, createNew, addVote };
