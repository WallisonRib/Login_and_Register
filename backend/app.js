require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Db } = require("mongodb");
const cors = require("cors"); 

const app = express();
app.use(cors());
app.use(express.json());


//Exportar models
const User = require("./models/User")

//Rotas
app.get("/", (req, res) => {
  res.status(200).json({ msg: "Rota pública da API" })
})

app.get("/user/:id", checkToken, async (req, res) => {
  const id = req.params.id

  //verificando se o usuario existe
  const user = await User.findById(id,"-password")
  
  if(!user){
    return res.status(404).json({msg : "Usuario não encontado"})
  }

  res.status(200).json({msg : "Usuario encontrado :", user})

})

function checkToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(" ")[1]
  
  if(!token){
    return res.status(401).json({msg : "Acesso negado"})
  }
  try{
    const secret = process.env.SECRET  
    jwt.verify(token, secret)
    next();
  }
  catch(error){
    res.status(400).json({msg : "Token inválido"})
  }
}

//Registrar usuários
app.post('/auth/register', async (req, res) => {
  const {name, email, password, confirmpassword } = req.body;

  //validations
  if (!name) {
    return res.status(422).json({ msg: "o nome é obrigatório !" })
  }
  if (!email) {
    return res.status(422).json({ msg: "o email é obrigatório !" })
  }

  if (!password) {
    return res.status(422).json({ msg: "a senha é obrigatória !" })
  }

  if (password !== confirmpassword) {
    return res.status(422).json({ msg: "as senhas devem ser iguais!" })
  }

  //Verificar se o usuario ja existe

  const userExist = await User.findOne({ email: email })

  if (userExist) {
    return res.status(422).json({ error:"Email ja cadastrado", msg: "e-mail ja cadastrado" })    
  }

  //Criando a senha
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  const user = new User({
    name,
    email,
    password: passwordHash
  })
  try {
    await user.save()
    res.status(201).json({ msg: "Usuario criado com sucesso" })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

//Login User
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(422).json({ msg: "o email é obrigatório !" })
  }

  if (!password) {
    return res.status(422).json({ msg: "a senha é obrigatória !" })
  }

  //Checar se o usuario existe

  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ msg: "Usuario não encontrado!" })
  }

  //Checar se a senha esta correta

  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(494).json({ msg: "Senha invalida" })
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )
   res.status(200).json({ msg: "Autenticação realizada com sucesso", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ msg: error })

  }

})

//Credenciais 
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

app.listen(3000);

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.tx4g1ms.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => console.log(err));

