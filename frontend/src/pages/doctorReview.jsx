import React from "react";
import { useNavigate } from "react-router-dom";
import useUserProfile from "../../DoctorsPage/Initialpage";

const ReviewsPage = () => {
  const navigate=useNavigate();
    const { user, loading } = useUserProfile();

  if (!user) {
     navigate("/")
  }

  if (loading) {
     <div>Loading...</div>;
  }
  // Sample reviews data
  const reviews = [
    {
      id: 1,
      patientName: "John Doe",
      rating: 4,
      comment: "Great doctor, very knowledgeable and caring.",
      date: "2024-03-09",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      rating: 5,
      comment: "Highly recommend! Excellent service.",
      date: "2024-03-10",
    },
    {
      id: 3,
      patientName: "Jane Smith",
      rating: 1,
      comment: "Highly recommend! Excellent service.",
      date: "2024-03-10",
    },
    // Add more reviews as needed
  ];

  return (
    // <div className="container mx-auto px-4 py-8">
    //   <h1 className="text-2xl font-bold mb-4">Doctor Reviews</h1>
    //   <div className="grid grid-cols-1 gap-4">
    //     {reviews.map((review) => (
    //       <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
    //         <div className="flex justify-between mb-2">
    //           <span className="text-lg font-semibold">
    //             {review.patientName}
    //           </span>
    //           <span className="text-gray-500">{review.date}</span>
    //         </div>
    //         <div className="flex items-center mb-2">
    //           <span className={`text-lg text-yellow-500`}>
    //             {[...Array(review.rating)].map((_, index) => (
    //               <svg
    //                 key={index}
    //                 className="w-6 h-6 fill-current"
    //                 xmlns="http://www.w3.org/2000/svg"
    //                 viewBox="0 0 20 20"
    //               >
    //                 <path
    //                   fillRule="evenodd"
    //                   d="M9.158 1.865c.16-.49.84-.49 1 0l2.225 6.854a.543.543 0 0 0 .485.372l7.236.453c.539.034.76.728.349 1.09l-5.898 4.287a.53.53 0 0 0-.18.813l2.13 6.787c.267.86-.696 1.57-1.345 1.09l-5.83-4.195a.53.53 0 0 0-.617 0l-5.83 4.195c-.65.48-1.613-.23-1.345-1.09l2.13-6.787a.53.53 0 0 0-.18-.813L1.29 10.674a.73.73 0 0 0 .348-1.09l7.236-.453a.543.543 0 0 0 .486-.372L9.158 1.865z"
    //                 />
    //               </svg>

    //             ))}
    //           </span>
    //         </div>
    //         <p className="text-gray-700">{review.comment}</p>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Doctor Reviews</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-semibold">
                {review.patientName}
              </span>
              <span className="text-gray-500">{review.date}</span>
            </div>
            <div className="flex items-center mb-4">
              <span className={`text-lg text-yellow-500 flex felx-col`}>
                {[...Array(review.rating)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-8 h-8 fill-current text-yellow-500 mr-1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.158 1.865c.16-.49.84-.49 1 0l2.225 6.854a.543.543 0 0 0 .485.372l7.236.453c.539.034.76.728.349 1.09l-5.898 4.287a.53.53 0 0 0-.18.813l2.13 6.787c.267.86-.696 1.57-1.345 1.09l-5.83-4.195a.53.53 0 0 0-.617 0l-5.83 4.195c-.65.48-1.613-.23-1.345-1.09l2.13-6.787a.53.53 0 0 0-.18-.813L1.29 10.674a.73.73 0 0 0 .348-1.09l7.236-.453a.543.543 0 0 0 .486-.372L9.158 1.865z"
                      />
                    </svg>             
                ))}
              </span>
              <span className="text-gray-700">{review.comment}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;
