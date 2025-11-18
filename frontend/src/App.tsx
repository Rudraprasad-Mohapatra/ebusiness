import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.tsx'
import ProductDetail from './pages/ProductDetail.tsx'
import About from './pages/About.tsx'
import Contact from './pages/Contact.tsx'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import './App.css'

function App() {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
