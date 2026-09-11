import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldCheck } from 'lucide-react';
import { Product, Review } from '../types';

interface ReviewModalProps {
  product: Product;
  onClose: () => void;
  onSubmitReview: (review: Omit<Review, 'id' | 'date' | 'helpfulCount'>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  product,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [fit, setFit] = useState<'Runs Small' | 'True to Size' | 'Runs Large'>('True to Size');
  const [sizePurchased, setSizePurchased] = useState(product.sizes[0] || 'M');
  const [colorPurchased, setColorPurchased] = useState(product.colors[0]?.name || 'Standard');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !title.trim() || !comment.trim()) {
      setError('Please fill in your name, review headline, and detailed feedback.');
      return;
    }

    onSubmitReview({
      productId: product.id,
      author: author.trim(),
      rating,
      title: title.trim(),
      comment: comment.trim(),
      verifiedBuyer: true,
      fit,
      sizePurchased,
      colorPurchased
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg shadow-2xl border border-stone-300 relative overflow-hidden">
        {/* Header */}
        <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
          <div>
            <span className="text-[10px] tracking-widest text-amber-400 uppercase font-bold">
              Verified Client Review
            </span>
            <h3 className="font-['Playfair_Display',serif] text-base font-bold truncate max-w-sm">
              {product.name}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-['Playfair_Display',serif] text-xl font-bold text-stone-900">
              Thank You for Your Review
            </h4>
            <p className="text-xs text-stone-600">
              Your feedback helps fellow clients select the finest garment and guides our sartorial atelier.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            {error && (
              <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                {error}
              </div>
            )}

            {/* Star Rating Selector */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                Overall Rating
              </label>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 text-amber-500 transition"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? 'fill-amber-500 text-amber-500'
                          : 'text-stone-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-semibold text-stone-700 ml-2">
                  {rating === 5 ? 'Exceptional' : rating === 4 ? 'Very Good' : rating === 3 ? 'Average' : 'Below Expectation'}
                </span>
              </div>
            </div>

            {/* Fit Assessment */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1.5">
                How did it fit?
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {(['Runs Small', 'True to Size', 'Runs Large'] as const).map((fitOption) => (
                  <button
                    type="button"
                    key={fitOption}
                    onClick={() => setFit(fitOption)}
                    className={`py-2 px-3 border text-center font-medium transition ${
                      fit === fitOption
                        ? 'border-stone-900 bg-stone-900 text-white font-bold'
                        : 'border-stone-200 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {fitOption}
                  </button>
                ))}
              </div>
            </div>

            {/* Size & Color Purchased */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Size Purchased
                </label>
                <select
                  value={sizePurchased}
                  onChange={(e) => setSizePurchased(e.target.value)}
                  className="w-full text-xs border border-stone-300 p-2 bg-stone-50"
                >
                  {product.sizes.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Color Purchased
                </label>
                <select
                  value={colorPurchased}
                  onChange={(e) => setColorPurchased(e.target.value)}
                  className="w-full text-xs border border-stone-300 p-2 bg-stone-50"
                >
                  {product.colors.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Author Name */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                Your Name & Location
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Richard Sterling, London"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-xs border border-stone-300 p-2.5 focus:border-stone-900 focus:outline-none"
              />
            </div>

            {/* Review Title */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                Headline
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Remarkable tailoring and drape"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs border border-stone-300 p-2.5 focus:border-stone-900 focus:outline-none"
              />
            </div>

            {/* Detailed Feedback */}
            <div>
              <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider mb-1">
                Written Review
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share your experience regarding fabric weight, comfort, stitching, and versatility..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full text-xs border border-stone-300 p-2.5 focus:border-stone-900 focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-2 text-[11px] text-stone-500 bg-stone-50 p-2.5 border border-stone-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Reviews are verified by order history to ensure authentic sartorial feedback.</span>
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="submit-review-btn"
                className="px-6 py-2.5 bg-stone-950 hover:bg-amber-600 text-white text-xs font-bold tracking-widest uppercase transition"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
