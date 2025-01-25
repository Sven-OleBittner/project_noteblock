function getNoteTemplate(indexNote) {
  return ` <div>
                <h3>${notes[indexNote].title} <button onclick="switchNoteToTrash(${indexNote})">-></button></h3>
                <p>${notes[indexNote].note}</p>
            </div>`;
}

function getTrashNoteTemplate(indexTrashNote) {
  return ` <div>
                <h3>${trashNotes[indexTrashNote].title} <button onclick="deleteNote(${indexTrashNote})">löschen</button></h3>       
                <p>${trashNotes[indexTrashNote].note}</p>
            </div>`;
}

