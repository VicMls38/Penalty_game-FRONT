import ReactDOM from 'react-dom/client'

import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"


import './css/index.css'
import Accueil from './pages/Accueil.tsx'
import Game from './pages/Game.tsx'

import { io } from 'socket.io-client'

export const socket = io('http://localhost:5100');

const router = createBrowserRouter([
  {
    path: "/",
    element: <Accueil />,
  },
  {
    path: "/game",
    element: <Game />
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
