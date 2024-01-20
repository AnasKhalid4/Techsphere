
import React ,{useEffect,useState}from 'react'
import "./Reviews.css"
import Star from './Star';
const Reviews = ({ProductID,reviewhandler}) => {
  const [customerrating, getcustomerrating] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3);
  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((response) => {
        return response.json();
      
      } 
      ) 
      .then((data) => {
        const productrating = data.filter(
          (customerreview) => customerreview.productid === ProductID
        );
       
        console.log(productrating);
        getcustomerrating(productrating);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleReviews(prev => prev + 3);
  };

  return (
    <section id="testimonials" aria-label="Rating & Reviews" class="bg-slate-50 py-20 sm:py-32">
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-2xl md:text-center">
      <h2 class="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">Rating & Reviews</h2>
   <button onClick={reviewhandler} class="group inline-flex w-52 mt-5 items-center justify-center rounded-md bg-violet-800 px-3 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-violet-600">

         Write Review
         <svg xmlns="http://www.w3.org/2000/svg" class="group-hover:ml-4 ml-1 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
       </button>
    </div>
    <ul role="list"
      class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
         {customerrating.slice(0, visibleReviews).map((item) => (
      <li>
     
        <ul role="list" class="flex flex-col gap-y-6 sm:gap-y-8">
          <li>
            <figure class="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
              <svg aria-hidden="true"
                width="105" height="78" class="absolute left-6 top-6 fill-slate-100">
                <path
                  d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z">
                </path>
              </svg>
              <blockquote class="relative">
                <p class="text-lg tracking-tight text-slate-900">{item.comment}</p>
              </blockquote>
              <figcaption class="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                  <div class="font-display font-bold text-base text-slate-900">{item.customerdata}</div>
                  <div class="font-display text-base text-slate-900">{item.currentdate}</div>
                </div>
                <div class="overflow-hidden rounded-full bg-slate-50">
                <Star stars={item.rating} />
                </div>
              </figcaption>
            </figure>
          </li>
        </ul>

      </li>
         ))}
      <li>
     
      </li>
      <li>
       
      </li>
    </ul>
  </div>
  <div class="flex justify-center mt-4">
          {visibleReviews < customerrating.length && (
            <button onClick={handleLoadMore} class="px-10 py-3 bg-violet-800 text-white shadow rounded-md hover:bg-violet-600">
              Load More
            </button>
          )}
        </div>
       
</section>
  )
}

export default Reviews
