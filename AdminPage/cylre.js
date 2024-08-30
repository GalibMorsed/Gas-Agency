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
                <td>${request.cylinderType}</td>
                <td>
                    <select onchange="updateStatus(${index}, this.value)">
                        <option value="Pending" ${
                          request.status === "Pending" ? "selected" : ""
                        }>Pending</option>
                        <option value="Approved" ${
                          request.status === "Approved" ? "selected" : ""
                        }>Approved</option>
                        <option value="Rejected" ${
                          request.status === "Rejected" ? "selected" : ""
                        }>Rejected</option>
                    </select>
                </td>
            `;
    bookingTableBody.appendChild(row);
  });
}

function updateStatus(index, newStatus) {
  let bookingRequests = getBookingRequests();
  bookingRequests[index].status = newStatus;

  localStorage.setItem("bookingHistory", JSON.stringify(bookingRequests));

  alert(`Status updated to ${newStatus} for ${bookingRequests[index].name}`);
}

displayBookingRequests();
