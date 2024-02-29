// index.js

// Our helpful assistant: currentRamen keeps track of the selected ramen
// JavaScript variables are containers for storing data values.
// Learn more about JavaScript variables: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#declarations
let currentRamen = null;

// Callbacks - where the magic happens

/**
 * Handle a click event on a ramen image.
 * @param {Object} ramen - The ramen object with all its delicious details.
 * JavaScript events are actions that can be detected by JavaScript.
 * Learn more about JavaScript events: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Events
 */
const handleClick = (ramen) => {
  // Update the currentRamen variable
  currentRamen = ramen;

  // Grab the ramen-detail div
  // document.getElementById is a method that gets the element that has the ID attribute with the specified value.
  // Learn more about document.getElementById: https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById
  const ramenDetailDiv = document.getElementById('ramen-detail');

  // Create elements dynamically
  // The Document Object Model (DOM) is a programming interface for web documents. It represents the structure of a document and allows programs to manipulate the document's structure, style, and content.
  // Learn more about the DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
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

// Time to listen for submissions

/**
 * Attach a submit event listener to the form for updating ramen details.
 * Event listeners are procedures in JavaScript that wait for an event to occur.
 * Learn more about event listeners: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
 */
const addSubmitListener = () => {
  // Find the new-ramen form
  const newRamenForm = document.getElementById('edit-ramen');

  // Listen for the magic submit event
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

// Time to display all the ramens

/**
 * Fetch and display the list of ramen objects on the page.
 * Fetch API provides a JavaScript interface for accessing and manipulating parts of the HTTP pipeline, such as requests and responses.
 * Learn more about Fetch API: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
 */
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

// Main function - the conductor of the symphony

/**
 * The maestro, orchestrating the entire ramen experience.
 * JavaScript functions are blocks of code designed to perform a particular task.
 * Learn more about JavaScript functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
 */
const main = () => {
  // Invoke displayRamens after the DOM has fully loaded
  // The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
  // Learn more about DOMContentLoaded event: https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event
  document.addEventListener('DOMContentLoaded', displayRamens);
};

// Start the symphony
main();

// Export functions for testing
// JavaScript modules are small units of independent, reusable code that is desired to be used as the building blocks in creating a JavaScript application.
// Learn more about JavaScript modules: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};