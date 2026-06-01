import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  function addProduct() {
    const newProduct = {
      title: title,
      price: price,
      image: image,
      category: category
    };

    fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(newProduct)
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Product added successfully");
      })
  };

  useEffect(() => {
    fetch("http://localhost:5000/products/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/jewelery/")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  /*
  function getMessage() {
    fetch("http://localhost:5000/")
      .then(function(response) {
        return response.text();
      })
      .then(function(data) {
        setMessage(data);
      });
  }
  */

    return (
      <div>
        <h1>Product List</h1>
        <div className="product-container">
          {products.map((product) => {
            return (
              <div className="product-card" key={product.id}>
                <img src={product.image} alt="product" />
                <h2>{product.title}</h2>
                <p>Price: ${product.price}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default App;
