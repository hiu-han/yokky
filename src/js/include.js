// *** 헤더, 푸터 등 돔 콘텐츠 로더
// document.addEventListener('DOMContentLoaded', function () {
//   const containers = document.querySelectorAll('.loaded-container');

//   containers.forEach((container) => {
//     const src = container.getAttribute('data-src');

//     if (src) {
//       fetch(src)
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error(`Failed to load ${src}`);
//           }
//           return response.text();
//         })
//         .then((html) => {
//           container.innerHTML = html;
//         })
//         .catch((error) => {
//           console.error('Error loading HTML:', error);
//           container.innerHTML = `<p style="color: red;">Failed to load content.</p>`;
//         });
//     }
//   });
// });

window.addEventListener('load', function () {
  var allElements = document.getElementsByTagName('*');
  Array.prototype.forEach.call(allElements, function (el) {
    var includePath = el.dataset.includePath;
    if (includePath) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          el.outerHTML = this.responseText;
        }
      };
      xhttp.open('GET', includePath, true);
      xhttp.send();
    }
  });
});
