import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { urls } from 'configs/urls';
import { Home } from 'pages/Home';
import { Recipe } from 'pages/Recipe';
import { Root } from 'pages/Root';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={urls.root} element={<Root />}>
          <Route path={urls.recipe.mask} element={<Recipe />} />
          <Route index element={<Home />} />
        </Route>
        <Route path={'*'} element={<Navigate to={urls.root} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
