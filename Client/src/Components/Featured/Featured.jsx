import React from 'react'
import kumasiImage from '../../images/kumasiImage.jfif'
import accraImage from '../../images/accraImage.jfif'
import takoradiImage from '../../images/takoradiImage.jfif';
import './Featured.css';
const Featured = () => {
  return (
    <div className='featured'>
        <div className="featuredItem">
        <img className="featuredImg" src={kumasiImage} alt="kumasi" />
            <div className="featuredTitles">
                <h1>Kumasi</h1>
                <h2>100 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
        <img className="featuredImg" src={accraImage} alt="kumasi" />
            <div className="featuredTitles">
                <h1>Accra</h1>
                <h2>150 properties</h2>
            </div>
        </div>
        <div className="featuredItem">
        <img className="featuredImg" src={takoradiImage} alt="kumasi" />
            <div className="featuredTitles">
                <h1>Takoradi</h1>
                <h2>60 properties</h2>
            </div>
        </div>
    </div>
  )
}

export default Featured