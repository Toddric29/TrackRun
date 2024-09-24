from .db import db, environment, SCHEMA, add_prefix_for_prod



class TagCategory(db.Model):
    __tablename__ = 'tag_category'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000), nullable=False)

    tag = db.relationship('Tag', back_populates='tag_category')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }
