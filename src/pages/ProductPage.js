import React from 'react';
import axios from 'axios';

function ProductPage() {
  const [productData, setProductData] = React.useState([]);
  //   const [todosData, setTodosData] = React.useState([]);

  React.useEffect(() => {
    const getProductData = async () => {
      try {
        const products = await axios.get('http://localhost:2000/products');
        setProductData(products.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    // const getTodosData = async () => {
    //   const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    //   setTodosData(todos.data);
    // };

    // getTodosData();

    getProductData();
  }, []);

  return (
    <div>
      Ini halaman Product Pages
      {productData.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
      {/* {todosData.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))} */}
    </div>
  );
}

export default ProductPage;
