from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import func



class TrainingPlan(db.Model):
    __tablename__ = 'training_plans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    body = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    # activity_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("activities.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True), server_default=func.now())
    updated_at = db.Column(db.TIMESTAMP(timezone=True), onupdate=func.now(), server_default=func.now())

    user = db.relationship('User', back_populates='training_plans')
    # activities = db.relationship('Activity', back_populates='training_plans')
    training_plan_comments = db.relationship('TrainingPlanComment', back_populates='training_plans', cascade="all, delete-orphan")
    training_plan_following = db.relationship('TrainingPlanFollowing', back_populates='training_plans', cascade="all, delete-orphan")
    training_plan_tags = db.relationship('TrainingPlanTag', back_populates='training_plans', cascade="all, delete-orphan")
    training_plan_activities = db.relationship('TrainingPlanActivity', back_populates='training_plans')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            # 'activity_id': self.activity_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
