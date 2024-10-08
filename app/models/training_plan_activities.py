from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func


class TrainingPlanActivity(db.Model):
    __tablename__ = 'training_plan_activities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    training_plan_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("training_plans.id")), primary_key=True,nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("activities.id")), primary_key=True,nullable=False)
    activity_order = db.Column(db.Integer)
    created_at = db.Column(db.TIMESTAMP(timezone=True), server_default=func.now())

    training_plans = db.relationship('TrainingPlan', back_populates='training_plan_activities')
    activities = db.relationship('Activity', back_populates='training_plan_activities')

    def to_dict(self):
        return {
            'training_plan_id': self.training_plan_id,
            'activity_id': self.activity_id,
            'activity_order': self.activity_order,
            'created_at': self.created_at
        }
