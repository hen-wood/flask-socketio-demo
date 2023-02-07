from flask import Flask, render_template, request
from app.config import Config
from flask_socketio import SocketIO, send
from app.models import db, Message
from flask_migrate import Migrate
import json

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)

socketio = SocketIO(app, cors_allowed_origins="*")


@socketio.on('message')
def handle_message(msg):
    if msg != "User connected!":
        data = json.loads(msg)
        new_message = Message(
            userId=data['userId'],
            content=data['content'],
            time=data['time']
        )
        db.session.add(new_message)
        db.session.commit()

        send(msg, broadcast=True)

@app.route('/')
def index():
    messages = Message.query.all()
    return render_template('index.html', messages=messages)


if __name__ == "__main__":
    socketio.run(app, host="localhost")
