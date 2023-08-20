import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkPermission } from '../api/auth';
import { getTodos, createTodo } from '../api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { prettyDOM } from '@testing-library/react';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = async () => {
    if (inputValue.length === 0) {
      return;
    }
    try {
      //先去後端拿資料
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      //將拿回的data資料傳入畫面(data.id/data.title/data.isDone, 原始後端資料屬性沒有isEdit的狀態，在這也先建立預設false並存入)
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      // 新增完之後，需要清空 inputValue
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = async () => {
    if (inputValue.length === 0) {
      return;
    }

    try {
      //先去後端拿資料
      const data = await createTodo({
        title: inputValue,
        isDone: false,
      });
      //將拿回的data資料傳入畫面(data.id/data.title/data.isDone, 原始後端資料屬性沒有isEdit的狀態，在這也先建立預設false並存入)
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          {
            id: data.id,
            title: data.title,
            isDone: data.isDone,
            isEdit: false,
          },
        ];
      });
      // 新增完之後，需要清空 inputValue
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDone = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        }
        return todo;
      });
    });
  };

  const handleChangeMode = ({ id, isEdit }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isEdit,
          };
        }
        return { ...todo, isEdit: false };
      });
    });
  };

  const handleSave = ({ id, title }) => {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            isEdit: false,
          };
        }

        return todo;
      });
    });
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        //畫面渲染後，從後端拿到todos項目
        const todos = await getTodos();
        //將todos資料傳回頁面，原始後端資料屬性沒有isEdit的狀態，在這也先建立預設false並存入
        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

  useEffect(() => {
    const checkTokenIsValid = async () => {
      const authToken = localStorage.getItem('authToken');
      if (!authToken) {
        navigate('/login');
      }
      const result = await checkPermission(authToken);
      if (!result) {
        navigate('/login');
      }
    };

    checkTokenIsValid();
  }, [navigate]);

  return (
    <div>
      TodoPage
      <Header />
      <TodoInput
        inputValue={inputValue}
        onChange={handleChange}
        onAddTodo={handleAddTodo}
        onKeyDown={handleKeyDown}
      />
      <TodoCollection
        todos={todos}
        onToggleDone={handleToggleDone}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer todos={todos} />
    </div>
  );
};

export default TodoPage;
