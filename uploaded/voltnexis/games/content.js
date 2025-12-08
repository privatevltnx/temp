if (location.href.includes("chrome://dino")) {
  document.documentElement.innerHTML = ""; // Clear page
  let iframe = document.createElement("iframe");
  iframe.src = chrome.runtime.getURL("index.html");
  iframe.style.position = "fixed";
  iframe.style.top = "0";
  iframe.style.left = "0";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none";
  document.body.appendChild(iframe);
}
