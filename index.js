let stickyNotes = {
  notes: ['Your first note!'],
  addNote: function(note) {
    this.notes.push(note);
  },
  deleteNote: function(index) {
    this.notes.splice(index, 1);
  }
}

const displayNotes = () =>{
  const notesSection = document.querySelector('.notes');
  stickyNotes.notes.forEach((note) => {
    let noteDiv = document.createElement('div');
    notesSection.appendChild(noteDiv);

    let noteP = document.createElement('p');
    noteP.textContent = note;
    notesSection.appendChild(noteP);

    let noteTrash = document.createElement('i');
    noteTrash.classList.add('fas', 'fa-trash-alt');
    notesSection.appendChild(noteTrash);
  });
}

displayNotes();

const addNoteBtn = document.getElementById('add-note-btn');
addNoteBtn.addEventListener('click', () => {
  const colorInputValue = document.querySelector('[type="color"]').value;
  console.log(colorInputValue);
})