import { Router } from "express";
import {
  getListProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController";

const router = Router();

// Listar todos
router.get("/", getListProducts);

// Criar
router.post("/", createProduct);

// Buscar por ID
router.get("/:id", getProductById);

// Atualizar
router.put("/:id", updateProduct);

// Deletar
router.delete("/:id", deleteProduct);

export default router;
