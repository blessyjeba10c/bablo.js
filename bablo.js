const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');
const captureButton = document.getElementById('captureButton');
const videoElement = document.getElementById('videoElement');
const canvasElement = document.getElementById('canvasElement');
const postPhotoButton = document.getElementById('postPhotoButton');
const postedPhotos = document.getElementById('postedPhotos');

let stream;
let imageURL;

// Function to post a note
function postNote() {
  const newNote = noteInput.value.trim();
  if (newNote !== '') {
    const noteElement = document.createElement('div');
    noteElement.textContent = newNote;
    notesList.appendChild(noteElement);
    noteInput.value = '';
  }
}

// Access the user's camera
navigator.mediaDevices.getUserMedia({ video: true })
  .then(mediaStream => {
    stream = mediaStream;
    videoElement.srcObject = mediaStream;
  })
  .catch(err => {
    console.error('Error accessing the camera: ', err);
  });

// Capture photo from video stream
captureButton.addEventListener('click', () => {
  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  canvasElement.getContext('2d').drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
  imageURL = canvasElement.toDataURL('image/png');
  postPhotoButton.disabled = false;
});

// Post captured photo
postPhotoButton.addEventListener('click', () => {
  const imgElement = document.createElement('img');
  imgElement.src = imageURL;
  postedPhotos.appendChild(imgElement);
  postPhotoButton.disabled = true;
});
