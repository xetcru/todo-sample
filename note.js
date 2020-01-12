// объявляем ф-ии и понятия для работы
const Note = {
    IdCounter: 8,
    dragged: null,

    // ф-я для работы записей
    process (noteElement) {
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
    
        // слушаем перетаскивание
        noteElement.addEventListener('dragstart', Note.dragstart)
        noteElement.addEventListener('dragend', Note.dragend)
        noteElement.addEventListener('dragenter', Note.dragenter)
        noteElement.addEventListener('dragover', Note.dragover)
        noteElement.addEventListener('dragleave', Note.dragleave)
        noteElement.addEventListener('drop', Note.drop)
    },

    // ф-я создания новой заметки
    create () {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.setAttribute('draggable', 'true');
        noteElement.setAttribute('data-note-id',Note.IdCounter);

        Note.IdCounter++;
        //columnElement.querySelector('[data-notes]').appen(noteElement);
        Note.process (noteElement);

        /*noteElement.setAttribute('contenteditable', 'true');
        noteElement.focus();*/
        return noteElement;
    },

    // обработчики событий записей
    dragstart (event) {
        Note.dragged = this;
        // задаем записи стиль при перетаскивании
        this.classList.add('dragged');

        // очищаем
        event.stopPropagation()
    },
    dragend (event) {
        //event.stopPropagation()
        Note.dragged = null;
        // отменяем стиль, присвоенный при перетаскивании
        this.classList.remove('dragged');

        // очищаем стили
        document
            .querySelectorAll('.note')
            .forEach(x => x.classList.remove('under'))

        event.stopPropagation()
    },
    dragenter (event) {
        //event.stopPropagation()
        if (!Note.dragged || this === Note.dragged) {
            return;
        }
        this.classList.add('under');
    },
    dragover (event) {
        event.preventDefault()
        if (!Note.dragged || this === Note.dragged) {
            return;
        }
        event.stopPropagation();
    },
    dragleave (event) {
        //event.stopPropagation()
        if (!Note.dragged || this === Note.dragged) {
            return;
        }
        this.classList.remove('under');
    },

    // ф-я при отпускании
    drop (event) {
        event.stopPropagation();
        if (!Note.dragged || this === Note.dragged) {
            return;
        }
        if (this.parentElement === Note.dragged.parentElement) {
            const note = Array.from(this.parentElement.querySelectorAll('.note'));
            const indexA = note.indexOf(this);
            const indexB = note.indexOf(Note.dragged);

            if (indexA < indexB) {
                this.parentElement.insertBefore(Note.dragged, this);
            }
            else {
                this.parentElement.insertBefore(Note.dragged, this.nextElementSibling);
            }
        }

        else {
            this.parentElement.insertBefore(Note.dragged, this);
        }
    },
}