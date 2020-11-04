import React,{useState} from 'react'
import Axios from 'axios'

const Reviews = (props) => {
    const [review,setReview]=useState()
    
    const getReviews=()=>{
        Axios.get(`https://api.themoviedb.org/3/movie/${props.id}/reviews?api_key=99513a8369b9b5f2750aeee3e661a5ff&language=en-US&page=1`)
        .then((item)=>{
            setReview()
        })
    }
    
    return (
        <div>
            
        </div>
    )
}

export default Reviews
