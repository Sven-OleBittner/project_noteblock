let notes = [];
let trashNotes = [];

function initNotes() {
  notesFromStorage();
  trashNotesfromStorage();
  renderNotes();
}

function renderNotes() {
  let noteContainer = document.getElementById("notesContainer");
  noteContainer.innerHTML = "";

  if (notes != null) {
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
      noteContainer.innerHTML += getNoteTemplate(indexNote);
    }
  }
}

function notesToStorage() {
  let stringNotes = JSON.stringify(notes);
  localStorage.setItem("storageNotes", stringNotes);
}

function trashNotesToStorage() {
  let stringTrashNotes = JSON.stringify(trashNotes);
  localStorage.setItem("storageTrashNotes", stringTrashNotes);
}

function notesFromStorage() {
  let stringStorageNotes = localStorage.getItem("storageNotes");
  let storageNotes = JSON.parse(stringStorageNotes);

  if (storageNotes != null) {
    notes.push(storageNotes);
    renderNotes();
  }
}

function trashNotesfromStorage() {
  let stringStorageTrashNotes = localStorage.getItem("storageTrashNotes");
  let storageTrashNotes = JSON.parse(stringStorageTrashNotes);
  if (stringStorageTrashNotes != null) {
    for (
      let storageTrashNotesIndex = 0;
      storageTrashNotesIndex < storageTrashNotes.length;
      storageTrashNotesIndex++
    ) {
      trashNotes.push(storageTrashNotes[storageTrashNotesIndex]);
    }
    renderTrashNotes();
  }
}

function addNote() {
  let titleInputRef = document.getElementById("noteTitleInput");
  let noteInputRef = document.getElementById("noteContentInput");

  let titleInput = titleInputRef.value;
  let noteInput = noteInputRef.value;

  if (titleInput.length > 0 && noteInput.length > 0) {
    const note = { title: titleInput, note: noteInput };
    notes.push(note);
    notesToStorage();
    renderNotes();
    titleInputRef.value = "";
    noteInputRef.value = "";
  }
}

function switchNoteToTrash(indexNote) {
  let trashNote = notes.splice(indexNote, 1);
  trashNotes.push(trashNote[0]);
  localStorage.removeItem(indexNote);

  trashNotesToStorage();

  renderTrashNotes();
  renderNotes();
}

function renderTrashNotes() {
  let trashNoteContainer = document.getElementById("trashNotesContainer");
  trashNoteContainer.innerHTML = "";

  if (trashNotes != null) {
    for (
      let indexTrashNote = 0;
      indexTrashNote < trashNotes.length;
      indexTrashNote++
    ) {
      trashNoteContainer.innerHTML += getTrashNoteTemplate(indexTrashNote);
      trashNotesToStorage(indexTrashNote);
    }
  }
}

function deleteNote(indexTrashNote) {
  trashNotes.splice(indexTrashNote, 1);
  localStorage.removeItem(indexTrashNote);
  renderTrashNotes();
  renderNotes();
}

// notizen bearbeiten
