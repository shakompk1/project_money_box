let showBlock = document.querySelector(".showBlock");
let addBlock = document.querySelector('.closeAddBlock');
let loading = document.querySelector('.loadingClose');
let form = document.querySelector('.formHide');

showBlock.addEventListener("click", function () {
    this.previousSibling.play()
    addBlock.classList.toggle('openAddBlock');
    loading.classList.toggle('loadingOpen');
    form.classList.toggle('formShow')
    console.log(showBlock.innerHTML)
    if (showBlock.innerHTML == '&lt;&lt;&lt;') {
        showBlock.innerHTML = '>>>';
    } else {
        showBlock.innerHTML = '<<<';
    }
})
class creatElement {
    constructor() {

    }
}