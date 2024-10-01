from app.models import db, TrainingPlan, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan():
    demo = TrainingPlan(
        title='Intense Marathon Training Plan', body='This 6 month program is desgined to help you break 3 hours and 30 minutes in the marathon.',
        user_id=1
    )
    demo2 = TrainingPlan(
        title='Half Marathon Training Plan', body='This 6 month program is desgined to help you break 2 hours in the half marathon.',
        user_id=3
    )
    demo3 = TrainingPlan(
        title='5K Training Plan', body='This 3 month program is desgined to help you break 20 minutes in the 5K.',
        user_id=2
    )

    demo4 = TrainingPlan(
        title='10K Training Plan', body='This 3 month program is desgined to help you break 50 minutes in the 10K.',
        user_id=4
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_training_plan():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plans"))

    db.session.commit()
