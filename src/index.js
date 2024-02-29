// index.js

// Callbacks
const handleClick = (ramen) => {
  // Update the ramen-detail div with the clicked ramen's details
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
  const newRamenForm = document.getElementById('new-ramen');

  // Attach a submit event listener to the form
  newRamenForm.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values from the form inputs
    const newRamenImage = document.getElementById('new-image').value;
    const newRamenName = document.getElementById('new-name').value;
    const newRamenRestaurant = document.getElementById('new-restaurant').value;
    const newRamenRating = document.getElementById('new-rating').value;
    const newRamenComment = document.getElementById('new-comment').value;

    // Create a new ramen div with these values
    const newRamenDiv = document.createElement('div');
    newRamenDiv.innerHTML = `<img src="${newRamenImage}" alt="${newRamenName}" />`;

    // Append the new ramen div to the #ramen-menu div
    const ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.appendChild(newRamenDiv);

    // Display the new ramen details as if it had been clicked
    handleClick({
      image: newRamenImage,
      name: newRamenName,
      restaurant: newRamenRestaurant,
      rating: newRamenRating,
      comment: newRamenComment
    });
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
  } catch (error) {
    console.error('Error fetching ramen data:', error);
  }

  // Invoke addSubmitListener here if needed
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
