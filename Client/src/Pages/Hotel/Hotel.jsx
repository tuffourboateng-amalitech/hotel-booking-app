import React, { useState } from 'react'
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import {photos} from '../../photos/photos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../Components/MailList/MailList'
import Footer from '../../Components/Footer/Footer'
import './Hotel.css'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

const Hotel = () => {

  const [slideIndex, setSlideIndex] = useState(0)
  const [open, setOpen] = useState(false)

  const handleOpen = (i) => {
    setSlideIndex(i)
    setOpen(true)
  }

const handleArrow = (direction) => {
  let newSlideNumber;

  if(direction === 'l'){
    newSlideNumber = slideIndex === 0 ? 5 : slideIndex-1
  } else{
    newSlideNumber = slideIndex === 0 ? 5 : slideIndex+1
  }
  setSlideIndex(newSlideNumber)
}


  return ( 
    <div className='hotel'>
      <Navbar/>
      <Header type="list"/>
      <div className="hotelContainer">
        {open && <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleArrow("l")}/>
            <div className="sliderWrapper">
              <img src={photos[slideIndex].src} alt="" className='sliderImg' />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleArrow("r")}/>
          </div>
          }
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Grand Hotel</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>Elton St 125 New york</span>
          </div>
          <span className="hotelDistance">
            Excellent location - 500 from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over $114 at this property and age a free airport taxi
          </span>
          <div className="hotelImages">
              {photos.map((photo, i) => (
                <div className="hotelImgWrapper">
                  <img onClick={() => handleOpen(i)} src={photo.src} alt="" className='hotelImg'/>
                </div>
              ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of Krakow</h1>
              <p className="hotelDesc">
              The Golden Bean Hotel is a stylish hotel close to the heart of Kumasi. 
              Offering 51 rooms in four different configurations, 
              the Golden Bean is small enough to give personal attention to every guest , 
              and yet large enough to cater for up to 1,000 people either as a banquet, 
              conference or any other event. The hotel features a restaurant, 
              a patisserie and inside bar, with two additional bars outside, 
              one by the swimming pool and the other, by the immaculate gardens.  
              There is a fully equipped gym onsite.
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 9-night stay!</h1>
              <span>
                Located in the real heart of Kumasi, 
                this property has an excellent location score of 9.8!
              </span>
              <h2>
                <b>$100</b> (9 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
    </div>
  )
}

export default Hotel