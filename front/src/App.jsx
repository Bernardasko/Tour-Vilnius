import {Routes, Route} from 'react-router-dom';
import { StateProvider } from "./utils/StateContext";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourFormsPage from './pages/TourFormsPage';
import NotFoundPage from './pages/NotFoundPage';
import AllGroupCardsPage from './pages/AllGroupCardsPage';
import AllSoloCardsPage from './pages/AllSoloCardsPage';


function App() {
  return (
    <>
      <StateProvider>
        <Routes>
          <Route index path='/' element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/toursforms" element={<TourFormsPage/>} />
          <Route path="/group" element={<AllGroupCardsPage/>} />
          <Route path="/solo" element={<AllSoloCardsPage/>} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </StateProvider>
    </>
  )
}

export default App;
