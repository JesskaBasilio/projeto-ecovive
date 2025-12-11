import mongoose, { Schema, Document } from "mongoose";

// Interface com a estrutura que um produto deve ter no TypeScript
export interface IProduct extends Document {
  name: string;            // Nome do produto
  price: number;           // Preço do produto
  description?: string;    // Descrição opcional
  category: string;        // Categoria (usada para filtros)
  imageUrl: string;        // URL da imagem do produto
  tag?: string;            // Selo como "Novo", "Promoção", etc.
  rating?: number;         // Avaliação média (ex: 4.8)
  reviewsCount?: number;   // Número de avaliações
  popularity?: number;     // Métrica para ordenar por popularidade
  createdAt: Date;         // Gerado automaticamente pelo timestamps
}

// Schema real que define como será salvo no MongoDB
const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },         // Nome obrigatório
    price: { type: Number, required: true },        // Preço obrigatório
    description: { type: String },                  // Descrição opcional
    category: { type: String, required: true },     // Categoria obrigatória
    imageUrl: { type: String, required: true },     // Imagem obrigatória

    // Campos extras para funcionalidades da página
    tag: { type: String },                          // Ex: "Novo", "Promoção"
    rating: { type: Number, default: 0 },           // Nota inicial padrão
    reviewsCount: { type: Number, default: 0 },     // Nenhuma review por padrão
    popularity: { type: Number, default: 0 },       // Popularidade inicial 0
  },
  { timestamps: true } // Cria automaticamente createdAt e updatedAt
);

// Exporta o modelo Product para ser usado no controller e rotas
export default mongoose.model<IProduct>("Product", ProductSchema);
