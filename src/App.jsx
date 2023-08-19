import './App.scss';
//Need to download "npm i react-router-dom@6.4.1"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage, TodoPage, LoginPage, SignUpPage } from './pages';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="todo" element={<TodoPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
