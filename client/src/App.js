import { Routes, Route } from "react-router-dom";
import Home from './Home';
import User from './User';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/user" element={ <User/> } />
    </Routes>
  );
}

export default App;
