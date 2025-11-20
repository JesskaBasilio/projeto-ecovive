import { Request, Response } from 'express';
import User  from '../models/User';

export const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).select('-password -confirmpassword');
    if (!user) return res.status(404).json({ msg: 'Usuário não encontrado' });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ msg: 'Erro ao buscar usuário' });
  }
};
