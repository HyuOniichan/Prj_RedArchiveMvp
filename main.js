'use strict'; 

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let codes = [];
if (localStorage.getItem("codes")) {
    codes = JSON.parse(localStorage.getItem("codes"));
} else {
    localStorage.setItem("codes", JSON.stringify(codes));
}

const showData = $('#data'); 
if (showData) {
    showData.innerHTML = JSON.stringify(codes); 
}

const codeCardList = $('#codeCardList');
const titleInput = $('#title');
const contentInput = $('#content');
const createCodeBtn = $('#createCodeBtn'); 


let title, content;
titleInput.addEventListener('change', e => title = e.target.value);
contentInput.addEventListener('change', e => content = e.target.value);

function createCode() {
    title = title.trim();
    content = content.trim();

    if (!title || !content) {
        alert('Please fill out the fields');
        return;
    }

    const newCode = {
        id: '' + Date.now(), 
        title: title,
        content: content,
        tags: [
            {
                name: "Japan"
            }
        ]
    }

    handleCreateCode(newCode);

}

function handleCreateCode(newCode) {
    codes.push(newCode);
    localStorage.setItem("codes", JSON.stringify(codes));
    render(); 
}

createCodeBtn.addEventListener('click', createCode); 

function deleteCode() {
    const deleteBtns = $$('button[data-id]'); 
    deleteBtns.forEach(deleteBtn => {
        deleteBtn.addEventListener('click', e => handleDeleteCode(e.target.getAttribute('data-id'))); 
    });
}

function handleDeleteCode(delId) {
    if (confirm('Delete this masterpiece?')) {
        codes = codes.filter(code => code.id !== delId); 
        localStorage.setItem("codes", JSON.stringify(codes)); 
        render(); 
    }
}

render();
function render() {
    let html = codes && codes.map(code => `
        <div class="card g-col-4" style="max-width: 280px;">
            <img src='./assets/images/logo.png' class="card-img-top w-25" alt="Thumbnail" />
            <div class="card-body">
                <h5 class="card-title">${code.title}</h5>
                <p class="card-text">${code.content}</p>
                <a href="https://www.youtube.com/watch?v=jeNdqkgRac0" class="btn btn-primary">Watch now</a>
            </div>
            <button type="button" class="btn-close position-absolute" style="top: 5px; right: 5px;" aria-label="Close" data-id="${code.id}"></button>
            </button>
        </div>
    `)
    codeCardList.innerHTML = html.join(''); 
    deleteCode(); 
}



