const allNotes = {
  notesTitle: [],
  notesArchiveTitle: [],
  notesTrashTitle: [],
  notes: [],
  notesArchive: [],
  notesTrash: [],
};

function renderAllNotes() {
  renderNotes();
  renderArchiveNotes();
  renderTrashNotes();
}

function allNotesToStorage() {
  notesToStorage();
  archivNotesToStorage();
  trashNoteToStorage();
}

function switchNote(indexNote, startKey, destinationKey) {
  let note = allNotes[startKey].splice(indexNote, 1);
  let noteTitle = allNotes[startKey + "Title"].splice(indexNote, 1);
  allNotes[destinationKey].push(note[0]);
  allNotes[destinationKey + "Title"].push(noteTitle[0]);
  allNotesToStorage();
  renderAllNotes();
}

function initNotes() {
  notesFromStorage();
  archivNotesFromStorage();
  trashNotesFromStorage();
}

// function renderAllNotes(id, indexNote, noteKey) {
//   let noteContainerRef = document.getElementById(id);
//   noteContainerRef = "";
//   for (let indexNote = 0; indexNote < allNotes[noteKey].length; indexNote++) {
//     noteContainerRef.innerHTML += getNoteTemplates(indexNote, noteKey);
//   }
// }

// function getNoteTemplates(indexNote, noteKey) {
//   if (noteKey === "notesTitle") {
//     getNoteTemplate(indexNote);
//   } else if (noteKey === "notesArchiveTitle") {
//     getArchiveNoteTemplate(indexNote);
//   } else if (noteKey === "notesTrashTitle") {
//     trashNoteToStorage(indexNote);
//   }
// }

function renderNotes() {
  let noteContainerRef = document.getElementById("notesContainer");
  noteContainerRef.innerHTML = "";
  for (let noteIndex = 0; noteIndex < allNotes.notesTitle.length; noteIndex++) {
    noteContainerRef.innerHTML += getNoteTemplate(noteIndex);
  }
}

function renderArchiveNotes() {
  let noteArchivContainerRef = document.getElementById("archiveNotesContainer");
  noteArchivContainerRef.innerHTML = "";
  for (
    let noteArchiveIndex = 0;
    noteArchiveIndex < allNotes.notesArchiveTitle.length;
    noteArchiveIndex++
  ) {
    noteArchivContainerRef.innerHTML +=
      getArchiveNoteTemplate(noteArchiveIndex);
  }
}

function renderTrashNotes() {
  let noteTrashContainerRef = document.getElementById("trashNotesContainer");
  noteTrashContainerRef.innerHTML = "";
  for (
    let trashNoteIndex = 0;
    trashNoteIndex < allNotes.notesTrashTitle.length;
    trashNoteIndex++
  ) {
    noteTrashContainerRef.innerHTML += getTrashNoteTemplate(trashNoteIndex);
    trashNoteToStorage(trashNoteIndex);
  }
}

function addNote() {
  let noteTitleRef = document.getElementById("noteTitleInput");
  let noteContentRef = document.getElementById("noteContentInput");
  let noteTitle = noteTitleRef.value;
  let noteContent = noteContentRef.value;
  if (noteTitle != "" && noteContent != "") {
    allNotes.notesTitle.push(noteTitle);
    allNotes.notes.push(noteContent);
    notesToStorage();
    noteTitleRef.value = "";
    noteContentRef.value = "";
  }
  renderAllNotes();
}

function deleteNote(trashNoteIndex) {
  allNotes.notesTrashTitle.splice(trashNoteIndex, 1);
  allNotes.notesTrash.splice(trashNoteIndex, 1);
  trashNoteToStorage();
  renderTrashNotes();
}

function notesToStorage() {
  let stringNoteTitle = JSON.stringify(allNotes.notesTitle);
  let stringNoteContent = JSON.stringify(allNotes.notes);
  localStorage.setItem("title", stringNoteTitle);
  localStorage.setItem("content", stringNoteContent);
}

