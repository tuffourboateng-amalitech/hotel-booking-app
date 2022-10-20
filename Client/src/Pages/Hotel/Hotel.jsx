import React, { useContext, useState } from 'react'
import Navbar from "../../Components/Navbar/Navbar";
import Header from "../../Components/Header/Header";
import {photos} from '../../photos/photos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import MailList from '../../Components/MailList/MailList'
import Footer from '../../Components/Footer/Footer'
import './Hotel.css'
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../Hooks/useFetch';
import { SearchContext } from '../../context/SearchContext';
import { AuthContext } from '../../context/AuthContext';
import Reserve from '../../Components/Reserve/Reserve';

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideIndex, setSlideIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const{data, loading, error} = useFetch(`/hotels/${id}`)
  const{user} = useContext(AuthContext)
  const navigate = useNavigate()

  const {dates, options} = useContext(SearchContext)


  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24
  
  const dayDifference=(date1, date2) => {
      const timeDiff = Math.abs(date2.getTime() - date1.getTime());
      const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY)
      return diffDays
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)


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

const handleClick = () => {
  if(user){
    setOpenModal(true)
  } else{
    navigate('/login')
  }
}

  return ( 
    <div className='hotel'>
      <Navbar/>
      <Header type="list"/>
     { loading ? "loading" : 
     
        (<div className="hotelContainer">
            {open && <div className="slider">
                <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)}/>
                <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleArrow("l")}/>
                <div className="sliderWrapper">
                  <img src={data.photos[slideIndex]} alt="" className='sliderImg' />
                </div>
                <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleArrow("r")}/>
              </div>
              }
            <div className="hotelWrapper">
              <button className="bookNow">Reserve or Book Now!</button>
              <h1 className="hotelTitle">{data.name}</h1>
              <div className="hotelAddress">
                <FontAwesomeIcon icon={faLocationDot}/>
                <span>{data.address}</span>
              </div>
              <span className="hotelDistance">
                {data.distance}
              </span>
              <span className="hotelPriceHighlight">
                Book a stay over {data.price} at this property and age a free airport taxi
              </span>
              <div className="hotelImages">
                  {data.photos?.map((photo, i) => (
                    <div className="hotelImgWrapper">
                      <img onClick={() => handleOpen(i)} src={photo} alt="" className='hotelImg'/>
                    </div>
                  ))}
              </div>
              <div className="hotelDetails">
                <div className="hotelDetailsTexts">
                  <h1 className="hotelTitle">{data.title}</h1>
                  <p className="hotelDesc">
                  {data.description}
                  </p>
                </div>
                <div className="hotelDetailsPrice">
                  <h1>Perfect for a {days}-night stay!</h1>
                  <span>
                    Located in the real heart of Kumasi, 
                    this property has an excellent location score of 9.8!
                  </span>
                  <h2>
                    <b>${days * data.price * options.room}</b> ({days}{" "} nights)
                  </h2>
                  <button onClick={handleClick}>Reserve or Book Now!</button>
                </div>
              </div>
            </div>
            <MailList/>
            <Footer/>
          </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
    </div>
  )
}

export default Hotel