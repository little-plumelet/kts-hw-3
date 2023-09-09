import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Home } from 'pages/Home';
import { Recipe } from 'pages/Recipe';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes/:id" element={<Recipe />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
