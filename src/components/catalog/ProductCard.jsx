import { useCart } from '../../context/CartContext';

const PlusIcon = () => (
  <svg
    width="12"
    height="12"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
  </svg>
);

const ProductCard = ({ product }) => {
  const { isInCart, getItem, updateQty, addItem } = useCart();
  const inCart = isInCart(product.id);
  const cartItem = getItem(product.id);

  return (
    <article className="bg-white border border-border rounded-lg overflow-hidden shadow-sm flex flex-col transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[4/3] overflow-hidden bg-bg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={e => {
            e.target.src = `https://placehold.co/400x240/f0f4ff/2563eb?text=${encodeURIComponent(product.name)}`;
          }}
        />
        <span className="absolute top-2 left-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-white/90 text-text-secondary backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="p-2.5 md:p-3 flex flex-col gap-1 flex-1">
        <h3 className="text-sm md:text-base font-bold text-text-primary leading-tight tracking-tight">
          {product.name}
        </h3>
        <p className="text-[10px] md:text-xs text-text-muted leading-relaxed flex-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-1.5 gap-1.5">
          <div className="flex flex-col">
            <span className="text-lg md:text-xl font-bold text-primary tracking-tight leading-tight">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-[10px] md:text-xs text-text-muted">+ IVA</span>
          </div>

          {inCart ? (
            <div className="flex items-center gap-0.5">
              <button
                className="w-5 h-5 md:w-6 md:h-6 p-0 border border-border bg-white rounded text-xs md:text-sm font-bold text-text-secondary cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:border-primary hover:text-white"
                onClick={() => updateQty(product.id, cartItem.quantity - 1)}
                aria-label="Reducir"
              >
                −
              </button>
              <span className="w-4 md:w-5 text-xs font-bold text-center">{cartItem.quantity}</span>
              <button
                className="w-5 h-5 md:w-6 md:h-6 p-0 border border-border bg-white rounded text-xs md:text-sm font-bold text-text-secondary cursor-pointer flex items-center justify-center transition-all hover:bg-primary hover:border-primary hover:text-white"
                onClick={() => updateQty(product.id, cartItem.quantity + 1)}
                aria-label="Aumentar"
              >
                +
              </button>
            </div>
          ) : (
            <button 
              className="flex items-center gap-1 px-2 py-1.5 md:px-3.5 md:py-2 bg-primary text-white text-[10px] md:text-xs font-semibold rounded-md cursor-pointer transition-all hover:bg-primary-hover"
              onClick={() => addItem(product)}
            >
              <PlusIcon />
              <span className="hidden md:inline">Agregar</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;