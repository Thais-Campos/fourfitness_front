import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import { Footer } from "./components/footer/Footer";
import Treino

function App() {
  return (
    <>
      <BrowserRouter >
       <Navbar />
         <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/metas" element={<Metas />} />
          <Route path="/treinos" element={<Treinos />} />
        </Routes>
        <Footer />
      </ BrowserRouter>
    </>
  );
}

export default App;
