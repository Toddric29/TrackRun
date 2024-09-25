from app.models import db, Activity, environment, SCHEMA
from sqlalchemy.sql import text

def seed_activities():
    demo = Activity(
        title='5 1K reps @ Half Marathon pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=1
    )
    demo2 = Activity(
        title='10 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=2
    )
    demo3 = Activity(
        title='7 miles at marathon pace', body='Designed to get you accustomed to running at your marathon pace for an extended period of time.',
        user_id=3
    )
    demo4 = Activity(
        title='13 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=2
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activities"))

    db.session.commit()
