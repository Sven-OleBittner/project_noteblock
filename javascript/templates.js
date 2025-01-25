function getNoteTemplate(indexNote) {
  return ` <div class="note note_background">
                  <h3>${notesTitle[indexNote]}</h3>
                  <p>${notesContent[indexNote]}</p>
                  <div class="note_btns">
                  <button class="btn btn_trash" onclick="switchNoteToTrash(${indexNote})">T</button>
                  <button class="btn btn_archiv" onclick="switchNoteToArchive(${indexNote})">A</button>
                  </div>
              </div>`;
}

function getArchiveNoteTemplate(noteArchiveIndex) {
  return ` <div onclick="dialogPrevention(event)" class="note archiv_background">
                  <h3>${notesArchiveTitle[noteArchiveIndex]}</h3>
                  <p>${notesArchiveContent[noteArchiveIndex]}</p>
                 <div class="note_btns">
                 <button class="btn btn_trash" onclick="switchArchivToTrashNote(${noteArchiveIndex})">T</button>
                 <button class="btn btn_note" onclick="switchArchivToNote(${noteArchiveIndex})">N</button>
                 </div>
              </div>`;
}

function getTrashNoteTemplate(trashNoteIndex) {
  return ` <div onclick="dialogPrevention(event)" class="note trash_background">
                  <h3>${notesTrashTitle[trashNoteIndex]} </h3>       
                  <p>${notesTrashContent[trashNoteIndex]}</p>
                  <div class="note_btns">
                  <button class="btn" onclick="deleteNote(${trashNoteIndex})">X</button>
                  <button class="btn btn_note" onclick="switchTrashToNote(${trashNoteIndex})">N</button>
                  </div>
              </div>`;
}


