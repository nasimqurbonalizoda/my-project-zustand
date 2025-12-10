
import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './layout/layout'
import Createasync from './pages/createasync'
import Createsync from './pages/createsync'
import InfoPage from './pages/infopage'

const App = () => {
  const router=createBrowserRouter([{
    path:"/",
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Createasync/>
      },
       {
        path:"/createsync",
        element:<Createsync/>
      },
      {
        path: "/infopage/:id",
        element: <InfoPage />,
      },
    ]
  }])
  return <RouterProvider router={router}/> 
}
export default App
