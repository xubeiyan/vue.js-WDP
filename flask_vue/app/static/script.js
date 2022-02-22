const TaskApp = {
    el: "#app",
    data() {
        return {
            task: '',
            tasks: [
                {title: '第一个'},
                {title: '第二个'}
            ]
        }
    },
    delimiters: ['${', '}']
}

new Vue(TaskApp)
