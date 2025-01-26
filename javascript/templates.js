function getNoteTemplate(indexNote) {
  return ` <div class="note note_background">
                  <h3>${allNotes.notesTitle[indexNote]}</h3>
                  <p>${allNotes.notes[indexNote]}</p>
                  <div class="note_btns">
                  <button class="btn btn_trash" onclick="switchNote(${indexNote},'notes', 'notesTrash')">T</button>
                  <button class="btn btn_archiv" onclick="switchNote(${indexNote},'notes', 'notesArchive')">A</button>
                  </div>
              </div>`;
}

function getArchiveNoteTemplate(noteArchiveIndex) {
  return ` <div onclick="dialogPrevention(event)" class="note archiv_background">
                  <h3>${allNotes.notesArchiveTitle[noteArchiveIndex]}</h3>
                  <p>${allNotes.notesArchive[noteArchiveIndex]}</p>
                 <div class="note_btns">
                 <button class="btn btn_trash" onclick="switchNote(${noteArchiveIndex},'notesArchive', 'notesTrash')">T</button>
                 <button class="btn btn_note" onclick="switchNote(${noteArchiveIndex},'notesArchive', 'notes')">N</button>
                 </div>
              </div>`;
}

function getTrashNoteTemplate(trashNoteIndex) {
  return ` <div onclick="dialogPrevention(event)" class="note trash_background">
                  <h3>${allNotes.notesTrashTitle[trashNoteIndex]} </h3>       
                  <p>${allNotes.notesTrash[trashNoteIndex]}</p>
                  <div class="note_btns">
                  <button class="btn" onclick="deleteNote(${trashNoteIndex})">X</button>
                  <button class="btn btn_note" onclick="switchNote(${trashNoteIndex},'notesTrash', 'notes')">N</button>
                  </div>
              </div>`;
}


