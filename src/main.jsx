import { createRoot } from 'react-dom/client'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './index.css'
import Home from './Home'
import WriteReview from './WriteReview'
import Dashboard from './Dashboard'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:'/review',
    element:<WriteReview/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  }
],{
  future:{
    v7_skipActionStatusRevalidation: true,
  },
})


createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
