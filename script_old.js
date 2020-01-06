// задаем исходные id записям и колонкам
let noteIdCounter = 8;
let columnIdCounter = 4;

// переменные перетаскивания
let draggedNote = null;

// работаем с записями
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
    .forEach(noteProcess);

// ф-я для проверки и добавления записей в колонку
function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', function (event) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', noteIdCounter);

        noteIdCounter++;

        columnElement.querySelector('[data-notes]').append(noteElement);
        noteProcess (noteElement);

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
        if (draggedNote) {
            //отменяем стандартную обработку
            event.preventDefault();
        }
    });
    columnElement.addEventListener('drop', function (event) {
        if (draggedNote) {
            return columnElement.querySelector('[data-notes]').append(draggedNote);
        }
    });
};

// ф-я для редактирования записей
function noteProcess (noteElement) {
    noteElement.addEventListener('dblclick', function (event) {
    // добавляем элементу записи св-во редактирования, убираем возможность перетаскивания и подсвечиваем эту область
    noteElement.setAttribute('contenteditable', 'true');
    noteElement.removeAttribute('draggable');
    // так же и у родительского элемента(колонки)
    noteElement.closest('.column').removeAttribute('draggable');
    noteElement.focus();
    this.classList.add('edit');
    });

    //убираем редактирование при расфокусе
    noteElement.addEventListener('blur', function (event) {
        noteElement.removeAttribute('contenteditable');
        noteElement.closest('.column').setAttribute('draggable', 'true');
        this.classList.remove('edit');

        // при условии пустой карточки, удаляем ее
        if (!noteElement.textContent.trim().length) {
            noteElement.remove();
        }
    });

    //noteElement.addEventListener()

    noteElement.addEventListener('dragstart', dragstart_noteHeader)
    noteElement.addEventListener('dragend', dragend_noteHeader)
    noteElement.addEventListener('dragenter', dragenter_noteHeader)
    noteElement.addEventListener('dragover', dragover_noteHeader)
    noteElement.addEventListener('dragleave', dragleave_noteHeader)
    noteElement.addEventListener('drop', drop_noteHeader)
};

function dragstart_noteHeader (event) {
    //console.log('dragstart', event, this)
    draggedNote = this;
    // задаем записи стиль при перетаскивании
    this.classList.add('dragged');
}
function dragend_noteHeader (event) {
    //console.log('dragend', event, this);
    draggedNote = null;
    // отменяем стиль, присвоенный при перетаскивании
    this.classList.remove('dragged');

    // очищаем стили
    document
        .querySelectorAll('.note')
        .forEach(x => x.classList.remove('under'))
}
function dragenter_noteHeader (event) {
    if (this === draggedNote) {
        return;
    }
    //console.log('dragenter', event, this);
    this.classList.add('under');
}
function dragover_noteHeader (event) {
    event.preventDefault()
    if (this === draggedNote) {
        return;
    }
    //console.log('dragover', event, this);
    event.stopPropagation();
}
function dragleave_noteHeader (event) {
    if (this === draggedNote) {
        return;
    }
    //console.log('dragleave', event, this);
    this.classList.remove('under');
}

// ф-я при отпускании
function drop_noteHeader (event) {
    event.stopPropagation();
    if (this === draggedNote) {
        return;
    }
    //console.log('drop', event, this);
    //console.log(this);
    //console.log(draggedNote);
    if (this.parentElement === draggedNote.parentElement) {
        const note = Array.from(this.parentElement.querySelectorAll('.note'));
        const indexA = note.indexOf(this);
        const indexB = note.indexOf(draggedNote);

        if (indexA < indexB) {
            this.parentElement.insertBefore(draggedNote, this);
        }
        else {
            this.parentElement.insertBefore(draggedNote, this.nextElementSibling);
        }
    }

    else {
        this.parentElement.insertBefore(draggedNote, this);
    }
}

/*
// задаем исходные id записям и колонкам
let noteIdCounter = 8;
let columnIdCounter = 4;

// переменные перетаскивания
let draggedNote = null;

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
    .forEach(noteProcess);

// ф-я для проверки и добавления записей в колонку
function columnProcess (columnElement) {
    const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

    spanAction_addNote.addEventListener('click', function (event) {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id', noteIdCounter);

        noteIdCounter++;

        columnElement.querySelector('[data-notes]').append(noteElement);
        noteProcess (noteElement);

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
        if (draggedNote) {
            //отменяем стандартную обработку
            event.preventDefault();
        }
    });
    columnElement.addEventListener('drop', function (event) {
        if (draggedNote) {
            return columnElement.querySelector('[data-notes]').append(draggedNote);
        }
    });
};

// ф-я для редактирования записей
function noteProcess (noteElement) {
    noteElement.addEventListener('dblclick', function (event) {
    // добавляем элементу записи св-во редактирования, убираем возможность перетаскивания и подсвечиваем эту область
    noteElement.setAttribute('contenteditable', 'true');
    noteElement.removeAttribute('draggable');
    // так же и у родительского элемента(колонки)
    noteElement.closest('.column').removeAttribute('draggable');
    noteElement.focus();
    this.classList.add('edit');
    });

    //убираем редактирование при расфокусе
    noteElement.addEventListener('blur', function (event) {
        noteElement.removeAttribute('contenteditable');
        noteElement.closest('.column').setAttribute('draggable', 'true');
        this.classList.remove('edit');

        // при условии пустой карточки, удаляем ее
        if (!noteElement.textContent.trim().length) {
            noteElement.remove();
        }
    });

    noteElement.addEventListener('dragstart', dragstart_noteHeader)
    noteElement.addEventListener('dragend', dragend_noteHeader)
    noteElement.addEventListener('dragenter', dragenter_noteHeader)
    noteElement.addEventListener('dragover', dragover_noteHeader)
    noteElement.addEventListener('dragleave', dragleave_noteHeader)
    noteElement.addEventListener('drop', drop_noteHeader)
};

function dragstart_noteHeader (event) {
    draggedNote = this;
    // задаем записи стиль при перетаскивании
    this.classList.add('dragged');
}
function dragend_noteHeader (event) {
    draggedNote = null;
    // отменяем стиль, присвоенный при перетаскивании
    this.classList.remove('dragged');

    // очищаем стили
    document
        .querySelectorAll('.note')
        .forEach(x => x.classList.remove('under'))
}
function dragenter_noteHeader (event) {
    if (this === draggedNote) {
        return;
    }
    this.classList.add('under');
}
function dragover_noteHeader (event) {
    event.preventDefault()
    if (this === draggedNote) {
        return;
    }
    event.stopPropagation();
}
function dragleave_noteHeader (event) {
    if (this === draggedNote) {
        return;
    }
    this.classList.remove('under');
}

// ф-я при отпускании
function drop_noteHeader (event) {
    event.stopPropagation();
    if (this === draggedNote) {
        return;
    }
    if (this.parentElement === draggedNote.parentElement) {
        const note = Array.from(this.parentElement.querySelectorAll('.note'));
        const indexA = note.indexOf(this);
        const indexB = note.indexOf(draggedNote);

        if (indexA < indexB) {
            this.parentElement.insertBefore(draggedNote, this);
        }
        else {
            this.parentElement.insertBefore(draggedNote, this.nextElementSibling);
        }
    }

    else {
        this.parentElement.insertBefore(draggedNote, this);
    }
}
*/