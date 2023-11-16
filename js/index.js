import { chatFunction } from './chat.js';


document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("file-input");
  const resultDiv = document.getElementById("result");
  const transcribeButton = document.getElementById("transcribe-button");

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      resultDiv.textContent = 'File selected. Click "Transcribe" to begin.';
    } else {
      resultDiv.textContent = "No image selected.";
    }
  });

  transcribeButton.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (file) {
      processImage(file);
      resultDiv.textContent = "Transcribing...";
      
      
    } else {
      resultDiv.textContent = "No image selected.";
    }
  });

  async function processImage(imageFile) {
    var apiKey = ""; // Replace with your API key

    var formData = new FormData();
    formData.append("image", imageFile);
    $.ajax({
      method: "POST",
      url: "https://api.api-ninjas.com/v1/imagetotext",
      data: formData,
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      headers: {
        "X-Api-Key": apiKey, // Include the API key in the request headers
      },
      success: function (result) {
        if (Array.isArray(result)) {
          let extractedText = "";
          for (const element of result) {
            extractedText += element.text + "\n"; // Separate text elements with line breaks
          }

          resultDiv.textContent = extractedText;
          chatFunction(extractedText);
        } else {
          resultDiv.textContent = "No text found in the response.";
        }
      },
      error: function ajaxError(jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseText);
      },
    });
  }
});
