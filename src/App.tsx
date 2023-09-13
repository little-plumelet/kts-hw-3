import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { URLS } from 'configs/urls';
import { Home } from 'pages/Home';
import { Recipe } from 'pages/Recipe';
import { Root } from 'pages/Root';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={URLS['/']} element={<Root />}>
          <Route path={URLS.recipe + '/:id'} element={<Recipe />} />
          <Route index element={<Home />} />
        </Route>
        <Route path={URLS['*']} element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
