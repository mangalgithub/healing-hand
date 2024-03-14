import React, { useState } from "react";
import Rating from "react-rating-stars-component";

export default function FeedbackForm() {
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here, e.g., send data to backend
    console.log("Rating:", rating);
    console.log("Title:", title);
    console.log("Review:", review);
    // Reset form after submission
    setRating(0);
    setTitle("");
    setReview("");
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 px-6 py-4">
        <h2 className="text-2xl font-semibold text-white">Leave a Review</h2>
      </div>
      <div className="bg-white px-6 py-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              className="mt-1 block w-full px-4 py-2 bg-blue-200 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter title..."
            />
          </div>
          <div className="mb-6">
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating
            </label>
            <Rating
              count={5}
              size={40}
              value={rating}
              onChange={handleRatingChange}
              activeColor="#ffd700"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Review
            </label>
            <textarea
              id="review"
              value={review}
              onChange={handleReviewChange}
              rows={4}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Write your review here..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Review
          </button>
        </form>
      </div>
    </div>
  );
}
