import {Routes, Route} from 'react-router-dom'
import { StateProvider } from "./utils/StateContext";

function App() {
  return (
    <>
      <StateProvider>
        <Routes>
          <Route path='/' element={<App />}/>
        </Routes>
      </StateProvider>
    </>
  )
}

export default App;
