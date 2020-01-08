const Column = {
    IdCounter: 4,
    dragged: null,

    // работаем с колонками
    // ф-я для проверки и добавления записей в колонку
    process (columnElement) {
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
            if (Column.dragged) {
                //отменяем стандартную обработку
                event.preventDefault();
            }
        });
        columnElement.addEventListener('drop', function (event) {
            if (Note.dragged) {
                return columnElement.querySelector('[data-notes]').append(Note.dragged);
            }
        });

        // слушаем перетаскивание
        columnElement.addEventListener('dragstart', Column.dragstart)
        columnElement.addEventListener('dragend', Column.dragend)
        columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        columnElement.addEventListener('dragleave', Column.dragleave)
        columnElement.addEventListener('drop', Column.drop)
    },

    // обработчики событий записей
    dragstart (event) {
        Column.dragged = this
        this.classList.add('dragged')
    
        event.stopPropagation()
    },
    
    dragend (event) {
        Column.dragged = null
        this.classList.remove('dragged')
    
        document
            .querySelectorAll('.column')
            .forEach(x => x.classList.remove('under'))
    },
    
    dragenter (event) {
        if (this === Column.dragged) {
            return
        }
        this.classList.add('under')
    },
    
    dragover (event) {
        event.preventDefault()
        if (this === Column.dragged) {
            return
        }
    },
    
    dragleave (event) {
        if (this === Column.dragged) {
            return
        }
        this.classList.remove('under')
    },
    
    drop (event) {
        event.stopPropagation()
        if (this === Column.dragged) {
            return
        }
    
        const col = Array.from(document.querySelectorAll('.column'))
        const indexA = col.indexOf(this)
        const indexB = col.indexOf(Column.dragged)
 		console.log(col)
        if (indexA < indexB) {
            this.parentElement.insertBefore(Column.dragged, this)
        }

        else {
            this.parentElement.insertBefore(Column.dragged, this.nextElementSibling)
        }
    }
}

// ф-я для проверки и добавления записей в колонку
/*function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addColumn.addEventListener('click', function (event) {
        const columnElement = document.createElement('div');
        columnElement.classList.add('note');
        columnElement.setAttribute('draggable', 'true');
        columnElement.setAttribute('data-note-id', Column.IdCounter);

        Column.IdCounter++;

        columnElement.querySelector('[data-notes]').append(columnElement);
        Column.process (columnElement);

        columnElement.setAttribute('contenteditable', 'true');
        columnElement.focus();
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
        if (Column.dragged) {
            //отменяем стандартную обработку
            event.preventDefault();
        }
    });
    columnElement.addEventListener('drop', function (event) {
        if (Column.dragged) {
            return columnElement.querySelector('[data-notes]').append(Column.dragged);
        }
    });
};*/