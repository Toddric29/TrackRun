from .db import db, environment, SCHEMA, add_prefix_for_prod



class ActivityComment(db.Model):
    __tablename__ = 'activity_comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(5000), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("activities.id")), nullable=False)
    created_at = db.Column(db.TIMESTAMP(timezone=True))
    updated_at = db.Column(db.TIMESTAMP(timezone=True))

    user = db.relationship('User', back_populates='activity_comments')
    activities = db.relationship('Activity', back_populates='activity_comments')

    def to_dict(self):
        return {
            'id': self.id,
            'comment': self.comment,
            'user_id': self.user_id,
            'activity_id': self.activity_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
