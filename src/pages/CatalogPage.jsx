import { useState, useMemo } from 'react';
import ProductCard from '../components/catalog/ProductCard';
import CartSummary from '../components/cart/CartSummary';
import { PRODUCTS } from '../data/products';

const CATEGORIES = ['TODOS', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

const CatalogPage = () => {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchCat = activeCategory === 'TODOS' || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="grid md:grid-cols-[1fr_320px] gap-6 max-w-[1280px] mx-auto p-4 md:p-6 catalog-page">
      <main className="flex flex-col gap-4 md:gap-5 min-w-0">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 sm:gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-text-primary tracking-tight">Catálogo</h1>
            <p className="text-xs md:text-sm text-text-muted mt-0.5">Selecciona los productos</p>
          </div>

          <input
            className="w-full sm:w-[180px] md:w-[200px] px-3 py-2 border border-border rounded-md text-sm font-sans bg-white text-text-primary transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
            type="text"
            placeholder="Buscar…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-border text-text-secondary hover:bg-surface-hover hover:text-text-primary'
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-text-muted">
            <span className="text-4xl block mb-2">🔍</span>
            <p className="text-sm">Sin resultados</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {filtered.map((product, i) => (
              <div key={product.id} style={{ animationDelay: `${i * 60}ms` }} className="animate-fadeIn">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </main>

      <aside className="catalog-page__sidebar hidden md:block">
        <CartSummary />
      </aside>
    </div>
  );
};

export default CatalogPage;