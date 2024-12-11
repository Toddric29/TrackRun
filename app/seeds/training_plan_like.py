from app.models import db, TrainingPlanLike, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_like():
    demo = TrainingPlanLike(
        user_id=1, training_plan_id=2
    )
    demo2 = TrainingPlanLike(
        user_id=2, training_plan_id=3
    )
    demo3 = TrainingPlanLike(
        user_id=3, training_plan_id=4
    )

    demo4 = TrainingPlanLike(
        user_id=2, training_plan_id=1
    )

    demo5 = TrainingPlanLike(
        user_id=1, training_plan_id=11
    )
    demo6 = TrainingPlanLike(
        user_id=1, training_plan_id=10
    )
    demo7 = TrainingPlanLike(
        user_id=2, training_plan_id=9
    )

    demo8 = TrainingPlanLike(
        user_id=4, training_plan_id=8
    )

    demo9 = TrainingPlanLike(
        user_id=3, training_plan_id=5
    )
    demo10 = TrainingPlanLike(
        user_id=1, training_plan_id=6
    )
    demo11 = TrainingPlanLike(
        user_id=2, training_plan_id=7
    )

    demo12 = TrainingPlanLike(
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


def undo_training_plan_like():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_like RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_like"))

    db.session.commit()
