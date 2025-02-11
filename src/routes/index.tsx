import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
//import Cadastro from "../pages/Cadastro";
import Produtos from "../pages/Produtos";
import Cadastro from "../pages/Cadastro";

function AppRoutes(){
    return(
        <Router>
            <Routes>
                <Route path = "/" element={<Login/>}/>
                <Route path = "/cadastro" element={<Cadastro/>}/>
                <Route path = "/produtos" element={<Produtos/>}/>
            </Routes>
        </Router>
    );
}

export default AppRoutes;