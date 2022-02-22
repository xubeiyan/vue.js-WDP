from flask import Flask
from flask import render_template
from flask import jsonify
from flask import request
from flask import redirect, url_for

from config import Config
from forms import TaskForm

from flask_sqlalchemy import SQLAlchemy

from datetime import datetime
from dataclasses import dataclass

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)

@dataclass
class Task(db.Model):
    id: int
    title: str
    date: datetime
    completed: bool

    id          = db.Column(db.Integer(), primary_key=True)
    title       = db.Column(db.String(140))
    date        = db.Column(db.DateTime(), default=datetime.now())
    completed   = db.Column(db.Boolean(), default=False)

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

    def __repr__(self) -> str:
        return f'<Task id: {self.id} - {self.title}'


@app.route('/')
def index():
    tasks = Task.query.all()

    if request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        return jsonify(tasks)

    return render_template('index.html')

@app.route('/create', methods=['POST'])
def create_task():
    user_input = request.get_json()
    form = TaskForm(data=user_input)

    if form.validate():
        task = Task(title=form.title.data)

        db.session.add(task)
        db.session.commit()

        return jsonify(task)

    return redirect(url_for('index.html'))

@app.route('/delete', methods=['POST'])
def delete_task():
    task_id = request.get_json().get('id')
    task = Task.query.filter_by(id=task_id).first()

    db.session.delete(task)
    db.session.commit()

    return jsonify({'result': 'OK'}), 200

@app.route('/complete', methods=['POST'])
def complete_task():
    task_id = request.get_json().get('id')
    task = Task.query.filter_by(id=task_id).first()

    task.completed = not task.completed

    db.session.add(task)
    db.session.commit()

    return jsonify({'result': 'OK'}), 200

if __name__ == '__main__':
    app.run()