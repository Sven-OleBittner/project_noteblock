const notesTitle = [];
const notesArchiveTitle = [];
const notesTrashTitle = [];
const notesContent = [];
const notesArchiveContent = [];
const notesTrashContent = [];

function initNotes() {
  notesFromStorage();
  archivNotesFromStorage();
  trashNotesFromStorage();
}

function renderNotes() {
  let noteContainerRef = document.getElementById("notesContainer");
  noteContainerRef.innerHTML = "";
  for (let noteIndex = 0; noteIndex < notesTitle.length; noteIndex++) {
    noteContainerRef.innerHTML += getNoteTemplate(noteIndex);
  }
}

function renderNotes() {
  let noteContainerRef = document.getElementById("notesContainer");
  noteContainerRef.innerHTML = "";
  for (let noteIndex = 0; noteIndex < notesTitle.length; noteIndex++) {
    noteContainerRef.innerHTML += getNoteTemplate(noteIndex);
  }
}

function renderArchiveNotes() {
  let noteArchivContainerRef = document.getElementById("archiveNotesContainer");
  noteArchivContainerRef.innerHTML = "";
  for (
    let noteArchiveIndex = 0;
    noteArchiveIndex < notesArchiveTitle.length;
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
    trashNoteIndex < notesTrashTitle.length;
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
    notesTitle.push(noteTitle);
    notesContent.push(noteContent);
    notesToStorage();
    noteTitleRef.value = "";
    noteContentRef.value = "";
  }
  renderNotes();
}

function switchArchivToNote(noteArchiveIndex) {
  let noteArchiveTitle = notesArchiveTitle.splice(noteArchiveIndex, 1);
  let noteArchiveContent = notesArchiveContent.splice(noteArchiveIndex, 1);
  notesTitle.push(noteArchiveTitle[0]);
  notesContent.push(noteArchiveContent[0]);
  notesToStorage();
  archivNotesToStorage();
  renderArchiveNotes();
  renderTrashNotes();
  renderNotes();
}

function switchArchivToTrashNote(noteArchiveIndex) {
  let noteArchiveTitle = notesArchiveTitle.splice(noteArchiveIndex, 1);
  let noteArchiveContent = notesArchiveContent.splice(noteArchiveIndex, 1);
  notesTrashTitle.push(noteArchiveTitle[0]);
  notesTrashContent.push(noteArchiveContent[0]);
  trashNoteToStorage();
  archivNotesToStorage();
  renderArchiveNotes();
  renderTrashNotes();
  renderNotes();
}

function switchNoteToArchive(indexNote) {
  let noteArchiveTitle = notesTitle.splice(indexNote, 1);
  let noteArchiveContent = notesContent.splice(indexNote, 1);
  notesArchiveTitle.push(noteArchiveTitle[0]);
  notesArchiveContent.push(noteArchiveContent[0]);
  notesToStorage();
  archivNotesToStorage();
  renderArchiveNotes();
  renderTrashNotes();
  renderNotes();
}

function switchNoteToTrash(indexNote) {
  let noteTrashTitle = notesTitle.splice(indexNote, 1);
  let noteTrashContent = notesContent.splice(indexNote, 1);
  notesTrashTitle.push(noteTrashTitle[0]);
  notesTrashContent.push(noteTrashContent[0]);
  notesToStorage();
  renderArchiveNotes();
  renderTrashNotes();
  renderNotes();
}

function switchTrashToNote(trashNoteIndex) {
  let noteTrashTitle = notesTrashTitle.splice(trashNoteIndex, 1);
  let noteTrashContent = notesTrashContent.splice(trashNoteIndex, 1);
  notesTitle.push(noteTrashTitle[0]);
  notesContent.push(noteTrashContent[0]);
  notesToStorage();
  trashNoteToStorage();
  renderArchiveNotes();
  renderTrashNotes();
  renderNotes();
}

function deleteNote(trashNoteIndex) {
  notesTrashTitle.splice(trashNoteIndex, 1);
  notesTrashContent.splice(trashNoteIndex, 1);
  trashNoteToStorage();
  renderTrashNotes();
}

function notesToStorage() {
  let stringNoteTitle = JSON.stringify(notesTitle);
  let stringNoteContent = JSON.stringify(notesContent);
  localStorage.setItem("title", stringNoteTitle);
  localStorage.setItem("content", stringNoteContent);
}

function archivNotesToStorage() {
  let stringNoteTitle = JSON.stringify(notesArchiveTitle);
  let stringNoteContent = JSON.stringify(notesArchiveContent);
  localStorage.setItem("archivTitle", stringNoteTitle);
  localStorage.setItem("archivContent", stringNoteContent);
}

function trashNoteToStorage() {
  let stringTrashNoteTitle = JSON.stringify(notesTrashTitle);
  let stringTrashNoteContent = JSON.stringify(notesTrashContent);
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
      notesTitle.push(storageTitleNotes[storageIndex]);
      notesContent.push(storageContentNotes[storageIndex]);
    }
    renderNotes();
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
      notesArchiveTitle.push(storageArchivTitleNotes[storageArchivIndex]);
      notesArchiveContent.push(storageArchivContentNotes[storageArchivIndex]);
    }
    renderArchiveNotes();
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
      notesTrashTitle.push(storageTrashTitleNotes[storageTrashIndex]);
      notesTrashContent.push(storageTrashContentNotes[storageTrashIndex]);
    }
    renderTrashNotes();
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
