function newPage(endpoint) {
  // Send a fetch request to the endpoint
  fetch(endpoint)
    .then(response => {
      // Handle the response, e.g., redirect to the endpoint page
      if (response.ok) {
        window.location.href = endpoint;
      } else {
        // Handle errors, e.g., display an error message
        console.error('Error fetching '+endpoint+' page');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
