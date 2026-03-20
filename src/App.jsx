import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Test from './pages/Test'
import Results from './pages/Results'
import TypesExplorer from './pages/TypesExplorer'
import TypeDetail from './pages/TypeDetail'

function App() {
  return (
    <BrowserRouter>
      <div dir="rtl" className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/results" element={<Results />} />
            <Route path="/types" element={<TypesExplorer />} />
            <Route path="/types/:typeCode" element={<TypeDetail />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
