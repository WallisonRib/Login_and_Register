
function User() {
    const handleLogout = () => {
        // Limpar o token do localStorage
        localStorage.removeItem('token');
        // Redirecionar para a página inicial
        window.location.href = '/';
      };
    return (
        <div className="wrap text-6xl">
            <h1 className="">USUARIO LOGADO</h1>
            <button  className="  bg-slate-300 p-10"onClick={handleLogout}>
                DESLOGAR
            </button>
        </div>
    );
}

export default User;