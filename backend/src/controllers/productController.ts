import { Request, Response } from "express";
import Product from "../models/Product";

// LISTAR produtos com filtros + ordenação
export const getListProducts = async (req: Request, res: Response) => {
  try {
    const { name, category, minPrice, maxPrice, status, sort } = req.query;

    const filters: any = {};

    // Filtro por nome (contém)
    if (name) {
      filters.name = { $regex: name, $options: "i" };
    }

    // Filtro por categoria
    if (category) {
      filters.category = category;
    }

    // Filtro por status
    if (status) {
      filters.status = status;
    }

    // Filtro por preço
    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = Number(minPrice);
      if (maxPrice) filters.price.$lte = Number(maxPrice);
    }

    // Map de ordenações disponíveis
    const sortOptions: any = {
      popularidade: { popularity: -1 },
      menor_preco: { price: 1 },
      maior_preco: { price: -1 },
      menor_avaliacao: { rating: 1 },
      maior_avaliacao: { rating: -1 },
      nome_az: { name: 1 },
      nome_za: { name: -1 },
    };

    // Se não enviar nada, ordena pela data de criação (mais recente primeiro)
    const selectedSort = sortOptions[sort as string] || { createdAt: -1 };

    const products = await Product.find(filters).sort(selectedSort);

    return res.status(200).json({
      success: true,
      total: products.length,
      products,
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Erro ao listar produtos",
      error: error.message,
    });
  }
};


// CRIAR produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Produto criado com sucesso",
      product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Erro ao criar produto",
      error: error.message,
    });
  }
};

// BUSCAR produto por ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Erro ao buscar produto",
      error: error.message,
    });
  }
};

// ATUALIZAR produto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Produto atualizado com sucesso",
      updated,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: "Erro ao atualizar produto",
      error: error.message,
    });
  }
};

// DELETAR produto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Produto não encontrado",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Produto deletado com sucesso",
    });

  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Erro ao deletar produto",
      error: error.message,
    });
  }
};

