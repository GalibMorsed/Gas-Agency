const max_cylinders = 12;
const storage_count = "cylinderCount";
const booking_history_key = "bookingHistory";

document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (!for_request()) {
      alert("You have reached the limit of 12 cylinders.");
      return;
    }

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const cylinderType = document.getElementById("cylinderType").value;
    const city = document.getElementById("city").value;
    const zip = document.getElementById("zip").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    const booking = {
      name,
      phone,
      cylinderType,
      city,
      zip,
      quantity,
      date: new Date().toLocaleString(),
    };

    update_request(quantity);

    update_booking_history(booking);

    display_value();
  });

function for_request() {
  const currentCount = parseInt(localStorage.getItem(storage_count)) || 0;
  const quantity = parseInt(document.getElementById("quantity").value) || 0;
  return currentCount + quantity <= max_cylinders;
}

function update_request(quantity) {
  const currentCount = parseInt(localStorage.getItem(storage_count)) || 0;
  localStorage.setItem(storage_count, currentCount + quantity);
}

function update_booking_history(booking) {
  let history = JSON.parse(localStorage.getItem(booking_history_key)) || [];
  booking.status = "Pending";
  history.push(booking);
  localStorage.setItem(booking_history_key, JSON.stringify(history));
}

function display_value() {
  const name = localStorage.getItem("NAME");
  const phone = localStorage.getItem("PHONE");
  const cylinderType = localStorage.getItem("CYLINDERTYPE");
  const city = localStorage.getItem("CITY");
  const zip = localStorage.getItem("ZIP");

  document.getElementById("nameDisplay").innerText = `Name: ${name}`;
  document.getElementById("phoneDisplay").innerText = `Phone: ${phone}`;
  document.getElementById(
    "cylinderTypeDisplay"
  ).innerText = `Cylinder Type: ${cylinderType}`;
  document.getElementById("cityDisplay").innerText = `City: ${city}`;
  document.getElementById("zipDisplay").innerText = `ZIP Code: ${zip}`;

  const history = JSON.parse(localStorage.getItem(booking_history_key)) || [];
  const historyList = document.createElement("ul");
  const lastBooking = history[history.length - 1];

  if (lastBooking && lastBooking.status === "Rejected") {
    document.getElementById("rejectionMessage").innerText =
      "Your last booking request was rejected. Please contact support.";
  }

  history.forEach((booking, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>Booking ${index + 1}</strong><br>
      Name: ${booking.name}<br>
      Phone: ${booking.phone}<br>
      Cylinder Type: ${booking.cylinderType}<br>
      City: ${booking.city}<br>
      ZIP Code: ${booking.zip}<br>
      Date: ${booking.date}<br><br>`;
    historyList.appendChild(listItem);
  });

  const orderHistoryContainer = document.querySelector(".order-history");
  orderHistoryContainer.innerHTML = "<h2>Order History</h2>";
  orderHistoryContainer.appendChild(historyList);
}

window.onload = display_value;
