function getBookingRequests() {
  return JSON.parse(localStorage.getItem("bookingHistory")) || [];
}

function displayBookingRequests() {
  const bookingTableBody = document.querySelector("#booking-requests tbody");
  bookingTableBody.innerHTML = "";

  const bookingRequests = getBookingRequests();

  bookingRequests.forEach((request, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${request.name}</td>
                    <td>${request.phone}</td>
                    <td>${request.cylinderType}</td>
                    <td>${request.area}</td>
                    <td>${request.systemCode}</td>
                `;
    bookingTableBody.appendChild(row);
  });
}

function completeDelivery(systemCode) {
  let bookingRequests = getBookingRequests();

  // Find the index of the request with the matching system code
  const requestIndex = bookingRequests.findIndex(
    (request) => request.systemCode === systemCode
  );

  if (requestIndex > -1) {
    // Remove the request from the array
    bookingRequests.splice(requestIndex, 1);

    // Update localStorage with the new array
    localStorage.setItem("bookingHistory", JSON.stringify(bookingRequests));

    // Inform the delivery boy and refresh the display
    alert(`Delivery completed and request removed.`);
    displayBookingRequests();
  } else {
    alert("Invalid System Code!");
  }
}

document
  .getElementById("deliveryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Fetch the entered code
    const enteredCode = document.getElementById("code").value;

    // Call the function to complete the delivery
    completeDelivery(enteredCode);
  });

// Display the booking requests when the page loads
displayBookingRequests();
