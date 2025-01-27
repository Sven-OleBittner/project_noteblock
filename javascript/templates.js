function getNoteTemplate(indexNote, noteKey) {
  return ` <div class="note note_background">
                  <h3>${allNotes[`${noteKey}Title`][indexNote]}</h3>
                  <p>${allNotes[`${noteKey}`][indexNote]}</p>
                  <div class="note_btns">
                  <button class="btn btn_trash" onclick="switchNote(${indexNote},'notes', 'trash')">T</button>
                  <button class="btn btn_archiv" onclick="switchNote(${indexNote},'notes', 'archive')">A</button>
                  </div>
              </div>`;
}

function getArchiveNoteTemplate(indexNote, noteKey) {
  return ` <div class="note archiv_background">
                  <h3>${allNotes[`${noteKey}Title`][indexNote]}</h3>
                  <p>${allNotes[`${noteKey}`][indexNote]}</p>
                 <div class="note_btns">
                 <button class="btn btn_trash" onclick="switchNote(${indexNote},'archive', 'trash')">T</button>
                 <button class="btn btn_note" onclick="switchNote(${indexNote},'archive', 'notes')">N</button>
                 </div>
              </div>`;
}

function getTrashNoteTemplate(indexNote, noteKey) {
  return ` <div class="note trash_background">
                  <h3>${allNotes[`${noteKey}Title`][indexNote]}</h3>       
                  <p>${allNotes[`${noteKey}`][indexNote]}</p>
                  <div class="note_btns">
                  <button class="btn" onclick="deleteNote(${indexNote})">X</button>
                  <button class="btn btn_note" onclick="switchNote(${indexNote},'trash', 'notes')">N</button>
                  </div>
              </div>`;
}
