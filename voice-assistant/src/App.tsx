import Layout from './components/Layout'
import GeneralProvider from './context/GeneralContext'

const App = () => {
  return (
    <GeneralProvider>
      <Layout />
    </GeneralProvider>
  )
}

export default App
