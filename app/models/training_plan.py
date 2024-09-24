from .db import db, environment, SCHEMA, add_prefix_for_prod



class TrainingPlan(db.Model):
    __tablename__ = 'training_plans'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), nullable=False)
    body = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    activities_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("activities.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True))
    updated_at = db.Column(db.TIMESTAMP(timezone=True))

    user = db.relationship('User', back_populates='training_plans')
    training_plan_comments = db.relationship('TrainingPlanComment', back_populates='training_plans', cascade="all, delete-orphan")
    training_plan_followings = db.relationship('TrainingPlanFollowing', back_populates='training_plans', cascade="all, delete-orphan")
    training_plan_tags = db.relationship('TrainingPlanTag', back_populates='training_plans', cascade="all, delete-orphan")
    question_following = db.relationship('QuestionFollowing', back_populates='question', cascade="all, delete-orphan")
    question_tags = db.relationship('QuestionTag', back_populates='question', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'body': self.body,
            'user_id': self.user_id,
            'activities_id': self.activities_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
