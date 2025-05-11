import { BrowserRouter } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import GeneralProvider from './context/GeneralContext'

const App = () => {
  return (
    <GeneralProvider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </GeneralProvider>
  )
}

export default App
