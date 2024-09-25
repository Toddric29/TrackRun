from app.models import db, TrainingPlanTag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_tag():
    demo = TrainingPlanTag(
        training_plan_id=2, tag_id=3,
    )
    demo2 = TrainingPlanTag(
        training_plan_id=1, tag_id=2,
    )
    demo3 = TrainingPlanTag(
        training_plan_id=4, tag_id=1,
    )

    demo4 = TrainingPlanTag(
        training_plan_id=3, tag_id=4,
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_training_plan_tag():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_tags"))

    db.session.commit()
