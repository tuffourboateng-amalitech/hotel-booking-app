import React from 'react'
import './FeaturedProperties.css'
import goldenImage from '../../images/goldenImage.jpeg'
const FeaturedProperties = () => {
  return (
    <div className='fProperties'>
        <div className="fPropertiesItem">
        <img src={goldenImage} alt="" className="fPropertiesImg" />
        <span className="fpName">Golden Bean Hotel</span>
        <span className="fpCity">Kumasi</span>
        <span className='fpPrice'>Starting from $50</span>
        <div className="fpRating">
            <button>5.0</button>
            <span>Excellent</span>
        </div>
        </div>

        <div className="fPropertiesItem">
        <img src={goldenImage} alt="" className="fPropertiesImg" />
        <span className="fpName">Golden Bean Hotel</span>
        <span className="fpCity">Kumasi</span>
        <span className='fpPrice'>Starting from $50</span>
        <div className="fpRating">
            <button>5.0</button>
            <span>Excellent</span>
        </div>
        </div>

        <div className="fPropertiesItem">
        <img src={goldenImage} alt="" className="fPropertiesImg" />
        <span className="fpName">Golden Bean Hotel</span>
        <span className="fpCity">Kumasi</span>
        <span className='fpPrice'>Starting from $50</span>
        <div className="fpRating">
            <button>5.0</button>
            <span>Excellent</span>
        </div>
        </div>

        <div className="fPropertiesItem">
        <img src={goldenImage} alt="" className="fPropertiesImg" />
        <span className="fpName">Golden Bean Hotel</span>
        <span className="fpCity">Kumasi</span>
        <span className='fpPrice'>Starting from $50</span>
        <div className="fpRating">
            <button>5.0</button>
            <span>Excellent</span>
        </div>
        </div>
    </div>
  )
}

export default FeaturedProperties