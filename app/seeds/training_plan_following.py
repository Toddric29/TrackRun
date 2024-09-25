from app.models import db, TrainingPlanFollowing, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_following():
    demo = TrainingPlanFollowing(
        user_id=3, training_plan_id=2
    )
    demo2 = TrainingPlanFollowing(
        user_id=1, training_plan_id=3
    )
    demo3 = TrainingPlanFollowing(
        user_id=2, training_plan_id=4
    )

    demo4 = TrainingPlanFollowing(
        user_id=4, training_plan_id=1
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_training_plan_following():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_following RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_following"))

    db.session.commit()
