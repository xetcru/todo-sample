let noteIdCounter = 8;
let columnIdCounter = 4;

document
    .querySelectorAll('.column')
    .forEach (columnProcess)
    /*.forEach(columnElement => {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note');
            noteElement.setAttribute('draggable', 'true');
            noteElement.setAttribute('data-note-id', noteIdCounter);

            noteIdCounter++;

            columnElement.querySelector('[data-notes]').append(noteElement);
            //console.log(this)
        });
    });*/

document
    .querySelector('[data-action-addColumn]')
    .addEventListener('click', function (event) {
        const columnElement = document.createElement('div');
        columnElement.classList.add('column');
        columnElement.setAttribute('draggadle', 'true');
        columnElement.setAttribute('data-column-id', columnIdCounter);

        columnElement.innerHTML =
`<p class="column-header" contenteditable="true">В плане</p>
<div data-notes></div>
<p class="column-footer">
    <span data-action-addNote class="action">+ Добавить карточку</span>
</p>`

        columnIdCounter++;

        document.querySelector('.columns').append(columnElement);

        columnProcess(columnElement);
    });

function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', function (event) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', noteIdCounter);

        noteIdCounter++;

        columnElement.querySelector('[data-notes]').append(noteElement);
    });
};