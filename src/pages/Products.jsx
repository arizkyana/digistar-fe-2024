import { createContext, useContext, useEffect, useState } from "react";
import styles from "./products.module.css";

const CartContext = createContext({
  cartCounter: 0,
});

const CartProvider = (props) => {
  const [cartCounter, setCartCounter] = useState(0);

  const addToCart = () => {
    setCartCounter(cartCounter + 1);
  };

  return (
    <CartContext.Provider
      value={{
        cartCounter,
        addToCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

const Cart = () => {
  const { cartCounter } = useContext(CartContext);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        padding: 1,
      }}
    >
      Your Cart: {cartCounter}
    </div>
  );
};

const useProducts = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const result = await fetch(
        `https://dummyjson.com/products?limit=${10}&skip=${0}`
      );
      const data = await result.json();
      setProducts(data.products);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return {
    loading,
    products,
    addToCart,
  };
};

const Products = () => {
  const { loading, products, addToCart } = useProducts();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Products</h1>
      <div>
        {loading ? (
          "loading..."
        ) : (
          <div className={styles.productsContainer}>
            {products?.map((item, idx) => (
              <div key={idx} className={styles.productsItem}>
                <img
                  className={styles.productsItemCover}
                  src={item.images?.[0]}
                  alt={`product-cover-${idx}`}
                />
                <span>{item.title}</span>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      addToCart();
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProductsPage = () => {
  return (
    <CartProvider>
      <Cart />
      <Products />
    </CartProvider>
  );
};

export default ProductsPage;
