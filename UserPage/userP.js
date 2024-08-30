document.addEventListener("DOMContentLoaded", function () {
  loadUserDetails();

  document.getElementById("edit-button").addEventListener("click", function () {
    document.getElementById("details-container").style.display = "none";
    document.getElementById("edit-form").style.display = "block";
  });

  document.getElementById("save-button").addEventListener("click", function () {
    var name = document.getElementById("name-input").value;
    var phone = document.getElementById("phone-input").value;
    var email = document.getElementById("email-input").value;
    var address = document.getElementById("address-input").value;
    var area = document.getElementById("area-input").value;
    var house = document.getElementById("house-input").value;
    var city = document.getElementById("city-input").value;
    var pincode = document.getElementById("pincode-input").value;

    saveUserDetails(name, phone, email, address, area, house, city, pincode);

    document.getElementById("name").textContent = name;
    document.getElementById("phone").textContent = phone;
    document.getElementById("email").textContent = email;
    document.getElementById("address").textContent = address;
    document.getElementById("area").textContent = area;
    document.getElementById("house").textContent = house;
    document.getElementById("city").textContent = city;
    document.getElementById("pincode").textContent = pincode;

    document.getElementById("edit-form").style.display = "none";
    document.getElementById("details-container").style.display = "block";
  });

  document
    .getElementById("cancel-button")
    .addEventListener("click", function () {
      document.getElementById("edit-form").style.display = "none";
      document.getElementById("details-container").style.display = "block";
    });
});

function saveUserDetails(
  name,
  phone,
  email,
  address,
  area,
  house,
  city,
  pincode
) {
  localStorage.setItem("userName", name);
  localStorage.setItem("userPhone", phone);
  localStorage.setItem("userEmail", email);
  localStorage.setItem("userAddress", address);
  localStorage.setItem("userArea", area);
  localStorage.setItem("userHouse", house);
  localStorage.setItem("userCity", city);
  localStorage.setItem("userPincode", pincode);
}

function loadUserDetails() {
  var name = localStorage.getItem("userName");
  var phone = localStorage.getItem("userPhone");
  var email = localStorage.getItem("userEmail");
  var address = localStorage.getItem("userAddress");
  var area = localStorage.getItem("userArea");
  var house = localStorage.getItem("userHouse");
  var city = localStorage.getItem("userCity");
  var pincode = localStorage.getItem("userPincode");

  if (name) document.getElementById("name").textContent = name;
  if (phone) document.getElementById("phone").textContent = phone;
  if (email) document.getElementById("email").textContent = email;
  if (address) document.getElementById("address").textContent = address;
  if (area) document.getElementById("area").textContent = area;
  if (house) document.getElementById("house").textContent = house;
  if (city) document.getElementById("city").textContent = city;
  if (pincode) document.getElementById("pincode").textContent = pincode;

  if (name) document.getElementById("name-input").value = name;
  if (phone) document.getElementById("phone-input").value = phone;
  if (email) document.getElementById("email-input").value = email;
  if (address) document.getElementById("address-input").value = address;
  if (area) document.getElementById("area-input").value = area;
  if (house) document.getElementById("house-input").value = house;
  if (city) document.getElementById("city-input").value = city;
  if (pincode) document.getElementById("pincode-input").value = pincode;
}
