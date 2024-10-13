from app.models import db, TrainingPlanComment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_comment():
    demo = TrainingPlanComment(
        comment='This plan helped improve my PR by 4 minutes!', user_id=2,
        training_plan_id=2
    )
    demo2 = TrainingPlanComment(
        comment='Halfway through this plan. Results are solid so far.', user_id=3,
        training_plan_id=1
    )
    demo3 = TrainingPlanComment(
        comment='This plan made me realize that I am not as fit as I thought. Is there an easier plan?', user_id=1,
        training_plan_id=2
    )

    demo4 = TrainingPlanComment(
        comment='Looking forward to starting this!', user_id=4,
        training_plan_id=3
    )

    demo5 = TrainingPlanComment(
        comment='I did everything this plan asked of me, but still feel short of the promised time', user_id=3,
        training_plan_id=5
    )
    demo6 = TrainingPlanComment(
        comment='Completed the program. Fell short of the time I wanted but still got a PR!', user_id=2,
        training_plan_id=6
    )
    demo7 = TrainingPlanComment(
        comment='The activities on this are challenging but fun.', user_id=4,
        training_plan_id=7
    )

    demo8 = TrainingPlanComment(
        comment='I have been trying to break 40 for a while, hopefully this plan helps me finally do it', user_id=4,
        training_plan_id=8
    )

    demo9 = TrainingPlanComment(
        comment='This plan helped improve my PR by 4 minutes!', user_id=3,
        training_plan_id=9
    )
    demo10 = TrainingPlanComment(
        comment='Just got into running. This plan seems perfect for me.', user_id=2,
        training_plan_id=10
    )
    demo11 = TrainingPlanComment(
        comment='The difficulty says it amatuer but I am really struggling. IS there an easier plan?', user_id=4,
        training_plan_id=11
    )

    demo12 = TrainingPlanComment(
        comment='Looking forward to starting this!', user_id=2,
        training_plan_id=12
    )

    demo13 = TrainingPlanComment(
        comment='This plan helped improve my PR by 4 minutes!', user_id=3,
        training_plan_id=4
    )
    demo14 = TrainingPlanComment(
        comment='Halfway through this plan. Results are solid so far.', user_id=1,
        training_plan_id=7
    )
    demo15 = TrainingPlanComment(
        comment='The difficulty says it easy but I am really struggling. IS there an easier plan?', user_id=2,
        training_plan_id=8
    )

    demo16 = TrainingPlanComment(
        comment='Looking forward to starting this!', user_id=1,
        training_plan_id=3
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
    db.session.add(demo13)
    db.session.add(demo14)
    db.session.add(demo15)
    db.session.add(demo16)
    db.session.commit()


def undo_training_plan_comment():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_comments"))

    db.session.commit()
