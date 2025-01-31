const imagePicker = document.querySelector(".img-preview input");
const imagePreview = document.querySelector(".img-preview img");

function updateImagePreview() {
  const files = imagePicker.files;

  if (!files || files.length === 0) {
    imagePreview.style.display = "none";
    return;
  }
  const pickedFile = files[0];
  imagePreview.src = URL.createObjectURL(pickedFile);
  imagePreview.style.display = "block";
}

imagePicker.addEventListener("change", updateImagePreview);
