import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login(){
    const { login } = useContext(AuthContext)!;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };

    return(
        <div className = "flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-6 roundled-lg shadow-md w-96">
                <h2 className = "text-2xl font-bold text-center">Login</h2>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input 
                        type="email" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded mt-2"
                    />
                    <input 
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border rounded mt-2"    
                    />
                    <button className="w-full bg-blue-500 text-white p-2 rounded mt-4">
                        Entrar
                    </button>
                </form>
            </div>
        </div>   
    );
}

export default Login;