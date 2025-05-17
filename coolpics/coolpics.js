let menu = document.querySelector("#menu");
let button = document.querySelector(".menu");
button.addEventListener("click", function() {
   menu.classList.toggle("hidden");
});

window.addEventListener("resize", function(){
    if (window.innerWidth > 1000){
        menu.classList.remove("hidden");
    } else {
        menu.classList.add("hidden");
    }
});
let gallery = document.querySelector('.gallery');

function viewerTemplate(src, alt) {
    return `
      <img src="${src}" alt="${alt}">
      <button class="close-viewer">X</button>
    `;
  }
gallery.addEventListener("click", function(event) {

    const smallSrc = event.target.getAttribute('src');
    const altText = event.target.getAttribute('alt');
    const baseName = smallSrc.split('-')[0];
    const fullSrc = `${baseName}-full.jpeg`;

    let dialog = document.createElement('dialog')
    dialog.innerHTML = viewerTemplate(fullSrc, altText);
    document.body.appendChild(dialog)
    dialog.showModal();

    dialog.querySelector('.close-viewer').addEventListener('click', () => {
        dialog.close();
        dialog.remove();
    });

    dialog.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.close();
            dialog.remove();
        }
    });
});
