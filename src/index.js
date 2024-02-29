// index.js
let currentRamen = null; // Add this line at the top of your script

// Callbacks
const handleClick = (ramen) => {
  // Update the currentRamen variable
  currentRamen = ramen;

  const ramenDetailDiv = document.getElementById('ramen-detail');

  // Create elements dynamically
  const detailImage = ramenDetailDiv.querySelector('.detail-image');
  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;

  const nameElement = ramenDetailDiv.querySelector('.name');
  nameElement.textContent = ramen.name;

  const restaurantElement = ramenDetailDiv.querySelector('.restaurant');
  restaurantElement.textContent = ramen.restaurant;

  // Select rating and comment elements by their IDs and update their text content
  const ratingDisplay = document.getElementById('rating-display');
  ratingDisplay.textContent = ramen.rating;

  const commentDisplay = document.getElementById('comment-display');
  commentDisplay.textContent = ramen.comment;
};


const addSubmitListener = () => {
  // Select the new-ramen form
  const newRamenForm = document.getElementById('edit-ramen');

  // Attach a submit event listener to the form
  newRamenForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the form inputs
    const updatedRamenRating = document.getElementById('updated-rating').value;
    const updatedRamenComment = document.getElementById('updated-comment').value;

    // Update the current ramen's properties
    if (currentRamen) {
      currentRamen.rating = updatedRamenRating;
      currentRamen.comment = updatedRamenComment;

      // Update the display
      handleClick(currentRamen);
    }
  });
};

const displayRamens = async () => {
  try {
    // Fetch the list of ramen objects from the server using a GET request.
    const response = await fetch('http://localhost:3000/ramens');

    // Check if the response is successful (status code in the range 200-299).
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    // Parse the response as JSON.
    const ramens = await response.json();

    // Select the #ramen-menu div.
    const ramenMenuDiv = document.getElementById('ramen-menu');

    // Clear any existing content inside the #ramen-menu div.
    ramenMenuDiv.innerHTML = '';

    // For each ramen object:
    ramens.forEach(ramen => {
      // Create an image element with the src attribute set to the ramen's image path.
      const imageElement = document.createElement('img');
      // Set the src attribute to the ramen's image path.
      imageElement.src = `${ramen.image}`;
      imageElement.alt = ramen.name; // Set alt attribute to provide alternative text.

      // Append the image element to the #ramen-menu div.
      ramenMenuDiv.appendChild(imageElement);

      // Attach a click event listener to each image.
      imageElement.addEventListener('click', () => handleClick(ramen));
    });

    // Display the first ramen details on page load
    if (ramens.length > 0) {
      handleClick(ramens[0]);
    }
  } catch (error) {
    console.error('Error fetching ramen data:', error);
  }

  // Invoke addSubmitListener here 
  addSubmitListener();
};


const main = () => {
  // Invoke displayRamens after the DOM has fully loaded.
  document.addEventListener('DOMContentLoaded', displayRamens);
};

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
