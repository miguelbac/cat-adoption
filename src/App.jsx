import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Test from './components/Test/Test'
import './App.css'

function App() {

  return (
    <div className="app">
      <Header />
      <main className="app__main">
        {/* El contenido principal irá aquí */}
      </main>
      <Footer />
    </div>
  )
}

export default App