function archivNotesToStorage() {
  let stringNoteTitle = JSON.stringify(allNotes.notesArchiveTitle);
  let stringNoteContent = JSON.stringify(allNotes.notesArchive);
  localStorage.setItem("archivTitle", stringNoteTitle);
  localStorage.setItem("archivContent", stringNoteContent);
}

function trashNoteToStorage() {
  let stringTrashNoteTitle = JSON.stringify(allNotes.notesTrashTitle);
  let stringTrashNoteContent = JSON.stringify(allNotes.notesTrash);
  localStorage.setItem("trashTitle", stringTrashNoteTitle);
  localStorage.setItem("trashContent", stringTrashNoteContent);
}

function notesFromStorage() {
  let stringTitleNotes = localStorage.getItem("title");
  let stringContentNotes = localStorage.getItem("content");
  let storageTitleNotes = JSON.parse(stringTitleNotes);
  let storageContentNotes = JSON.parse(stringContentNotes);

  if (storageTitleNotes != null && storageContentNotes != null) {
    for (
      let storageIndex = 0;
      storageIndex < storageTitleNotes.length;
      storageIndex++
    ) {
      allNotes.notesTitle.push(storageTitleNotes[storageIndex]);
      allNotes.notes.push(storageContentNotes[storageIndex]);
      renderAllNotes();
    }
    
  }
}

function archivNotesFromStorage() {
  let stringArchivTitleNotes = localStorage.getItem("archivTitle");
  let stringArchivContentNotes = localStorage.getItem("archivContent");
  let storageArchivTitleNotes = JSON.parse(stringArchivTitleNotes);
  let storageArchivContentNotes = JSON.parse(stringArchivContentNotes);

  if (storageArchivTitleNotes != null && storageArchivContentNotes != null) {
    for (
      let storageArchivIndex = 0;
      storageArchivIndex < storageArchivTitleNotes.length;
      storageArchivIndex++
    ) {
      allNotes.notesArchiveTitle.push(
        storageArchivTitleNotes[storageArchivIndex]
      );
      allNotes.notesArchive.push(storageArchivContentNotes[storageArchivIndex]);
      renderAllNotes();

    }
  }
}

function trashNotesFromStorage() {
  let stringTrashTitleNotes = localStorage.getItem("trashTitle");
  let stringTrashContentNotes = localStorage.getItem("trashContent");
  let storageTrashTitleNotes = JSON.parse(stringTrashTitleNotes);
  let storageTrashContentNotes = JSON.parse(stringTrashContentNotes);

  if (storageTrashTitleNotes != null && storageTrashContentNotes != null) {
    for (
      let storageTrashIndex = 0;
      storageTrashIndex < storageTrashTitleNotes.length;
      storageTrashIndex++
    ) {
      allNotes.notesTrashTitle.push(storageTrashTitleNotes[storageTrashIndex]);
      allNotes.notesTrash.push(storageTrashContentNotes[storageTrashIndex]);
      renderAllNotes();

    }
  }
}

function clearStorage() {
  localStorage.clear();
}

function dialogPrevention(event) {
  event.stopPropagation();
}

function archivOverlayOn() {
  let archivOverlay = document.getElementById("archiveOverlay");
  let body = document.getElementById("body");
  archivOverlay.classList.remove("d_none");
  body.classList.add("no-scroll");
}

function trashOverlayOn() {
  let trashOverlay = document.getElementById("trashOverlay");
  let body = document.getElementById("body");
  trashOverlay.classList.remove("d_none");
  body.classList.add("no-scroll");
}

function archivOverlayOff() {
  let archivOverlay = document.getElementById("archiveOverlay");
  let body = document.getElementById("body");
  archivOverlay.classList.add("d_none");
  body.classList.remove("no-scroll");
}

function trashOverlayOff() {
  let trashOverlay = document.getElementById("trashOverlay");
  let body = document.getElementById("body");
  trashOverlay.classList.add("d_none");
  body.classList.remove("no-scroll");
}
