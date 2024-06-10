import { Routes, Route } from 'react-router-dom';
import { StateProvider } from "./utils/StateContext";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import NotFoundPage from './pages/NotFoundPage';
import ToursInfoPages from './pages/ToursInfoPages';
import AllMyToursPages from './pages/AllMyToursPages';
import AllMyToursInfoPages from './pages/AllMyToursInfoPages';

function App() {
  return (
    <>
      <StateProvider>
        <Routes>
          <Route index path='/' element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/tours/:id" element={<ToursInfoPages />} />
          <Route path="/my-tours" element={<AllMyToursPages />} />
          <Route path="/my-tours/:id" element={<AllMyToursInfoPages />} /> {/* Fixed path */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StateProvider>
    </>
  );
}

export default App;
