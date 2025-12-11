import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';

dotenv.config();

//CREDENTIALS
const dbUser = process.env.DB_USER!;
const dbPassword = process.env.DB_PASS!;
const PORT = process.env.PORT || 3636;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.bw4tb0b.mongodb.net/authjwt?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Servidor rodando na porta ${PORT}`);
    });
    console.log('✅ Conectou ao banco!');
  })
  .catch((err) => {
    console.log('❌ Erro de conexão com o Banco: ', err.message);
    process.exit(1);
  });
