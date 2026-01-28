import { useState } from 'react';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />

      <Home />

      <Footer />
    </>
  );
}
