import React, { useState } from 'react';
import { Star, Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [addedNotice, setAddedNotice] = useState(false);

  const isLowStock = product.totalStock <= product.lowStockThreshold && product.totalStock > 0;
  const isOutOfStock = product.totalStock === 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize, selectedColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 1800);
  };

  return (
    <div 
      id={`product-card-${product.id}`}
      className="group relative bg-white border border-stone-200/90 rounded-none flex flex-col transition-all duration-300 hover:shadow-lg hover:border-stone-400"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div 
        className="relative aspect-[3/4] w-full overflow-hidden bg-stone-100 cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Secondary hover image if available */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className={`text-[10px] tracking-widest uppercase font-bold px-2.5 py-1 text-white shadow-sm ${
              product.badge === 'Bestseller' ? 'bg-stone-900' :
              product.badge === 'Limited Edition' ? 'bg-amber-700' :
              product.badge === 'Low Stock' ? 'bg-rose-700' : 'bg-stone-800'
            }`}>
              {product.badge}
            </span>
          )}
          {isLowStock && (
            <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-amber-500 text-stone-950">
              Only {product.totalStock} Left
            </span>
          )}
          {isOutOfStock && (
            <span className="text-[10px] tracking-wider uppercase font-bold px-2 py-0.5 bg-rose-600 text-white">
              Sold Out
            </span>
          )}
        </div>

        {/* Quick View Button overlay */}
        <button
          id={`quick-view-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className={`absolute bottom-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm text-stone-800 hover:bg-stone-950 hover:text-white shadow transition-all duration-300 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
          title="Quick View Details & Reviews"
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between text-xs mb-1.5">
            <div className="flex items-center space-x-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span className="font-semibold text-stone-800 text-[11px]">{product.rating}</span>
              <span className="text-stone-400 text-[11px]">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] text-stone-600 font-medium tracking-wide">
              {product.sku}
            </span>
          </div>

          {/* Title and Subtitle */}
          <h3 
            onClick={() => onQuickView(product)}
            className="font-['Playfair_Display',serif] text-base sm:text-lg font-semibold text-stone-900 line-clamp-1 hover:text-amber-800 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>
          <p className="text-stone-700 text-xs mt-1 line-clamp-1">
            {product.subtitle}
          </p>

          {/* Color swatches */}
          <div className="flex items-center space-x-2 mt-3">
            {product.colors.map((color) => (
              <button
                key={color.name}
                onClick={() => setSelectedColor(color)}
                className={`w-4 h-4 rounded-full border transition-transform ${
                  selectedColor.name === color.name
                    ? 'ring-2 ring-stone-900 ring-offset-1 scale-110 border-white'
                    : 'border-stone-300 hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
            <span className="text-[10px] text-stone-700 font-medium ml-1">
              {selectedColor.name}
            </span>
          </div>

          {/* Quick Size Pills */}
          <div className="flex flex-wrap gap-1 mt-3">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`text-[10px] px-2 py-1 font-medium transition-colors ${
                  selectedSize === size
                    ? 'bg-stone-900 text-white font-semibold'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="pt-4 mt-3 border-t border-stone-100 flex items-center justify-between">
          <div>
            <div className="flex items-baseline space-x-2">
              <span className="text-base sm:text-lg font-bold text-stone-900">
                ${product.price}
              </span>
              {product.compareAtPrice && (
                <span className="text-xs text-stone-600 line-through font-medium">
                  ${product.compareAtPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-700 block">
              {product.fabric.split(',')[0]}
            </span>
          </div>

          <button
            id={`quick-add-btn-${product.id}`}
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            className={`px-3.5 py-2 text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-1.5 ${
              addedNotice
                ? 'bg-emerald-600 text-white'
                : isOutOfStock
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-stone-900 hover:bg-amber-600 text-white'
            }`}
          >
            {addedNotice ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : isOutOfStock ? (
              <span>Sold Out</span>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
