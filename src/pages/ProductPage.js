import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProductPage() {
  const navigate = useNavigate();
  const [productData, setProductData] = React.useState([]);
  const [loggedInUser, setLoggedInUser] = React.useState();
  const [nameState, setNameState] = React.useState('');
  const [priceState, setPriceState] = React.useState(0);
  const [stockState, setStockState] = React.useState(0);
  const [pictureState, setPictureState] = React.useState();
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

    const checkIsLoggedIn = async () => {
      try {
        const jwtToken = localStorage.getItem('user_token');

        const validateTokenResponse = await axios.get('http://localhost:2000/auth/me', {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (validateTokenResponse.status !== 200) {
          navigate('/login');
        } else {
          console.log(validateTokenResponse);
          setLoggedInUser(validateTokenResponse.data.data);
        }
      } catch (err) {
        console.log(err);
        navigate('/login');
      }
    };

    // const getTodosData = async () => {
    //   const todos = await axios.get('https://jsonplaceholder.typicode.com/todos');
    //   setTodosData(todos.data);
    // };

    // getTodosData();
    checkIsLoggedIn();
    getProductData();
  }, [navigate]);

  const onChangeNameHandler = (e) => {
    const value = e.target.value;
    // console.log('Name:', value);

    setNameState(value);
  };

  const onChangePriceHandler = (e) => {
    const value = e.target.value;
    // console.log('Price:', value);
    setPriceState(value);
  };

  const onChangeStockHandler = (e) => {
    const value = e.target.value;
    // console.log('Stock', value);
    setStockState(value);
  };

  const onChangePictureHandler = (e) => {
    const value = e.target.files[0];
    // console.log('Picture', value);
    setPictureState(value);
  };

  const onSubmitButtonHandler = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append('name', nameState);
      payload.append('price', priceState);
      payload.append('stock', stockState);
      payload.append('picture', pictureState);

      const productResponse = await axios.post('http://localhost:2000/products', payload);
      // console.log('response', productResponse);

      if (productResponse.status === 200) {
        console.log('Product Created');
      }
    } catch (err) {
      console.log('failed response: ', err);
    }
  };

  const logoutUserHandler = () => {
    const loggedOut = localStorage.removeItem('user_token');
    if (loggedOut === undefined) {
      navigate('/login');
    }
  };

  return (
    <div>
      Ini halaman Product Pages
      <h2>Selamat datang, {loggedInUser ? loggedInUser.name : 'Loading...'}</h2>
      <button onClick={() => logoutUserHandler()}>Logout</button>
      {productData.map((product) => (
        <div key={product.id}>
          <div>
            <img src={product.picture} alt="" />
          </div>
          {product.name}
        </div>
      ))}
      {/* {todosData.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))} */}
      <br />
      <form onSubmit={(e) => onSubmitButtonHandler(e)}>
        <div>
          Name: <input type="text" onChange={(e) => onChangeNameHandler(e)} placeholder="input product name" />
        </div>
        <div>
          Price: <input type="number" onChange={(e) => onChangePriceHandler(e)} placeholder="input product price" />
        </div>
        <div>
          Stock: <input type="number" onChange={(e) => onChangeStockHandler(e)} placeholder="input product stock" />
        </div>
        <div>
          Picture: <input type="file" onChange={(e) => onChangePictureHandler(e)} placeholder="input product name" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default ProductPage;
