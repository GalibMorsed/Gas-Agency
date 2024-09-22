const max_cylinders = 12;
const storage_count = "cylinderCount";
const booking_history_key = "bookingHistory";
const system_code_key = "systemCode"; // New key for storing the system code

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
    const area = document.getElementById("area").value;
    const zip = document.getElementById("zip").value;
    const quantity = parseInt(document.getElementById("quantity").value);

    // Generate a system code
    const systemCode = generateSystemCode();
    localStorage.setItem(system_code_key, systemCode); // Store the generated code in localStorage

    const booking = {
      name,
      phone,
      cylinderType,
      area,
      zip,
      quantity,
      systemCode,
      date: new Date().toLocaleString(),
    };

    update_request(quantity);

    update_booking_history(booking);

    display_value();
  });

// Function to generate a system code
function generateSystemCode() {
  return +Date.now() + "-" + Math.floor(Math.random() * 10000);
}

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
  const area = localStorage.getItem("AREA");
  const zip = localStorage.getItem("ZIP");

  document.getElementById("nameDisplay").innerText = `Name: ${name}`;
  document.getElementById("phoneDisplay").innerText = `Phone: ${phone}`;
  document.getElementById(
    "cylinderTypeDisplay"
  ).innerText = `Cylinder Type: ${cylinderType}`;
  document.getElementById("areaDisplay").innerText = `Area: ${area}`;
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
      Area: ${booking.area}<br>
      ZIP Code: ${booking.zip}<br>
      Date: ${booking.date}<br>
      System Code: ${booking.systemCode}<br><br>`;
    historyList.appendChild(listItem);
  });

  const orderHistoryContainer = document.querySelector(".order-history");
  orderHistoryContainer.innerHTML = "<h2>Order History</h2>";
  orderHistoryContainer.appendChild(historyList);
}

window.onload = display_value;
