function loadModel(callback) {
  let xhr = new XMLHttpRequest();

  xhr.open('GET', CONFIG.MODEL_PATH, true);
  xhr.send();
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }

    if (xhr.status === 200) {
      callback(xhr.responseText);
    } else {
      console.log(xhr.status + ': ' + xhr.statusText);
    }
  }
}

function loadImage(callback) {
  let img = new Image();
  img.src = CONFIG.TEXTURE_PATH;
  img.addEventListener('load', function() {
    callback(img);
  }, false);
}