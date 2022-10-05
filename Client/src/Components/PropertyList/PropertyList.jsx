import React from 'react';
import './PropertyList.css';
import hotelImage from '../../images/hotelImage.jpeg';
import apartmentImage from '../../images/apartmentImage.jpeg';
import resortImage from '../../images/resortImage.jpeg';
import villaImage from '../../images/villaImage.jpeg';


const PropertyList = () => {
  return (
    <div className='propList'>
        <div className="propListItem">
            <img src={hotelImage} alt="" className="propListImg" />
            <div className="propListTitles">
                <h1>Hotels</h1>
                <h2>300 hotels</h2>
            </div>
        </div>
        <div className="propListItem">
            <img src={apartmentImage} alt="" className="propListImg" />
            <div className="propListTitles">
                <h1>Apartments</h1>
                <h2>500 apartments</h2>
            </div>
        </div>
        <div className="propListItem">
            <img src={resortImage} alt="" className="propListImg" />
            <div className="propListTitles">
                <h1>Resorts</h1>
                <h2>150 resorts</h2>
            </div>
        </div>
        <div className="propListItem">
            <img src={villaImage} alt="" className="propListImg" />
            <div className="propListTitles">
                <h1>Villas</h1>
                <h2>200 villas</h2>
            </div>
        </div>
    </div>
  )
}

export default PropertyList