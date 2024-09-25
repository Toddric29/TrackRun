from app.models import db, TrainingPlanComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_comment():
    demo = TrainingPlanComment(
        comment='This plan helped improve my PR by 4 minutes!', user_id=3,
        training_plan_id=2
    )
    demo2 = TrainingPlanComment(
        comment='Halfway through this plan. Results are solid so far.', user_id=2,
        training_plan_id=1
    )
    demo3 = TrainingPlanComment(
        comment='The difficulty says it easy but I am really struggling. IS there an easier plan?', user_id=1,
        training_plan_id=2
    )

    demo4 = TrainingPlanComment(
        comment='Looking forward to starting this!', user_id=2,
        training_plan_id=3
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_training_plan_comment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_comments"))

    db.session.commit()
