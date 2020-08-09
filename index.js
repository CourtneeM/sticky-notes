let stickyNotes = {
  notes: [],
  addNote: function(description, color) {
    this.notes.push({description, color});
    localStorageHandler.storeNotes({description, color});
  },
  deleteNote: function(index) {
    localStorageHandler.removeNotes(index);
    this.notes.splice(index, 1);
  }
}

const displayNotes = () =>{
  const notesSection = document.querySelector('.notes');

  if (notesSection.firstChild) {
    while (notesSection.firstChild) {
      notesSection.removeChild(notesSection.firstChild);
    }
  }

  stickyNotes.notes.forEach((note) => {
    let noteDiv = document.createElement('div');
    noteDiv.style.backgroundColor = note.color;
    notesSection.appendChild(noteDiv);

    let noteP = document.createElement('p');
    noteP.textContent = note.description;
    noteDiv.appendChild(noteP);

    let noteTrash = document.createElement('i');
    noteTrash.classList.add('far', 'fa-trash-alt');
    noteDiv.appendChild(noteTrash);
  });
}

const buttonHandler = (() => {
  const addNoteBtn = document.getElementById('add-note-btn');
  
  addNoteBtn.addEventListener('click', () => {
    const userInputTextarea = document.querySelector('textarea');
    const colorInputValue = document.querySelector('[type="color"]').value;
    stickyNotes.addNote(userInputTextarea.value, colorInputValue);
    displayNotes();
    userInputTextarea.value = "";
  });

  const notesSection = document.querySelector('.notes');
  notesSection.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash-alt')) {
      let index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
      stickyNotes.deleteNote(index);
      displayNotes();
    }
  });
})();


const localStorageHandler = (() => {
  const storeNotes = (note) => {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = stickyNotes.notes;
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
      notes.push(note);
    }
  
    localStorage.setItem('notes', JSON.stringify(notes));
  };

  const getNotes = () => {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = stickyNotes.notes;
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    
    stickyNotes.notes = notes;
    
    const notesSection = document.querySelector('.notes');
    if (notesSection.firstChild) {
      while (notesSection.firstChild) {
        notesSection.removeChild(notesSection.firstChild);
      }
    }
  
    notes.forEach((note) => {
      let noteDiv = document.createElement('div');
      noteDiv.style.backgroundColor = note.color;
      notesSection.appendChild(noteDiv);
  
      let noteP = document.createElement('p');
      noteP.textContent = note.description;
      noteDiv.appendChild(noteP);
  
      let noteTrash = document.createElement('i');
      noteTrash.classList.add('far', 'fa-trash-alt');
      noteDiv.appendChild(noteTrash);
    });
  }

  const removeNotes = (index) => {
    let notes;
    if (localStorage.getItem('notes') === null) {
      notes = stickyNotes.notes;
    } else {
      notes = JSON.parse(localStorage.getItem('notes'));
    }
  
    const noteDescription = notes[index].description;
    notes.forEach((note) => {
      if (note.description === noteDescription) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
      }
    })
  }

  return {
    storeNotes,
    getNotes,
    removeNotes
  }

})();

document.addEventListener('DOMContentLoaded', localStorageHandler.getNotes);
displayNotes();