import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'
import Home from './pages/Home'
import V0Home from './pages/V0Home'

// import Home from './pages/V0Home'

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home/>,
      // element: <V0Home/>,
    },
    {
      path: '/dummy',
      // element: <Home/>,
      element: <V0Home/>,
    },
  ])
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
