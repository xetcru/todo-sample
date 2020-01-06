let columnIdCounter = 4;

// работаем с записями
document
    .querySelectorAll('.column')
    .forEach (columnProcess)

// работаем с колонками
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

// делаем записи редактируемыми
document
    .querySelectorAll('.note')
    .forEach(Note.process);

// ф-я для проверки и добавления записей в колонку
function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', function (event) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', Note.IdCounter);

        Note.IdCounter++;

        columnElement.querySelector('[data-notes]').append(noteElement);
        Note.process (noteElement);

        noteElement.setAttribute('contenteditable', 'true');
        noteElement.focus();
    });

    // редактируемый хедер
    const headerElement = columnElement.querySelector('.column-header');
    headerElement.addEventListener('dblclick', function (event) {
        headerElement.setAttribute('contenteditable', 'true');
        headerElement.removeAttribute('draggable');
        headerElement.parentElement.removeAttribute('draggable');
        headerElement.focus();
        this.classList.add('edit');
    });
    // убираем редактирование хедера
    headerElement.addEventListener('blur', function (event) {
        headerElement.removeAttribute('contenteditable');
        headerElement.closest('.column').setAttribute('draggable', 'true');
        this.classList.remove('edit');
    });

    // для перекидывания на пустую колонку
    columnElement.addEventListener('dragover', function (event) {
        if (Note.dragged) {
            //отменяем стандартную обработку
            event.preventDefault();
        }
    });
    columnElement.addEventListener('drop', function (event) {
        if (Note.dragged) {
            return columnElement.querySelector('[data-notes]').append(Note.dragged);
        }
    });
};