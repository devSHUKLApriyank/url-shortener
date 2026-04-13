import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import { router } from './routes/routeTree.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ queryClient, store }} />
    </QueryClientProvider>
  </Provider>
)