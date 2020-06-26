const formNew = document.forms[0];
formNew.addEventListener('submit', addBook)
formNew.addEventListener('change', checkIfFormHasTyped)
const inputTitle = formNew.querySelector('input#title');
const inputAuthor = formNew.querySelector('input#author');
const inputPages = formNew.querySelector('input#pages');

const myLibrary = [];

populateStorage()
render()

function Book (title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = false;
}

function cleanForm() {
  inputTitle.classList.remove('empty')
  inputAuthor.classList.remove('empty')
  inputPages.classList.remove('empty')
  inputTitle.value = ''
  inputAuthor.value = ''
  inputPages.value = ''
}

function addBook(e) {
e.preventDefault();
  if (inputTitle.value != "" && inputAuthor.value != "" && inputPages.value != "") {
    let newBook = new Book(inputTitle.value, inputAuthor.value, inputPages.value)
    myLibrary.unshift(newBook)
    localStorage.clear()
    for (let i = 0; i < myLibrary.length; i++) {
      localStorage.setItem(`title${i}`, myLibrary[i].title)
      localStorage.setItem(`author${i}`, myLibrary[i].author)
      localStorage.setItem(`pages${i}`, myLibrary[i].pages)
      localStorage.setItem(`read${i}`, myLibrary[i].read)
    }
    render();
    modal.style.display = "none";
    return cleanForm()
  } if (inputTitle.value == "") {
      inputTitle.classList.add('empty')
  } if (inputAuthor.value == "") {
      inputAuthor.classList.add('empty')
  } if (inputPages.value == "") {
      inputPages.classList.add('empty')
  }
}

function checkIfFormHasTyped() {
  if (inputTitle.classList.contains('empty') && inputTitle.value != "") {
      inputTitle.classList.remove('empty')
    }
    if (inputAuthor.classList.contains('empty') && inputAuthor.value != "") {
      inputAuthor.classList.remove('empty')
    }
    if (inputPages.classList.contains('empty') && inputPages.value != "") {
      inputPages.classList.remove('empty')
  }
}

function removeBook (e) {
  let index = e.path[0].dataset.id
  myLibrary.splice(parseInt(index), 1)
  localStorage.clear()
  for (let i = 0; i < myLibrary.length; i++) {
    localStorage.setItem(`title${i}`, myLibrary[i].title)
    localStorage.setItem(`author${i}`, myLibrary[i].author)
    localStorage.setItem(`pages${i}`, myLibrary[i].pages)
    localStorage.setItem(`read${i}`, myLibrary[i].read)
  }
  render()
}

function readStatus(e) {
  let index = parseInt(e.path[0].dataset.id)
  if (myLibrary[index].read) {
    myLibrary[index].read = false
    localStorage.setItem(`read${index}`, false)
    render()
  } else {
    myLibrary[index].read = true
    localStorage.setItem(`read${index}`, true)
    render()
  }
}

function cleanBooks () {
  let length = document.querySelectorAll('.book').length
  for (let i = 0; i < length; i++) {
      let frame = document.querySelector('.frame')
      let book = document.querySelector('.book')
      frame.removeChild(book)
  }
}

function populateStorage() {
  if(localStorage.length == 0) {
    myLibrary.push(new Book("Eloquent JavaScript", "Marijn Haverbeke", 448))
    myLibrary.push(new Book("Think Like a Programmer", "V. Anton Spraul", 260))
    for (let i = 0; i < myLibrary.length; i++) {
      localStorage.setItem(`title${i}`, myLibrary[i].title)
      localStorage.setItem(`author${i}`, myLibrary[i].author)
      localStorage.setItem(`pages${i}`, myLibrary[i].pages)
      localStorage.setItem(`read${i}`, myLibrary[i].read)
    }
  } else {
    for (var i = 0; i < localStorage.length / 4; i++) {
      let title = localStorage.getItem(`title${i}`)
      let author = localStorage.getItem(`author${i}`)
      let pages = localStorage.getItem(`pages${i}`)
      let read = localStorage.getItem(`read${i}`)

      myLibrary.push(new Book(`${title}`, `${author}`, `${pages}`))
      myLibrary[i].read = read
    }
  }
}

function render () {
  cleanBooks()
  let frame = document.querySelector(".frame");
  for (let i = 0; i < myLibrary.length; i++) {
    let divbook = document.createElement("div")
    divbook.setAttribute("class", "book")

    let divtitle = document.createElement("div")
    divtitle.setAttribute("class", "title")
    divtitle.appendChild(document.createTextNode(`${myLibrary[i].title}`));

    let divauthor = document.createElement("div")
    divauthor.setAttribute("class", "author")
    divauthor.appendChild(document.createTextNode(`${myLibrary[i].author}`));

    let divpages = document.createElement("div")
    divpages.setAttribute("class", "pages")
    divpages.appendChild(document.createTextNode(`${myLibrary[i].pages}`));

    let removebtn = document.createElement('span')
    removebtn.setAttribute("data-id", `${i}`)
    removebtn.setAttribute("class", `rm material-icons`)
    removebtn.appendChild(document.createTextNode('close'))

    let readstatus = document.createElement('span')
    readstatus.setAttribute("data-id", `${i}`)
    readstatus.setAttribute("class", `read ${myLibrary[i].read} material-icons`)
    readstatus.appendChild(document.createTextNode("done"))

    divbook.appendChild(removebtn);
    divbook.appendChild(divtitle);
    divbook.appendChild(divauthor);
    divbook.appendChild(readstatus);
    divbook.appendChild(divpages);
    if (!document.getElementById(`${i}`)) {
      frame.appendChild(divbook)
    }
    const removeEvent = document.querySelectorAll('.rm')
    removeEvent.forEach(btn => {
      btn.addEventListener('click', removeBook)
    })
    const readEvent = document.querySelectorAll('.read')
    readEvent.forEach(btn => {
      btn.addEventListener('click', readStatus)
    })
  }
}

const modal = document.getElementById("myModal");
const btn = document.getElementById("btnNew");
const span = document.getElementsByClassName("close")[0];

btn.onclick = () => {modal.style.display = "block";}

span.onclick = () => {modal.style.display = "none";}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
