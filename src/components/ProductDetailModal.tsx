import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Check, 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  ShoppingBag, 
  ThumbsUp, 
  ChevronRight,
  Ruler,
  AlertCircle
} from 'lucide-react';
import { Product, ProductColor, Review } from '../types';

interface ProductDetailModalProps {
  product: Product;
  reviews: Review[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: ProductColor, quantity: number) => void;
  onOpenReviewModal: (productId: string) => void;
  onHelpfulReview: (reviewId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  reviews,
  onClose,
  onAddToCart,
  onOpenReviewModal,
  onHelpfulReview
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'care'>('details');
  const [addedNotice, setAddedNotice] = useState(false);

  // Variant stock calculation
  const variantKey = `${selectedColor.name}-${selectedSize}`;
  const variantStock = product.stockPerVariant[variantKey] ?? 0;
  const isOutOfStock = variantStock === 0;

  const productReviews = reviews.filter((r) => r.productId === product.id);

  const handleAdd = () => {
    if (isOutOfStock) return;
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        id="product-detail-modal"
        className="relative bg-white w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-300"
      >
        {/* Close Button */}
        <button
          id="close-product-detail-btn"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-stone-100 hover:bg-stone-900 hover:text-white rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 p-5 sm:p-8">
          {/* Image Gallery Column */}
          <div className="lg:col-span-6 flex flex-col space-y-4">
            <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {product.badge && (
                <span className="absolute top-4 left-4 text-xs tracking-widest uppercase font-bold px-3 py-1 bg-stone-950 text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 border-2 overflow-hidden ${
                      selectedImageIndex === idx ? 'border-stone-900' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Sizing & Tailoring Guarantee box */}
            <div className="bg-stone-50 border border-stone-200 p-4 space-y-2 text-xs text-stone-600">
              <div className="flex items-center gap-2 text-stone-900 font-semibold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Atelier Sartorial Guarantee</span>
              </div>
              <p>
                Each garment includes complimentary tailoring alterations within 60 days of delivery at any authorized tailor worldwide.
              </p>
              <div className="flex items-center gap-4 pt-1 text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-stone-700" /> Express Air Included
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw className="w-3.5 h-3.5 text-stone-700" /> 30-Day Free Returns
                </span>
              </div>
            </div>
          </div>

          {/* Product Details & Controls Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-xs text-stone-600 uppercase tracking-wider mb-2 font-medium">
                <span>{product.category}</span>
                <span>SKU: {product.sku}</span>
              </div>

              {/* Title & Price */}
              <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900">
                {product.name}
              </h1>
              <p className="text-stone-700 text-sm mt-1">{product.subtitle}</p>

              {/* Reviews Summary Header */}
              <div className="flex items-center space-x-3 mt-3 pb-4 border-b border-stone-200">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-stone-900">{product.rating} / 5.0</span>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className="text-xs text-stone-600 hover:text-stone-900 underline font-medium"
                >
                  ({productReviews.length} Verified Reviews)
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mt-4">
                <span className="text-2xl font-bold text-stone-950">${product.price}</span>
                {product.compareAtPrice && (
                  <span className="text-base text-stone-600 line-through font-medium">
                    ${product.compareAtPrice}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                    Save ${product.compareAtPrice - product.price}
                  </span>
                )}
              </div>

              {/* Color Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-stone-900">Color:</span>
                  <span className="text-stone-700 font-medium">{selectedColor.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`flex items-center space-x-2 px-3 py-1.5 border text-xs font-medium transition ${
                        selectedColor.name === color.name
                          ? 'border-stone-900 bg-stone-50 font-bold'
                          : 'border-stone-200 hover:border-stone-400'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-300 inline-block"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-stone-900">Select Size:</span>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-stone-700 hover:text-stone-900 underline flex items-center gap-1"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size & Measurement Guide</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const key = `${selectedColor.name}-${size}`;
                    const qty = product.stockPerVariant[key] ?? 0;
                    const isSoldOut = qty === 0;

                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[50px] py-2 px-3 text-xs font-medium border transition ${
                          selectedSize === size
                            ? 'border-stone-900 bg-stone-900 text-white font-bold'
                            : isSoldOut
                            ? 'border-stone-200 text-stone-400 line-through bg-stone-50'
                            : 'border-stone-200 text-stone-800 hover:border-stone-900'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>

                {/* Stock indicator */}
                <div className="mt-2.5 text-xs flex items-center gap-1.5">
                  {isOutOfStock ? (
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Currently Sold Out in {selectedSize} ({selectedColor.name})
                    </span>
                  ) : variantStock <= 4 ? (
                    <span className="text-amber-700 font-semibold flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Only {variantStock} units left in stock — order soon
                    </span>
                  ) : (
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      In Stock ({variantStock} available in {selectedSize})
                    </span>
                  )}
                </div>
              </div>

              {/* Fit Note */}
              <div className="mt-4 p-3 bg-stone-50 border border-stone-200 text-xs text-stone-700">
                <span className="font-semibold text-stone-900">Tailor's Fit Note: </span>
                {product.fitGuide}
              </div>

              {/* Size Guide Drawer / Popup */}
              {showSizeGuide && (
                <div className="mt-3 p-4 bg-stone-900 text-stone-100 text-xs space-y-2">
                  <div className="flex justify-between items-center font-bold text-amber-400">
                    <span>Chest & Waist Sizing Guide</span>
                    <button onClick={() => setShowSizeGuide(false)} className="text-stone-400 hover:text-white">✕</button>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-[11px] pt-2 border-t border-stone-800">
                    <div><span className="text-stone-400">Size:</span> 38R / S</div>
                    <div><span className="text-stone-400">Chest:</span> 38-40 in</div>
                    <div><span className="text-stone-400">Waist:</span> 31-32 in</div>
                    <div><span className="text-stone-400">Sleeve:</span> 33.5 in</div>
                    <div><span className="text-stone-400">Size:</span> 40R / M</div>
                    <div><span className="text-stone-400">Chest:</span> 40-42 in</div>
                    <div><span className="text-stone-400">Waist:</span> 33-34 in</div>
                    <div><span className="text-stone-400">Sleeve:</span> 34.2 in</div>
                    <div><span className="text-stone-400">Size:</span> 42R / L</div>
                    <div><span className="text-stone-400">Chest:</span> 42-44 in</div>
                    <div><span className="text-stone-400">Waist:</span> 35-36 in</div>
                    <div><span className="text-stone-400">Sleeve:</span> 35.0 in</div>
                  </div>
                </div>
              )}

              {/* Quantity and Add to Cart Row */}
              <div className="mt-6 flex items-center space-x-3">
                <div className="flex items-center border border-stone-300">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2.5 text-stone-600 hover:bg-stone-100"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-4 py-2.5 text-xs font-bold text-stone-900 min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(variantStock || 10, quantity + 1))}
                    className="px-3 py-2.5 text-stone-600 hover:bg-stone-100"
                    disabled={quantity >= variantStock}
                  >
                    +
                  </button>
                </div>

                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAdd}
                  disabled={isOutOfStock}
                  className={`flex-1 py-3 px-6 text-xs font-bold tracking-widest uppercase transition flex items-center justify-center gap-2 ${
                    addedNotice
                      ? 'bg-emerald-600 text-white'
                      : isOutOfStock
                      ? 'bg-stone-300 text-stone-500 cursor-not-allowed'
                      : 'bg-stone-950 hover:bg-amber-600 text-white shadow-md'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Shopping Bag</span>
                    </>
                  ) : isOutOfStock ? (
                    <span>Sold Out</span>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tabs: Details / Verified Reviews / Care */}
            <div className="mt-8 border-t border-stone-200 pt-4">
              <div className="flex space-x-6 border-b border-stone-200 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 transition ${
                    activeTab === 'details'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Tailoring & Fabric
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 transition flex items-center gap-1 ${
                    activeTab === 'reviews'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  <span>Client Reviews</span>
                  <span className="bg-stone-100 text-stone-700 px-1.5 py-0.2 rounded-full text-[10px]">
                    {productReviews.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('care')}
                  className={`pb-2 transition ${
                    activeTab === 'care'
                      ? 'text-stone-900 border-b-2 border-stone-900'
                      : 'text-stone-400 hover:text-stone-700'
                  }`}
                >
                  Care & Preservation
                </button>
              </div>

              {/* Tab 1: Details */}
              {activeTab === 'details' && (
                <div className="pt-3 text-xs text-stone-700 space-y-2">
                  <p className="leading-relaxed">{product.description}</p>
                  <div className="pt-2">
                    <span className="font-semibold text-stone-900 block mb-1">Key Specifications:</span>
                    <ul className="list-disc list-inside space-y-1 text-stone-600 pl-1">
                      {product.details.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>
                  <p className="pt-1 text-[11px] text-stone-500">
                    <span className="font-semibold text-stone-800">Composition:</span> {product.fabric}
                  </p>
                </div>
              )}

              {/* Tab 2: Verified Reviews */}
              {activeTab === 'reviews' && (
                <div className="pt-3 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                    <div>
                      <span className="text-sm font-bold text-stone-900">Verified Client Feedback</span>
                      <span className="text-xs text-stone-500 block">Based on verified purchases</span>
                    </div>
                    <button
                      id="write-review-btn"
                      onClick={() => onOpenReviewModal(product.id)}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-amber-600 text-white text-xs font-semibold tracking-wider uppercase transition"
                    >
                      Write Review
                    </button>
                  </div>

                  {productReviews.length === 0 ? (
                    <p className="text-xs text-stone-500 py-4 text-center">
                      No reviews written for this specific item yet. Be the first to share your experience!
                    </p>
                  ) : (
                    <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                      {productReviews.map((rev) => (
                        <div key={rev.id} className="border-b border-stone-100 pb-3 last:border-0">
                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-stone-900">{rev.author}</span>
                              {rev.verifiedBuyer && (
                                <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 font-semibold">
                                  Verified Buyer
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-stone-400">{rev.date}</span>
                          </div>

                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex text-amber-500">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < rev.rating
                                      ? 'fill-amber-500 text-amber-500'
                                      : 'text-stone-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs font-bold text-stone-800">{rev.title}</span>
                          </div>

                          <p className="text-xs text-stone-600 mt-1.5 leading-relaxed">{rev.comment}</p>

                          <div className="flex items-center justify-between mt-2 text-[11px] text-stone-500">
                            <div className="flex items-center space-x-3">
                              <span>Fit: <strong className="text-stone-700">{rev.fit}</strong></span>
                              <span>Size: <strong className="text-stone-700">{rev.sizePurchased}</strong></span>
                            </div>
                            <button
                              onClick={() => onHelpfulReview(rev.id)}
                              className="flex items-center gap-1 hover:text-stone-900 transition"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>Helpful ({rev.helpfulCount})</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Care */}
              {activeTab === 'care' && (
                <div className="pt-3 text-xs text-stone-700 space-y-2">
                  <p className="font-semibold text-stone-900">Garment Care Guidelines:</p>
                  <p className="leading-relaxed">{product.care}</p>
                  <p className="text-stone-500 text-[11px]">
                    Store on wide-shoulder contoured wooden hangers. Cedar wood blocks recommended to naturally deter moths and absorb ambient moisture.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
