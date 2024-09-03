import { useEffect, useState } from "react";

const WithFunction = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const result = await fetch("https://dummyjson.com/products");
        const data = await result.json();
        setProducts(data.products);
      } catch (error) {
        console.log("error > ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>With Function</h1>
      <div>
        {loading ? (
          "loading..."
        ) : (
          <>
            {products?.map((item, idx) => (
              <div key={idx}>{item.title}</div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WithFunction;
