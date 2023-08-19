import axios from 'axios';

const baseUrl = 'http://localhost/3001';

export const getTodos = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`);

    return res.data;
  } catch (error) {
    console.error(`[Get Todos failed]:`, error);
  }
};

export const createTodo = async (payload) => {
  try {
    const { title, isDone } = payload;
    const res = await axios.patch(`${baseUrl}/todos`, {
      title,
      isDone,
    });

    return res.data;
  } catch (error) {
    console.error(`[Create Todo failed]:`, error);
  }
};

export const patchTodo = () => {};

export const deleteTodo = () => {};
