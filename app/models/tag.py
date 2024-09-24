from .db import db, environment, SCHEMA, add_prefix_for_prod



class Tag(db.Model):
    __tablename__ = 'tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(5000), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tag_category.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True))
    updated_at = db.Column(db.TIMESTAMP(timezone=True))

    tag_category = db.relationship('TagCategory', back_populates='tags', cascade="all, delete-orphan")
    training_plan_tag = db.relationship('TrainingPlanTag', back_populates='tags', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'category_id': self.category_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
