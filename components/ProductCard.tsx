import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onLike: () => void;
  onRate: (rating: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  onLike,
  onRate
}) => {
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike();
  };

  const discount =
    product.onSale && typeof product.price === 'number' && product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) * 100
        )
      : null;

  const formattedPrice = typeof product.price === 'number' 
    ? `R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
    : product.price;

  return (
    <div className="group flex flex-col cursor-default transition-all duration-300 relative bg-[#0c151d] p-4 rounded-xl border border-white/5 hover:border-white/10">

      {/* Selos */}
      <div className="absolute top-0 left-0 z-20 flex flex-col pointer-events-none">
        {product.isNew && (
          <span className="bg-[#1a3a5a] text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest rounded-tl-xl">
            Novidade
          </span>
        )}
        {product.onSale && (
          <span className="bg-[#FF6B00] text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest rounded-tl-xl">
            Promoção
          </span>
        )}
      </div>

      {/* Likes */}
      <button
        onClick={handleLike}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-2 rounded-full transition-all bg-black/20 backdrop-blur-md text-white/30 hover:text-red-500 hover:scale-110 active:scale-90"
      >
        <span className="text-[10px] font-black">{product.likes || 0}</span>
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      </button>

      {/* Imagem */}
      <div
        onClick={onClick}
        className="relative aspect-[4/3] mb-5 overflow-hidden bg-white rounded-lg flex items-center justify-center p-1 cursor-pointer group-hover:brightness-95 transition-all"
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform duration-700"
        />
      </div>

      {/* Etiqueta */}
      <div className="mb-3">
        <span className="bg-[#F2B705] text-black text-[9px] font-black px-2 py-0.5 uppercase tracking-tighter inline-block">
          {typeof product.price === 'number' ? 'À VISTA C/ 10% OFF' : 'SOB CONSULTA'}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col">
        <h3 className="text-[14px] font-black text-white leading-[1.2] mb-1 uppercase tracking-tight line-clamp-2 min-h-[34px]">
          {product.name}{' '}
          <span className="text-white/40 font-bold">
            - {product.brand}
          </span>
        </h3>

        {/* Avaliação - 5 estrelas preenchidas */}
        <div className="flex gap-0.5 mb-2 text-[#F2B705]">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} className="text-lg leading-none">★</span>
          ))}
        </div>

        {/* PREÇO */}
        <div className="mb-4">
          {product.onSale && typeof product.price === 'number' && product.originalPrice && (
            <p className="text-sm text-white/40 line-through font-bold">
              R$ {product.originalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          )}

          <p className={`text-3xl font-black leading-none mb-1 tracking-tighter ${typeof product.price !== 'number' ? 'text-xl text-[#FF6B00]' : 'text-white'}`}>
            {formattedPrice}
          </p>

          {typeof product.price === 'number' && (
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-tighter">
              ou 10x de R$ {(product.price / 10).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} no crédito
            </p>
          )}
        </div>

        <button
          onClick={onClick}
          className="text-[11px] font-black text-[#FF6B00] uppercase tracking-widest flex items-center gap-1 group/btn w-fit border-b-2 border-transparent hover:border-brand-orange pb-1 transition-all"
        >
          Ver detalhes
          <svg className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;