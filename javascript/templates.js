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

function getArchiveNoteTemplate(indexNote) {
  return ` <div onclick="dialogPrevention(event)" class="note archiv_background">
                  <h3>${allNotes.notesArchiveTitle[indexNote]}</h3>
                  <p>${allNotes.notesArchive[indexNote]}</p>
                 <div class="note_btns">
                 <button class="btn btn_trash" onclick="switchNote(${indexNote},'notesArchive', 'notesTrash')">T</button>
                 <button class="btn btn_note" onclick="switchNote(${indexNote},'notesArchive', 'notes')">N</button>
                 </div>
              </div>`;
}

function getTrashNoteTemplate(indexNote) {
  return ` <div onclick="dialogPrevention(event)" class="note trash_background">
                  <h3>${allNotes.notesTrashTitle[indexNote]} </h3>       
                  <p>${allNotes.notesTrash[indexNote]}</p>
                  <div class="note_btns">
                  <button class="btn" onclick="deleteNote(${indexNote})">X</button>
                  <button class="btn btn_note" onclick="switchNote(${indexNote},'notesTrash', 'notes')">N</button>
                  </div>
              </div>`;
}


