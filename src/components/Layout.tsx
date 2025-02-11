import { Link } from "react-router-dom";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">CRUD de Produtos</h1>
        <nav>
          <Link to="/" className="mx-2">Login</Link>
          <Link to="/produtos" className="mx-2">Produtos</Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  );
}

export default Layout;
