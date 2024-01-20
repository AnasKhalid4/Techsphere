import React,{useState,useEffect} from 'react'
import Star from './Star';
const SellerReview = ({SellerID}) => {
    const [sellerRating, getSellerRating] = useState([]);
useEffect(() => {
  fetch("http://localhost:5000/reviews")
    .then((response) => {
      return response.json();
    
    } 
    ) 
    .then((data) => {
      const SellerRating = data.filter(
        (SellerReviews) => SellerReviews.Sellerid === SellerID
      );
     
      console.log(SellerRating);
      getSellerRating(SellerRating);
    });
}, []);


const averageRating =
sellerRating.length > 0
  ? sellerRating.reduce((sum, review) => sum + Number(review.rating), 0) /
    sellerRating.length
  : 0;
console.log(averageRating)
  return (
    
      <div  style={{ textAlign: 'left' }}>
      <Star stars={averageRating}/>

    </div>
  )
}

export default SellerReview
