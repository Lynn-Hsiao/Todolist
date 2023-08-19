import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { Footer, Header, TodoCollection, TodoInput } from 'components';
import { prettyDOM } from '@testing-library/react';

const TodoPage = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([]);

  const handleChange = (value) => {
    setInputValue(value);
  };

  const handleAddTodo = () => {
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    // 新增完之後，需要清空 inputValue
    setInputValue('');
  };

  const handleKeyDown = () => {
    if (inputValue.length === 0) {
      return;
    }

    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        {
          id: Math.random() * 100,
          title: inputValue,
          isDone: false,
        },
      ];
    });
    // 新增完之後，需要清空 inputValue
    setInputValue('');
  };

  const handleToggleDown = (id) => {
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

  const handleDelete = ({ id }) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  useEffect(() => {
    const getTodosAsync = async () => {
      try {
        const todos = await getTodos();

        setTodos(todos.map((todo) => ({ ...todo, isEdit: false })));
      } catch (error) {
        console.error(error);
      }
    };
    getTodosAsync();
  }, []);

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
        onToggleDone={handleToggleDown}
        onChangeMode={handleChangeMode}
        onSave={handleSave}
        onDelete={handleDelete}
      />
      <Footer />
    </div>
  );
};

export default TodoPage;
