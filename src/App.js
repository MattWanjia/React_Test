import './App.css';
import Home from './components/Home'
import Person from './components/Person';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div class="bg-[#282c34] h-screen w-screen">
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path="/user/:id" element={<Person/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
