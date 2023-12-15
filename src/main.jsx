import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routes from './Routes/Routes.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ControlRoom from './ControlRoom/ControlRoom.jsx'
const queryClient = new QueryClient()

import { HelmetProvider } from 'react-helmet-async';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ControlRoom>
        <HelmetProvider>
          <RouterProvider router={Routes} />
        </HelmetProvider>
      </ControlRoom>
    </QueryClientProvider>
  </React.StrictMode>,
)
