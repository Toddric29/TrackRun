from app.models import db, ActivityComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_activity_comment():
    demo = ActivityComment(
        comment='This is one of my favorite workouts.', user_id=1, activity_id=1
    )
    demo2 = ActivityComment(
        comment='I talk on the phone during this workout to make sure I am not going to fast.', user_id=2, activity_id=2
    )
    demo3 = ActivityComment(
        comment='Should I be concerned if this workout challenges me?', user_id=3, activity_id=3
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


def undo_activity_comment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.activity_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activity_comments"))

    db.session.commit()
