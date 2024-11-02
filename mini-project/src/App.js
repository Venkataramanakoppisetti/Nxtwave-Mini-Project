import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Popular from './components/Popular';
import Account from './components/Account';
import MovieDetails from './components/MovieDetails';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/account" element={<Account />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
