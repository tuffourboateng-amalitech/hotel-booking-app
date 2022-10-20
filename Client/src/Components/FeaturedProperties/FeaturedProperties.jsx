import React from 'react'
import './FeaturedProperties.css'
import goldenImage from '../../images/goldenImage.jpeg'
import useFetch from '../../Hooks/useFetch'
const FeaturedProperties = () => {
    const {data, loading, error} = useFetch('/hotels?featured=true&take=4')

  return (
    <div className='fProperties'>
        {loading ? "loading" : <>
        { data.map((item) => (
            <div className="fPropertiesItem" key={item.id}>
            <img src={item.photos[0]} alt="" className="fPropertiesImg" />
            <span className="fpName">{item.name}</span>
            <span className="fpCity">{item.city}</span>
            <span className='fpPrice'>Starting from {item.price}</span>
            
            {item.rating && <div className="fpRating">
                <button>{item.rating}</button>
                <span>Excellent</span>
            </div>
            }
            </div>
            
            ))}
        </>}
    </div>
  )
}

export default FeaturedProperties