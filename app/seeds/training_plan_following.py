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

    demo5 = TrainingPlanFollowing(
        user_id=3, training_plan_id=11
    )
    demo6 = TrainingPlanFollowing(
        user_id=1, training_plan_id=10
    )
    demo7 = TrainingPlanFollowing(
        user_id=2, training_plan_id=9
    )

    demo8 = TrainingPlanFollowing(
        user_id=4, training_plan_id=8
    )

    demo9 = TrainingPlanFollowing(
        user_id=3, training_plan_id=5
    )
    demo10 = TrainingPlanFollowing(
        user_id=1, training_plan_id=6
    )
    demo11 = TrainingPlanFollowing(
        user_id=2, training_plan_id=7
    )

    demo12 = TrainingPlanFollowing(
        user_id=4, training_plan_id=9
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
    db.session.add(demo12)
    db.session.commit()


def undo_training_plan_following():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_following RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_following"))

    db.session.commit()
