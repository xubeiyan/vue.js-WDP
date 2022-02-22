const TaskApp = {
    el: "#app",
    data() {
        return {
            task: {
                'title': ''
            },
            tasks: [

            ]
        }
    },
    async created() {
        await this.getTasks();
    },
    methods: {
        async getTasks() {
            const response = await fetch(window.location, {
                method: 'get',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });

            this.tasks = await response.json();
        },
        async createTask() {
            await this.getTasks();
            const response = await fetch(window.location.origin + '/create', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(this.task)
            })

            await this.getTasks();
            this.task.title = '';
        },
        async deleteTask(task) {
            await fetch(window.location.origin + '/delete', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(task)
            });

            await this.getTasks();
        },
        async completeTask(task) {
            await fetch(window.location.origin + '/complete', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                body: JSON.stringify(task)
            });

            await this.getTasks();
        }
    },
    delimiters: ['${', '}']
}

new Vue(TaskApp);
