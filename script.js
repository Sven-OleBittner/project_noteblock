const allNotes = {
  notesTitle: [],
  archiveTitle: [],
  trashTitle: [],
  notes: [],
  archive: [],
  trash: [],
};

function initNotes() {
  notesFromStorage('notes');
  notesFromStorage('archive');
  notesFromStorage('trash');
  renderNotes('notes');
}

function changeNoteHeadline(title, oldBg1, oldBg2, newBg){
  let noteHeadlineRef = document.getElementById("noteHeadline");
  let headLine = noteHeadlineRef;
  noteHeadlineRef.innerHTML = title;

  if (headLine.classList.contains(oldBg1)) {
    headLine.classList.replace(oldBg1, newBg);
  }else if (headLine.classList.contains(oldBg2)) {
    headLine.classList.replace(oldBg2, newBg);
  }
}

function notes() {
  changeNoteHeadline('Notizen', 'archiv_background', 'trash_background', 'note_background');
  renderNotes('notes');
}

function archiv() {
  changeNoteHeadline('Archiv', 'note_background', 'trash_background', 'archiv_background')
  renderNotes('archive');
}

function trash() {
  changeNoteHeadline('Trash', 'note_background', 'archiv_background', 'trash_background');
  renderNotes('trash');
}

function renderNotes(noteKey) {
  let noteContainerRef = document.getElementById("notesContainer");
  noteContainerRef.innerHTML = "";
  for (let indexNote = 0; indexNote < allNotes[`${noteKey}`].length; indexNote++) {
    noteContainerRef.innerHTML += getNoteTemplates(indexNote, noteKey);    
  }
}

function getNoteTemplates(indexNote, noteKey) {
  if (noteKey === "notes") {
    return getNoteTemplate(indexNote,noteKey);
  } else if (noteKey === "archive") {
    return getArchiveNoteTemplate(indexNote, noteKey);
  } else if (noteKey === "trash") {
    return getTrashNoteTemplate(indexNote, noteKey);
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
    notesToStorage('notes');
    noteTitleRef.value = "";
    noteContentRef.value = "";
  }
  renderNotes('notes');
}

function switchNote(indexNote, startKey, destinationKey) {
  let note = allNotes[`${startKey}`].splice(indexNote, 1);
  let noteTitle = allNotes[`${startKey}Title`].splice(indexNote, 1);
  allNotes[destinationKey].push(note[0]);
  allNotes[destinationKey + "Title"].push(noteTitle[0]);
  notesToStorage(startKey);
  notesToStorage(destinationKey);
  renderNotes(startKey);
}

function deleteNote(indexNote) {
  allNotes.trashTitle.splice(indexNote, 1);
  allNotes.trash.splice(indexNote, 1);
  notesToStorage('trash');
  renderNotes('trash');
}

function notesToStorage(noteKey) {
  let stringNoteTitle = JSON.stringify(allNotes[`${noteKey}Title`]);
  let stringNoteContent = JSON.stringify(allNotes[`${noteKey}`]);
  localStorage.setItem(`${noteKey}Title`, stringNoteTitle);
  localStorage.setItem(`${noteKey}`, stringNoteContent);
}

function notesFromStorage(noteKey) {
  let stringTitleNotes = localStorage.getItem(`${noteKey}Title`);
  let stringContentNotes = localStorage.getItem(`${noteKey}`);
  let storageTitleNotes = JSON.parse(stringTitleNotes);
  let storageContentNotes = JSON.parse(stringContentNotes);

  if (storageTitleNotes != null && storageContentNotes != null) {
    for (
      let storageIndex = 0;
      storageIndex < storageTitleNotes.length;
      storageIndex++
    ) {
      allNotes[`${noteKey}Title`].push(storageTitleNotes[storageIndex]);
      allNotes[`${noteKey}`].push(storageContentNotes[storageIndex]);
    }
  }
  renderNotes(noteKey);
}
