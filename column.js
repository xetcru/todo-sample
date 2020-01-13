const Column = {
    IdCounter: 4,
    dragged: null,

    dropped: null,

    // работаем с колонками
    // ф-я для проверки и добавления записей в колонку
    process (columnElement) {
        const spanAction_addNote = columnElement.querySelector('[data-action-addNote]');

        spanAction_addNote.addEventListener('click', function (event) {
            const noteElement = Note.create();

            columnElement.querySelector('[data-notes]').append(noteElement);

            noteElement.setAttribute('contenteditable', 'true');
            noteElement.focus();
        });

        // редактируемый хедер
        const headerElement = columnElement.querySelector('.column-header');
        headerElement.addEventListener('dblclick', function (event) {
            headerElement.setAttribute('contenteditable', 'true');
            headerElement.removeAttribute('draggable');
            headerElement.parentElement.removeAttribute('draggable');
            this.classList.add('edit');
            headerElement.focus();
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

        //columnElement.addEventListener('dragenter', Column.dragenter)
        columnElement.addEventListener('dragover', Column.dragover)
        //columnElement.addEventListener('dragleave', Column.dragleave)

        columnElement.addEventListener('drop', Column.drop)
    },

    // обработчики событий записей
    dragstart (event) {
        Column.dragged = this
        this.classList.add('dragged')
    
        event.stopPropagation()

        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.removeAttribute('draggable'))
    },
    
    dragend (event) {
        this.classList.remove('dragged')
        Column.dragged = null
        Column.dropped = null
    
        document
            .querySelectorAll('.note')
            .forEach(noteElement => noteElement.setAttribute('draggable', true))

        document
            .querySelectorAll('.column')
            //.forEach(noteElement => noteElement.setAttribute('draggable', true))
            .forEach(x => x.classList.remove('under'))
            
        //event.stopPropagation()
    },
    
    /*dragenter (event) {
        if (!Column.dragged || Column.dragged === this) {
            return
        }
        this.classList.add('under')
    },*/
    
    dragover (event) {
        event.preventDefault()
        event.stopPropagation()

        if (Column.dragged === this) {
            if (Column.dropped) {
                columnElement.dropped.classList.remove('under')
            }
            Column.dropped = null
        }

        if (!Column.dragged || Column.dragged === this) {
            return
        }
        
        Column.dropped = this
        // убираем класс при отведении
        document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        
        this.classList.add('under')
    },
    
    /*dragleave (event) {
        if (!Column.dragged || Column.dragged === this) {
            return
        }
        this.classList.remove('under')
    },*/
    
    drop (event) {
        event.stopPropagation()
        
        if (Note.dragged) {
            return this.querySelector('[data-notes]').append(Note.dragged)
        }
        else if (Column.dragged) {
            const children = Array.from(document.querySelector('.columns').children)
            const indexA = children.indexOf(this)
            const indexB = children.indexOf(Column.dragged)

            if (indexA < indexB) {
                document.querySelector('.columns').insertBefore(Column.dragged, this)
            }
            else {
                document.querySelector('.columns').insertBefore(Column.dragged, this.nextElementSibling)
            }

            // убираем класс при отведении
            document
            .querySelectorAll('.column')
            .forEach(columnElement => columnElement.classList.remove('under'))
        }
    }
}