from .db import db, environment, SCHEMA, add_prefix_for_prod



class TrainingPlanTag(db.Model):
    __tablename__ = 'training_plan_tags'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    training_plan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("training_plans.id")), primary_key=True, nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tags.id")), primary_key=True, nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True))

    training_plan = db.relationship('TrainingPlan', back_populates='training_plan_tags')
    tag = db.relationship('Tag', back_populates='training_plan_tags')

    def to_dict(self):
        return {
            'training_plan_id': self.training_plan_id,
            'tag_id': self.tag_id,
            'created_at': self.created_at
        }
