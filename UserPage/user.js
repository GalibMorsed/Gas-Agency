window.onload = function () {
  const notices = JSON.parse(localStorage.getItem("adminNotices")) || [];
  const noticesContainer = document.getElementById("noticeText");

  if (notices.length > 0) {
    noticesContainer.innerHTML = notices
      .map((notice) => `<p>${notice}</p>`)
      .join("");
  } else {
    noticesContainer.innerText = "No notices at the moment.";
  }
};
