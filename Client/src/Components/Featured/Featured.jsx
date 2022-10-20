import React from 'react'
import kumasiImage from '../../images/kumasiImage.jfif'
import accraImage from '../../images/accraImage.jfif'
import takoradiImage from '../../images/takoradiImage.jfif';
import './Featured.css';
import useFetch from '../../Hooks/useFetch';
const Featured = () => {
    const {data, loading, error} = useFetch("/countByCity?cities=kumasi,accra,takoradi")
    console.log(data)
//   return (
//     <div className='featured'>
//         {loading ? "loading please wait" : 
//         <>
//         <div className="featuredItem">
//         <img className="featuredImg" src={kumasiImage} alt="kumasi" />
//             <div className="featuredTitles">
//                 <h1>Kumasi</h1>
//                 <h2>{data.list[0]} properties</h2>
//             </div>
//         </div>
//         <div className="featuredItem">
//         <img className="featuredImg" src={accraImage} alt="kumasi" />
//             <div className="featuredTitles">
//                 <h1>Accra</h1>
//                 <h2>{data.list[1]} properties</h2>
//             </div>
//         </div>
//         <div className="featuredItem">
//         <img className="featuredImg" src={takoradiImage} alt="kumasi" />
//             <div className="featuredTitles">
//                 <h1>Takoradi</h1>
//                 <h2>{data.list[2]} properties</h2>
//             </div>
//         </div>
//         </>
//         }
//     </div>
//   )
}

export default Featured