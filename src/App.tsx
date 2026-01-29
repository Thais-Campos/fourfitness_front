import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Home } from "./pages/home/Home";
import ListaMetas from "./components/meta/listarmeta/ListarMeta";
import DeletarMeta from "./components/meta/deletarmeta/DeletarMeta";
import { TreinosList } from "./components/treino/TreinosList";
import Footer from "./components/footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {
  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metas" element={<ListaMetas />} />
        <Route path="/deletarmeta/:id" element={<DeletarMeta />} />
        <Route path="/treinos" element={<TreinosList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}

export default App;
