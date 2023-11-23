import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link} from 'react-router-dom'

function Home() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

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
        } catch (error) {
            console.error('Erro durante o login:', error);
            alert('Falha no login. Verifique suas credenciais.');
        }
    };

    return (


        <section class="bg-gray-900">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
                      <input  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                      <input onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          <div class="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required=""/>
                          </div>
                          <div class="ml-3 text-sm">
                            <label for="remember" class="text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <a href="#" class="text-gray-300 text-sm font-medium hover:underline text-primary-500">Forgot password?</a>
                  </div>
                  <button onClick={handleLogin} type="submit" class="w-full text-white hover:bg-gray-700 hover:ring-4 hover:outline-none hover:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 hover:ring-primary-800">Sign in</button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <Link class="font-medium text-primary-600 hover:underline dark:text-primary-500" to="/registrar"> Sign Up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    );
}
export default Home;
