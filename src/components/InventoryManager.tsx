import React, { useState } from 'react';
import { 
  Layers, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Plus, 
  Minus, 
  RefreshCw, 
  Package, 
  DollarSign, 
  ChevronDown, 
  ChevronUp,
  Edit2,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { Product, ProductCategory } from '../types';

interface InventoryManagerProps {
  products: Product[];
  onUpdateStock: (productId: string, variantKey: string, delta: number) => void;
  onQuickRestockTotal: (productId: string, amount: number) => void;
  onUpdatePrice: (productId: string, newPrice: number) => void;
  onBulkRestockLow: () => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({
  products,
  onUpdateStock,
  onQuickRestockTotal,
  onUpdatePrice,
  onBulkRestockLow
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState<'all' | 'low' | 'out' | 'healthy'>('all');
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null);
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const [restockModalProduct, setRestockModalProduct] = useState<Product | null>(null);
  const [restockAmount, setRestockAmount] = useState<number>(20);

  // Filter products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterMode === 'low') return p.totalStock <= p.lowStockThreshold && p.totalStock > 0;
    if (filterMode === 'out') return p.totalStock === 0;
    if (filterMode === 'healthy') return p.totalStock > p.lowStockThreshold;
    return true;
  });

  // Calculate statistics
  const totalUnits = products.reduce((acc, p) => acc + p.totalStock, 0);
  const totalValue = products.reduce((acc, p) => acc + (p.totalStock * p.price), 0);
  const lowStockCount = products.filter((p) => p.totalStock <= p.lowStockThreshold && p.totalStock > 0).length;
  const outOfStockCount = products.filter((p) => p.totalStock === 0).length;

  const handleSavePrice = (productId: string) => {
    const num = parseFloat(tempPrice);
    if (!isNaN(num) && num > 0) {
      onUpdatePrice(productId, num);
    }
    setEditingPriceId(null);
  };

  const handleConfirmRestock = () => {
    if (restockModalProduct && restockAmount > 0) {
      onQuickRestockTotal(restockModalProduct.id, restockAmount);
      setRestockModalProduct(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Title and Quick Bulk Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-xs text-amber-600 font-bold uppercase tracking-wider">
            <Layers className="w-4 h-4" />
            <span>Store Operations Console</span>
          </div>
          <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Real-Time Inventory Management
          </h1>
          <p className="text-xs text-stone-700 mt-1">
            Manage SKU allocations, monitor threshold warnings, adjust live warehouse counts, and reprice garments.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="bulk-restock-btn"
            onClick={onBulkRestockLow}
            className="px-4 py-2.5 bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold tracking-wider uppercase transition flex items-center gap-2 shadow"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restock All Low Items (+15 ea)</span>
          </button>
        </div>
      </div>

      {/* Overview Stat Widgets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
            Total In-Stock Units
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1 flex items-baseline justify-between">
            <span>{totalUnits}</span>
            <Package className="w-5 h-5 text-stone-400" />
          </div>
          <span className="text-[10px] text-stone-600 mt-1 block">Across {products.length} distinct atelier styles</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
            Total Inventory Valuation
          </span>
          <div className="text-2xl font-bold text-stone-900 mt-1 flex items-baseline justify-between">
            <span>${totalValue.toLocaleString()}</span>
            <DollarSign className="w-5 h-5 text-emerald-600" />
          </div>
          <span className="text-[10px] text-emerald-700 font-medium mt-1 block">At wholesale MSRP value</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
            Low Stock Alerts
          </span>
          <div className="text-2xl font-bold text-amber-600 mt-1 flex items-baseline justify-between">
            <span>{lowStockCount} SKUs</span>
            <AlertTriangle className="w-5 h-5 text-amber-500" />
          </div>
          <span className="text-[10px] text-amber-700 font-medium mt-1 block">Below safety reserve buffer</span>
        </div>

        <div className="bg-white p-5 border border-stone-200 shadow-sm">
          <span className="text-[11px] font-semibold text-stone-600 uppercase tracking-wider block">
            Stockout Incidents
          </span>
          <div className="text-2xl font-bold text-rose-600 mt-1 flex items-baseline justify-between">
            <span>{outOfStockCount}</span>
            <X className="w-5 h-5 text-rose-500" />
          </div>
          <span className="text-[10px] text-stone-600 mt-1 block">Requires supplier purchase order</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 border border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by SKU, style name, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full text-xs pl-9 pr-3 py-2 border border-stone-300 focus:outline-none focus:border-stone-900"
          />
        </div>

        <div className="flex items-center space-x-2 text-xs w-full sm:w-auto overflow-x-auto">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 font-medium whitespace-nowrap transition ${
              filterMode === 'all'
                ? 'bg-stone-900 text-white font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All Items ({products.length})
          </button>
          <button
            onClick={() => setFilterMode('low')}
            className={`px-3 py-1.5 font-medium whitespace-nowrap transition ${
              filterMode === 'low'
                ? 'bg-amber-500 text-stone-950 font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Low Stock ({lowStockCount})
          </button>
          <button
            onClick={() => setFilterMode('out')}
            className={`px-3 py-1.5 font-medium whitespace-nowrap transition ${
              filterMode === 'out'
                ? 'bg-rose-600 text-white font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            Sold Out ({outOfStockCount})
          </button>
          <button
            onClick={() => setFilterMode('healthy')}
            className={`px-3 py-1.5 font-medium whitespace-nowrap transition ${
              filterMode === 'healthy'
                ? 'bg-emerald-700 text-white font-bold'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            In Healthy Stock
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-900 text-white uppercase tracking-wider text-[11px] font-semibold">
              <tr>
                <th className="py-3.5 px-4">Garment & SKU</th>
                <th className="py-3.5 px-3">Category</th>
                <th className="py-3.5 px-3">Price</th>
                <th className="py-3.5 px-3">Total Stock</th>
                <th className="py-3.5 px-3">Stock Status</th>
                <th className="py-3.5 px-4 text-right">Inventory Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {filteredProducts.map((p) => {
                const isExpanded = expandedProduct === p.id;
                const isLow = p.totalStock <= p.lowStockThreshold && p.totalStock > 0;
                const isOut = p.totalStock === 0;

                return (
                  <React.Fragment key={p.id}>
                    <tr className="hover:bg-stone-50/80 transition-colors">
                      {/* Product details */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-12 object-cover border border-stone-200"
                          />
                          <div>
                            <span className="font-bold text-stone-900 block">{p.name}</span>
                            <span className="text-[11px] font-mono text-stone-600 font-medium">SKU: {p.sku}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-3 uppercase text-[11px] text-stone-600 font-semibold">
                        {p.category}
                      </td>

                      {/* Price (Editable) */}
                      <td className="py-3.5 px-3">
                        {editingPriceId === p.id ? (
                          <div className="flex items-center space-x-1">
                            <span className="text-stone-500">$</span>
                            <input
                              type="number"
                              value={tempPrice}
                              onChange={(e) => setTempPrice(e.target.value)}
                              className="w-16 p-1 border border-stone-900 text-xs"
                              autoFocus
                            />
                            <button
                              onClick={() => handleSavePrice(p.id)}
                              className="p-1 text-emerald-600 hover:bg-emerald-50"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingPriceId(null)}
                              className="p-1 text-stone-400 hover:bg-stone-100"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-1.5 group/price">
                            <span className="font-bold text-stone-900">${p.price}</span>
                            <button
                              onClick={() => {
                                setEditingPriceId(p.id);
                                setTempPrice(p.price.toString());
                              }}
                              className="opacity-0 group-hover/price:opacity-100 text-stone-400 hover:text-stone-900 p-0.5 transition"
                              title="Edit price"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                          </div>
                        )}
                      </td>

                      {/* Total Stock */}
                      <td className="py-3.5 px-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onQuickRestockTotal(p.id, -1)}
                            disabled={p.totalStock <= 0}
                            className="p-1 rounded border border-stone-300 hover:bg-stone-200 disabled:opacity-30"
                            title="Decrease total by 1"
                          >
                            <Minus className="w-3 h-3 text-stone-600" />
                          </button>
                          <span className="font-bold text-stone-900 min-w-[28px] text-center">
                            {p.totalStock}
                          </span>
                          <button
                            onClick={() => onQuickRestockTotal(p.id, 1)}
                            className="p-1 rounded border border-stone-300 hover:bg-stone-200"
                            title="Increase total by 1"
                          >
                            <Plus className="w-3 h-3 text-stone-600" />
                          </button>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-3">
                        {isOut ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] uppercase">
                            Out of Stock
                          </span>
                        ) : isLow ? (
                          <span className="inline-flex items-center px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 font-bold text-[10px] uppercase">
                            Low Stock (&lt;{p.lowStockThreshold})
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-[10px] uppercase">
                            In Stock
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setRestockModalProduct(p)}
                            className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-[11px] uppercase tracking-wider transition"
                          >
                            + Restock
                          </button>

                          <button
                            onClick={() => setExpandedProduct(isExpanded ? null : p.id)}
                            className="p-1.5 border border-stone-300 text-stone-700 hover:bg-stone-100 transition flex items-center gap-1 text-[11px]"
                            title="View/Edit Variant Matrix"
                          >
                            <span>Variants</span>
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </td>
                    </tr>

                    {/* Expanded Variant Matrix Row */}
                    {isExpanded && (
                      <tr className="bg-stone-100/60 border-t border-stone-200">
                        <td colSpan={6} className="p-4 sm:p-5">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                                Variant Stock Matrix ({p.name})
                              </span>
                              <span className="text-[11px] text-stone-500">
                                Click +/- to update specific size/color allocation
                              </span>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5 text-xs">
                              {Object.entries(p.stockPerVariant).map(([variantKey, rawCount]) => {
                                const count = Number(rawCount) || 0;
                                const [col, sz] = variantKey.split('-');
                                return (
                                  <div
                                    key={variantKey}
                                    className={`p-2.5 bg-white border ${
                                      count <= 2 ? 'border-amber-400' : 'border-stone-200'
                                    } shadow-xs flex flex-col justify-between`}
                                  >
                                    <div>
                                      <div className="text-[10px] text-stone-600 font-medium truncate" title={col}>
                                        {col}
                                      </div>
                                      <div className="font-bold text-stone-900 text-sm">{sz}</div>
                                    </div>

                                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                                      <button
                                        onClick={() => onUpdateStock(p.id, variantKey, -1)}
                                        disabled={count <= 0}
                                        className="p-0.5 text-stone-500 hover:text-stone-900 disabled:opacity-20"
                                      >
                                        <Minus className="w-3 h-3" />
                                      </button>
                                      <span className={`font-mono font-bold ${count <= 2 ? 'text-amber-600' : 'text-stone-900'}`}>
                                        {count}
                                      </span>
                                      <button
                                        onClick={() => onUpdateStock(p.id, variantKey, 1)}
                                        className="p-0.5 text-stone-500 hover:text-stone-900"
                                      >
                                        <Plus className="w-3 h-3" />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Restock Dialog Modal */}
      {restockModalProduct && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 shadow-2xl border border-stone-300 space-y-4">
            <div className="flex justify-between items-center border-b border-stone-200 pb-3">
              <h3 className="font-['Playfair_Display',serif] text-base font-bold text-stone-900">
                Restock Style: {restockModalProduct.name}
              </h3>
              <button onClick={() => setRestockModalProduct(null)} className="text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-600">
              Current total in stock: <strong>{restockModalProduct.totalStock} units</strong>. Select replenishment volume:
            </p>

            <div className="grid grid-cols-4 gap-2">
              {[10, 25, 50, 100].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setRestockAmount(amt)}
                  className={`py-2 text-xs font-bold border ${
                    restockAmount === amt ? 'bg-stone-900 text-white' : 'bg-stone-50 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  +{amt}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <label className="text-xs font-semibold text-stone-700">Custom Amount:</label>
              <input
                type="number"
                min="1"
                value={restockAmount}
                onChange={(e) => setRestockAmount(Math.max(1, parseInt(e.target.value) || 0))}
                className="w-24 p-2 border border-stone-300 text-xs font-bold"
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => setRestockModalProduct(null)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRestock}
                className="px-5 py-2 bg-stone-900 hover:bg-amber-600 text-white text-xs font-bold uppercase tracking-wider transition"
              >
                Confirm Restock (+{restockAmount})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
