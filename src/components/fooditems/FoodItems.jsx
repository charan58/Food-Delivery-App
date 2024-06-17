import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import './FoodItems.css';
import { CartContext } from '../contexts/cartfunctions/CartFunctions';
import { LoginContext } from '../contexts/loginfunctions/LoginContext';
import { Link } from 'react-router-dom';
function FoodItems() {
  const foodItemsList = [
    {
      id: 1,
      name: 'Butter Chicken',
      image: 'https://www.licious.in/blog/wp-content/uploads/2020/10/butter-chicken--750x750.jpg',
      rating: 4.8,
      price: 350,
      deliveryTime: '40 mins',
    },
    {
      id: 2,
      name: 'Paneer Tikka',
      image: 'https://img.onmanorama.com/content/dam/mm/en/food/recipe/images/2024/1/3/paneer-tikka.jpg.transform/845x440/image.jpg',
      rating: 4.6,
      price: 300,
      deliveryTime: '35 mins',
    },
    {
      id: 3,
      name: 'Biryani',
      image: 'https://www.andy-cooks.com/cdn/shop/articles/20231014063236-andy-20cooks-20-20mutton-20biryani-20lamb.jpg?v=1697355344&width=1600',
      rating: 4.7,
      price: 250,
      deliveryTime: '45 mins',
    },
    {
      id: 4,
      name: 'Masala Dosa',
      image: 'https://i.ytimg.com/vi/CCab5oh0ZOc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA730YKb2VkyJ2V4Q-R9cICWRXs9w',
      rating: 4.5,
      price: 150,
      deliveryTime: '30 mins',
    },
    {
      id: 5,
      name: 'Chole Bhature',
      image: 'https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg',
      rating: 4.6,
      price: 200,
      deliveryTime: '25 mins',
    },
    {
      id: 6,
      name: 'Palak Paneer',
      image: 'https://www.finedininglovers.com/sites/g/files/xknfdk626/files/styles/recipes_1200_800/public/2023-09/palak-paneer.jpg.webp?itok=CR56DbG4',
      rating: 4.7,
      price: 280,
      deliveryTime: '35 mins',
    },
    {
      id: 7,
      name: 'Tandoori Chicken',
      image: 'https://www.allrecipes.com/thmb/ygY1JXP8_IkDSjPPW5VH2dTiMMU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/50347-indian-tandoori-chicken-DDMFS-4x3-3035-205e98c80b2f4275b5bd010c396d9149.jpg',
      rating: 4.8,
      price: 320,
      deliveryTime: '50 mins',
    },
    {
      id: 8,
      name: 'Samosa',
      image: 'https://myfoodstory.com/wp-content/uploads/2021/08/Punjabi-Samosa-4.jpg',
      rating: 4.3,
      price: 50,
      deliveryTime: '15 mins',
    },
    {
      id: 9,
      name: 'Pav Bhaji',
      image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Bambayya_Pav_bhaji.jpg',
      rating: 4.6,
      price: 180,
      deliveryTime: '25 mins',
    },
    {
      id: 10,
      name: 'Dal Makhani',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiMQyxGoJAdxX6CQKbMTFu76FmZ3uMhsa11Q&s',
      rating: 4.7,
      price: 240,
      deliveryTime: '30 mins',
    },
    {
      id: 11,
      name: 'Gulab Jamun',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUTZA1cEtNFBTKDUT8ow1m-3dorJDIO8UDcQ&s',
      rating: 4.8,
      price: 100,
      deliveryTime: '20 mins',
    },
    {
      id: 12,
      name: 'Rogan Josh',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQbj5hFVaZxAha974ZsCO9K3K38r9Y43eDWg&s',
      rating: 4.7,
      price: 350,
      deliveryTime: '45 mins',
    },
    {
      id: 13,
      name: 'Aloo Paratha',
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg/640px-Aloo_Paratha_also_known_as_Batatay_Jo_Phulko.jpg',
      rating: 4.5,
      price: 120,
      deliveryTime: '20 mins',
    },
    {
      id: 14,
      name: 'Chicken Curry',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnHTyiK9mivg1s_Vflyp431NxEYc63iOIq0g&s',
      rating: 4.6,
      price: 300,
      deliveryTime: '40 mins',
    },
    {
      id: 15,
      name: 'Vada Pav',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjaos5xs6vqHBwxt31CKXiYaqMHrAvzBwbUQ&s',
      rating: 4.3,
      price: 60,
      deliveryTime: '15 mins',
    },
    {
      id: 16,
      name: 'Paneer Butter Masala',
      image: 'https://aartimadan.com/wp-content/uploads/2023/11/Paneer-Butter-Masala-Restaurant-Style.jpg',
      rating: 4.7,
      price: 280,
      deliveryTime: '35 mins',
    },
    {
      id: 17,
      name: 'Fish Curry',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8nQhwvilmp-gsGk74XWd9VNRtJ3ak99Gg4A&s',
      rating: 4.7,
      price: 350,
      deliveryTime: '40 mins',
    },
    {
      id: 18,
      name: 'Rajma Chawal',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT74abf1eXhzxpGjxex667n8-4jpP49cvWCSw&s',
      rating: 4.6,
      price: 200,
      deliveryTime: '30 mins',
    },
    {
      id: 19,
      name: 'Idli Sambhar',
      image: 'https://vaya.in/recipes/wp-content/uploads/2018/02/Idli-and-Sambar-1.jpg',
      rating: 4.5,
      price: 100,
      deliveryTime: '20 mins',
    },
    {
      id: 20,
      name: 'Kebabs',
      image: 'https://www.simplyrecipes.com/thmb/yyZI7zjnEVRNei_-uoWIpA5tEkI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2011__07__beef-kabobs-horiz-a-1600-c030dd49345f4aa89f1f3b5a184eb16f.jpg',
      rating: 4.8,
      price: 320,
      deliveryTime: '35 mins',
    },
    {
      id:21,
      name:'Vegetarian Fried Rice',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0Sds2N7j-aT95gmnHcz5xniQbzBPQYcUPw&s',
      rating:4.0,
      price:150,
      deliveryTime:'30 mins'
    },
    {
      id:22,
      name:'Chicken Fried Rice',
      image:'https://static.toiimg.com/thumb/75581339.cms?width=1200&height=900',
      rating:4.1,
      price:200
    },
    {
      id:23,
      name:'Pizza',
      image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFb-QOETAw_2smnhPtCqsh8A1KTeBnpYEBTQ&s',
      rating:4.1,
      price:300
    },
    {
      id:24,
      name:'Mutton Biriyani',
      image:'https://www.chefkunalkapur.com/wp-content/uploads/2021/03/Gosht-Biryani-1300x868.jpeg?v=1625193165',
      rating:3.9,
      price:350
    },
    {
      id:25,
      name:'Butter Naan',
      image:'https://c.ndtvimg.com/2023-01/8fap4mso_naan_625x300_22_January_23.jpg?im=FaceCrop,algorithm=dnn,width=650,height=400',
      rating:4.2,
      price: 30 
    }
  ];

  const [cart, cartCount, addToCart] = useContext(CartContext);
  const [currentUser, error, loginStatus, login, logout] = useContext(LoginContext);
  
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control login modal

  const handleAddToCart = (foodItem) => {
    if (loginStatus) {
      addToCart(foodItem);
    } else {
      setShowLoginModal(true); // Show login modal if not logged in
    }
  };

  const closeLoginModal = () => {
    setShowLoginModal(false); // Close login modal
  };

  const redirectToLogin = () => {
    // Implement your logic to redirect to the login page
    console.log("Redirecting to login page...");
    // Example: history.push('/login');
    // For simplicity, you can also use window.location.href = '/login';
  };

  return (
    <div className='container'>
      <div className='row d-flex pt-3'>
        {foodItemsList.map((foodItem) => (
          <div className='col-6 col-md-4 col-lg-2 mb-4' key={foodItem.id}>
            <Card className='food-card'>
              <Card.Img variant="top" src={foodItem.image} />
              <Card.Body>
                <Card.Title>{foodItem.name}</Card.Title>
                <Card.Text>
                  Rating: {foodItem.rating}<br />
                  Price: ₹{foodItem.price}<br />
                  Delivery Time: {foodItem.deliveryTime}
                </Card.Text>
                <Button variant="primary" onClick={() => handleAddToCart(foodItem)}>Add to Cart</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      <Modal show={showLoginModal} onHide={closeLoginModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Please Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to login to add items to your cart.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={redirectToLogin}>
           <Link to='/login' className='go-to-login'>  Go to Login</Link>
          </Button>
          <Button variant="primary" onClick={closeLoginModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FoodItems;
