const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

// Create loading & error divs
const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.textContent = "Loading...";
loadingDiv.style.display = "none";

const errorDiv = document.createElement("div");
errorDiv.id = "error";
errorDiv.style.color = "red";

document.body.insertBefore(loadingDiv, output);
document.body.insertBefore(errorDiv, output);

// Image list
const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download one image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load ${url}`);
  });
}

// Main function
function downloadImages() {
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((imgs) => {
      loadingDiv.style.display = "none";

      imgs.forEach(img => output.appendChild(img));
    })
    .catch((err) => {
      loadingDiv.style.display = "none";
      errorDiv.textContent = err;
    });
}

// Trigger on button click
btn.addEventListener("click", downloadImages);