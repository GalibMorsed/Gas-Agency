let notices = JSON.parse(localStorage.getItem("adminNotices")) || [];

function saveNotice() {
  const notice = document.getElementById("noticeInput").value.trim();
  if (notice) {
    notices.push(notice);
    localStorage.setItem("adminNotices", JSON.stringify(notices));
    document.getElementById("noticeInput").value = "";
    displayNotices();
    alert("Notice posted successfully!");
  } else {
    alert("Please enter a notice.");
  }
}
function displayNotices() {
  const noticesList = document.getElementById("notices-list");
  noticesList.innerHTML = "";

  notices.forEach((notice, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      ${notice} <button onclick="deleteNotice(${index})">Delete</button>
    `;
    noticesList.appendChild(listItem);
  });
}

function deleteNotice(index) {
  notices.splice(index, 1);
  localStorage.setItem("adminNotices", JSON.stringify(notices));
  displayNotices();
  alert("Notice deleted successfully!");
}

displayNotices();
