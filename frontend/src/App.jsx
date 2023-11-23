import React, { useState } from 'react';
import axios from 'axios';
import "./assets/index.css"
import { useNavigate } from 'react-router-dom'

function App() {
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', confirmpassword: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log(registerData);
    try {
      await axios.post('http://localhost:3000/auth/register', registerData);
      alert('Usuário registrado com sucesso!');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', loginData);
      const { token, userId } = response.data;

      // Armazenar o token no localStorage
      localStorage.setItem('token', token);

      // Exemplo de como obter dados da rota protegida
      const userResponse = await axios.get(`http://localhost:3000/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Dados do usuário:', userResponse.data);
      navigate("/logado");

      // Redirecionar para a próxima página ou realizar outras ações necessárias
    } catch (error) {
      console.error('Erro durante o login:', error);
      alert('Falha no login. Verifique suas credenciais.');
    }
  };



  return (
    <div>





      <div className="flex flex-col m-auto w-[20%] justify-center ">

        <h1 className='text-2xl'>Registro</h1>
        <input type="text" placeholder="Nome" onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })} />
        <input className="" type="email" placeholder="Email" onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
        <input className="" type="password" placeholder="Senha" onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
        <input
          type="password"
          placeholder="Confirmar Senha"
          onChange={(e) => setRegisterData({ ...registerData, confirmpassword: e.target.value })}
        />
        <button className='border border-black' onClick={handleRegister}>Registrar</button>
      </div>
      <div className="flex flex-col m-auto w-[20%] items ">

        <h1>Login</h1>
        <input type="email" placeholder="Email" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
        <input type="password" placeholder="Senha" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
        <button className='border border-black' onClick={handleLogin}>Login</button>
      </div> *


    </div>



  );
}

export default App;
