// работаем с колонками
document
    .querySelectorAll('.column')
    .forEach (Column.process)

// работаем с записями
document
    .querySelectorAll('.note')
    .forEach(Note.process);

    /*// работаем с записями
    document
        .querySelectorAll('.column')
        .forEach (Column.process)*/
    
    // работаем с колонками
    document
        .querySelector('[data-action-addColumn]')
        .addEventListener('click', function (event) {
            const columnElement = document.createElement('div');
            columnElement.classList.add('column');
            columnElement.setAttribute('draggadle', 'true');
            columnElement.setAttribute('data-column-id', Column.IdCounter);
    
            columnElement.innerHTML =
    `<p class="column-header" contenteditable="true">В плане</p>
    <div data-notes></div>
    <p class="column-footer">
        <span data-action-addNote class="action">+ Добавить карточку</span>
    </p>`
    
            Column.IdCounter++;
    
            document.querySelector('.columns').append(columnElement);
    
            Column.process(columnElement);

            // выделяем колонки при перетаскивании
            columnElement.querySelector('.column-header').setAttribute('contenteditable', true)
            
            columnElement.querySelector('.column-header').focus()
        });