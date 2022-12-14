import React from 'react';
import { getCars } from './utils/car';
import CarList from './components/CarList';
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  const navigate = useNavigate();

  const [carState, setCarState] = React.useState(getCars());
  const [name, setName] = React.useState('');
  const [price, setPrice] = React.useState(0);
  const [imageUrl, setImageUrl] = React.useState('');
  const [year, setYear] = React.useState(0);
  const [loggedInUser, setLoggedInUser] = React.useState();

  React.useEffect(() => {
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

    checkIsLoggedIn();
  }, [navigate]);

  const nameEventHandler = (event) => {
    const value = event.target.value;
    setName(value);
  };

  const priceEventHandler = (event) => {
    const value = event.target.value;
    setPrice(value);
  };

  const imageEventHandler = (event) => {
    const value = event.target.value;
    setImageUrl(value);
  };

  const yearEventHandler = (event) => {
    const value = event.target.value;
    setYear(value);
  };

  const addCarEventHandler = (event) => {
    event.preventDefault();

    if (name && price && imageUrl && year) {
      const newCar = {
        id: +new Date(),
        name: name,
        price: price,
        imageUrl: imageUrl,
        year: year,
      };

      setCarState([...carState, newCar]);
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
      <Header />
      <h2>Selamat datang, {loggedInUser ? loggedInUser.name : 'Loading...'}</h2>
      <button onClick={() => logoutUserHandler()}>Logout</button>
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm my-5 mx-auto">
        <form onSubmit={(event) => addCarEventHandler(event)}>
          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Car Name</label>
            <input
              type="text"
              onChange={(event) => nameEventHandler(event)}
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter name"
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Price</label>
            <input
              type="number"
              onChange={(event) => priceEventHandler(event)}
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter price"
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Image</label>
            <input
              type="text"
              onChange={(event) => imageEventHandler(event)}
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter image url"
            />
          </div>

          <div className="form-group mb-6">
            <label className="form-label inline-block mb-2 text-gray-700">Year</label>
            <input
              type="number"
              onChange={(event) => yearEventHandler(event)}
              className="form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Enter year"
            />
          </div>

          <button
            type="submit"
            className="
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <h1 className="text-center font-bold text-3xl my-4">Daftar Mobil</h1>
      <CarList cars={carState} />
    </div>
  );
}

export default App;
