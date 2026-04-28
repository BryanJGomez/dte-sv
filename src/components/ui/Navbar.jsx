import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19M7 13H5.4M9 21a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm8 0a1 1 0 1 0 2 0 1 1 0 0 0-2 0z"
    />
  </svg>
);

const BoxIcon = () => (
  <svg width="22" height="22" fill="none" stroke="#2563eb" strokeWidth="1.8" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20 7l-8-4-8 4m16 0v10l-8 4m-8-4V7m16 0L12 12M4 7l8 5"
    />
  </svg>
);

const HistoryIcon = () => (
  <svg
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"
    />
  </svg>
);

const Navbar = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="w-full px-4 md:px-8 flex items-center justify-between h-14">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-primary hover:text-primary-hover"
        >
          <BoxIcon />
          <span className="hidden sm:inline">DTE-SV</span>
        </Link>

        <div className="flex items-center gap-4 ml-auto">
          <Link
            to="/historial"
            className="flex items-center gap-1.5 text-sm font-medium text-text-secondary hover:text-primary"
          >
            <HistoryIcon />
            <span className="hidden md:inline">Historial</span>
          </Link>

          <button
            onClick={() => navigate('/checkout')}
            className="relative flex items-center justify-center w-9 h-9 bg-primary-light text-primary font-semibold text-xs rounded-md hover:bg-primary hover:text-white"
          >
            <CartIcon />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-danger text-white text-[10px] font-bold rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;