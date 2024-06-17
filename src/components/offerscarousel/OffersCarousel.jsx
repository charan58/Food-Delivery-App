import React from 'react';
import { Carousel } from 'react-bootstrap';
import './OffersCarousel.css';

function OffersCarousel() {
  // Offers
  const offers = [
    {
      id: 1,
      label: 'Discounts',
      description: 'Get 20% off on your first order!',
    },
    {
      id: 2,
      label: 'Popular Restaurants',
      description: 'Top-rated restaurants in your area.',
    },
    {
      id: 3,
      label: 'Special Offers',
      description: 'Exclusive deals just for you!',
    },
    {
      id:4,
      label:'Ensure your food with dining',
      description:'Dining restaurants'
    }
  ];

  return (
    <Carousel>
      {offers.map((offer) => (
        <Carousel.Item key={offer.id}>
          <div className="carousel-item-content">
            <Carousel.Caption>
              <h3 >{offer.label}</h3>
              <p>{offer.description}</p>
            </Carousel.Caption>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default OffersCarousel;
