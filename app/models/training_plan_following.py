from .db import db, environment, SCHEMA, add_prefix_for_prod



class TrainingPlanFollowing(db.Model):
    __tablename__ = 'training_plan_following'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    training_plan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("training_plans.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True))

    user = db.relationship('User', back_populates='training_plan_following')
    training_plan = db.relationship('TrainingPlan', back_ppopulates='training_plan_following')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'training_plan_id': self.training_plan_id,
            'created_at': self.created_at
        }
