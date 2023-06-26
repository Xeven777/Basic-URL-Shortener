
function shortenUrl() {
    var url = document.getElementById("url").value;
    var custom = document.getElementById("custom").value;
    var payload = custom ? { "long": url, "custom": custom, "useFallback": true } : { "input": url };
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://gotiny.cc/api");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            var data = JSON.parse(this.responseText);
            var short = data[0]['code'];
            var result = document.getElementById("result");
            result.innerHTML = "Shortened URL's unique code : " + short + "<br>";
            result.innerHTML += "<a href='https://gotiny.cc/" + short + "' target='_blank'>https://gotiny.cc/" + short + "</a><br>";
            var link = "https://gotiny.cc/" + short + "\n";
            var form = document.querySelector("form");
            form.reset();
            copyToClipboard(link);
            result.innerHTML += "Your URL is copied! Just paste it in the browser and reach your destination page! WooHOO!";
        } else if (this.readyState === XMLHttpRequest.DONE) {
            var result = document.getElementById("result");
            result.innerHTML = "Failed to create short URL. Error code: " + this.status;
        }
    };
    xhr.send(JSON.stringify(payload));
}

function copyToClipboard(text) {
    var input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    input.remove();
}

var form = document.querySelector("form");
form.addEventListener("submit", function (event) {
    event.preventDefault();
    shortenUrl();
});
