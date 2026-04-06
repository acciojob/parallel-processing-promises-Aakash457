const output = document.getElementById("output");

// Create additional UI containers
const loadingDiv = document.createElement("div");
loadingDiv.id = "loading";
loadingDiv.textContent = "Loading...";

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

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

// Main function to download all images
function downloadImages() {
  // Show loading
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = images.map(img => downloadImage(img.url));

  Promise.all(promises)
    .then((loadedImages) => {
      // Hide loading
      loadingDiv.style.display = "none";

      // Display images
      loadedImages.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch((error) => {
      // Hide loading
      loadingDiv.style.display = "none";

      // Show error
      errorDiv.textContent = error;
    });
}

// Call function (or attach to button if needed)
downloadImages();