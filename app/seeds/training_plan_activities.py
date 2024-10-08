from app.models import db, TrainingPlanActivity, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_activities():
    demo = TrainingPlanActivity(
        training_plan_id=2, activity_id=1, activity_order=1
    )
    demo2 = TrainingPlanActivity(
        training_plan_id=4, activity_id=2, activity_order=1
    )
    demo3 = TrainingPlanActivity(
        training_plan_id=3, activity_id=3, activity_order=1
    )

    demo4 = TrainingPlanActivity(
        training_plan_id=2, activity_id=4, activity_order=1
    )

    demo5 = TrainingPlanActivity(
        training_plan_id=1, activity_id=4, activity_order=1
    )
    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.commit()


def undo_training_plan_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_activities"))

    db.session.commit()
