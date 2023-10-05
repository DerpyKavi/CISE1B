import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import CreateNewBook from './pages/articles/new.js';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path='/create-book' element={<CreateNewBook />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 