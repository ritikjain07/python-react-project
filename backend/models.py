from app import db

class Friend(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    role = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    img_url = db.Column(db.String(255), nullable=False)


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'description': self.description,
            'gender': self.gender,
            'img_url': self.img_url
        }

    def __repr__(self):
        return f'<Friend {self.name}>'

    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}