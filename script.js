function shortenUrl() {
  let url = document.getElementById("url").value;
  let custom = document.getElementById("custom").value;
  const payload = custom ? { long: url, custom: custom, useFallback: true } : { input: url };

  fetch("https://gotiny.cc/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to create short URL. Error code: " + response.status);
      }
    })
    .then((data) => {
      const short = data[0].code;
      const link = `https://gotiny.cc/${short}`;

      displayResult(short, link);
      copyToClipboard(link);
    })
    .catch((error) => {
      displayError(error.message);
    });
}

function displayResult(short, link) {
  const result = document.getElementById("result");
  result.innerHTML = `Shortened URL's unique code: ${short}<br>`;
  result.innerHTML += `<a href="${link}" target="_blank">${link}</a><br>`;
  result.innerHTML += "Your URL is copied! Just paste it in the browser and reach your destination page! WooHOO!";
}

function displayError(errorMessage) {
  const result = document.getElementById("result");
  result.textContent = errorMessage;
}

function copyToClipboard(text) {
  const input = document.createElement("textarea");
  input.value = text;
  document.body.appendChild(input);
  input.select();
  document.execCommand("Copy");
  input.remove();
}

const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  shortenUrl();
});
