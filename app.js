// для хранения данных
const Application = {
    // ф-я сохранения
    save () {
        const object = {
            columns: {
                idCounter: Column.idCounter,
                items: []
            },
            notes: {
                idCounter: Note.idCounter,
                items: []
            }
        }

        // проходимся по колонкам и запоминаем содержимое
        document
            .querySelectorAll('.column')
            .forEach(columnElement => {
                const column = {
                    id: parseInt(columnElement.getAttribute('data-column-id')),
                    noteIds: []
                }

                // проходимся по заметкам и forEach добавляем data-note-id в массив noteIds
                columnElement
                    .querySelectorAll('.note')
                    .forEach(noteElement => {
                        column.noteIds.push(parseInt(noteElement.getAttribute('data-note-id')))
                    })

                object.columns.items.push(column)
            })

            // проходимся по записям
            document
                .querySelectorAll('.note')
                .forEach(noteElement => {
                    const note = {
                        id: parseInt(noteElement.getAttribute('data-note-id')),
                        content: noteElement.textContent
                    }
                    
                    object.notes.items.push(note)
                })

        // сохраняем в строку
        const json = JSON.stringify(object)

        console.log(json)

        //return object
        //localStorage.setItem('trello', json)
    },

    // ф-я загрузки
    load () {}
}