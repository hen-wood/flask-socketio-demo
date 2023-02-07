from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Message(db.Model):
    __tablename__ = 'messages'
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer)
    content = db.Column(db.String(100))
    time = db.Column(db.String(100))
