import React from 'react';
import './PropertyList.css';
import {buildingType} from '../../image/imageType'
import useFetch from '../../Hooks/useFetch';


const PropertyList = () => {
    const {data, loading, error} = useFetch("/countByType")
    console.log(data)
  return (
    <div className='propList'>
        {loading ? ("loading please wait") : 
        <>
        {data && buildingType.map((img, i) => (
            <div className="propListItem" key={i}>
            <img src={img} alt="" className="propListImg" />
            <div className="propListTitles">
                <h1>{data[i]?.type}</h1>
                <h2>{data[i]?.count} {data[i]?.type}</h2>
            </div>
        </div>
        ))}
        </>
        }
    </div>
  )
}

export default PropertyList