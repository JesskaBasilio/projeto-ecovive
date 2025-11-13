/*IMPORTS*/

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { validateDocument } = require('../helpers/usersValidations/validateDocument')
const { validateName } = require('../helpers/usersValidations/validateName')
const { validateEmail } = require('../helpers/usersValidations/validateEmail')
const { isStrongPassword } = require('../helpers/usersValidations/passwordValidator')

// REGISTER
exports.registerUser = async (req, res) => {
  const { document, name, email, password, confirmpassword } = req.body || {}

  // VALIDATIONS
  if (!document) return res.status(422).json({ msg: "Campo (document) obrigatório" })
  if (!validateDocument(document)) return res.status(422).json({ msg: "CPF ou CNPJ inválido!" })
  if (!validateName(name)) return res.status(422).json({ msg: "Nome inválido." })
  if (!validateEmail(email)) return res.status(422).json({ msg: "Email inválido." })
  if (!password) return res.status(422).json({ msg: "Campo (password) obrigatório" })
  if (!isStrongPassword(password)) return res.status(422).json({ msg: "Senha fraca." })
  if (password !== confirmpassword) return res.status(422).json({ msg: "As senhas não conferem." })

  const userExists = await User.findOne({ document })
  if (userExists) return res.status(422).json({ msg: "CPF ou CNPJ já cadastrado." })

  try {
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = new User({
      document,
      name,
      email,
      password: passwordHash
    })

    await user.save()
    res.status(201).json({ msg: 'Usuário criado com sucesso!' })

  } catch (error) {
    console.error('❌ ERRO AO SALVAR USUÁRIO:', error)
    res.status(500).json({ msg: 'Erro interno no servidor' })
  }
}

// LOGIN
exports.loginUser = async (req, res) => {
  const { document, password } = req.body || {}

  if (!document) return res.status(422).json({ msg: "Campo (document) obrigatório" })
  if (!password) return res.status(422).json({ msg: "Campo (password) obrigatório" })

  const user = await User.findOne({ document })
  if (!user) return res.status(404).json({ msg: "Usuário não encontrado" })

  const checkPassword = await bcrypt.compare(password, user.password)
  if (!checkPassword) return res.status(422).json({ msg: "Senha inválida" })

  try {
    const secret = process.env.SECRET
    const token = jwt.sign({ id: user._id }, secret)
    res.status(200).json({ msg: "Autenticação realizada com sucesso!", token })
  } catch (error) {
    res.status(500).json({ msg: "Erro interno no servidor" })
  }
}
