import {Routes, Route} from 'react-router-dom';
import { StateProvider } from "./utils/StateContext";
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TourFormsPage from './pages/TourFormsPage';
import NotFoundPage from './pages/NotFoundPage';


function App() {
  return (
    <>
      <StateProvider>
        <Routes>
          <Route index path='/' element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/toursforms" element={<TourFormsPage/>} />
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </StateProvider>
    </>
  )
}

export default App;
