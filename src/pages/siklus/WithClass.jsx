import { Component } from "react";

import styles from "./cycle.module.css";

class WithClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: [],
      counter: 0,
      params: {
        limit: 9,
        skip: 0,
      },
    };
  }

  async componentDidMount() {
    await this.fetchProducts();
  }

  async componentDidUpdate() {
    console.log("component did update...");
    await this.fetchProducts();
  }

  async fetchProducts() {
    try {
      this.setState((state) => (state.loading = true));
      const result = await fetch(
        `https://dummyjson.com/products?limit=${this.state.params.limit}&skip=${this.state.params.skip}`
      );
      const data = await result.json();
      this.setState((state) => (state.products = data.products));
    } catch (error) {
      console.log("error > ", error);
    } finally {
      this.setState((state) => (state.loading = false));
    }
  }

  render() {
    return (
      <div>
        <h1 className={styles.heading}>With Class</h1>
        <div>
          <div>counter {this.state.counter}</div>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                counter: this.state.counter + 1,
              }))
            }
          >
            click me
          </button>
        </div>
        <div>
          <h2>Load products</h2>
          {this.state.loading ? (
            "loading..."
          ) : (
            <div className={styles.productsContainer}>
              {this.state.products?.map((item, idx) => (
                <div key={idx} className={styles.productsItem}>
                  <img
                    className={styles.productsItemCover}
                    src={item.images?.[0]}
                    alt={`product-cover-${idx}`}
                  />
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.paginationContainer}>
          <button type="button">Prev</button>
          <button
            type="button"
            onClick={() =>
              this.setState((state) => ({
                ...state,
                params: {
                  ...state.params,
                  skip: this.state.skip + 9,
                },
              }))
            }
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}

export default WithClass;
