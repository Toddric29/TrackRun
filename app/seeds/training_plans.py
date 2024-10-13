from app.models import db, TrainingPlan, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan():
    demo = TrainingPlan(
        title='Intense Marathon Training Plan', body='This 6 month program is desgined to help you break 3 hours and 30 minutes in the marathon. Your half marathon time needs to be faster than 1 hour and 35 minutes before attempting this program',
        user_id=1
    )
    demo2 = TrainingPlan(
        title='Experienced Half Marathon Training Plan', body='This 6 month program is desgined to help you break 3 hours and 30 minutes in the marathon. You should have run multiple 10Ks this year before attempting this program.',
        user_id=3
    )
    demo3 = TrainingPlan(
        title='5K Training Plan', body='This 3 month program is desgined to help you break 20 minutes in the 5K. This requires a mile time of 6 minutes or faster',
        user_id=2
    )

    demo4 = TrainingPlan(
        title='Experienced 10K Training Plan', body='This 3 month program is desgined to help you break 50 minutes in the 10K. You should be able to run a mile in under 7 minutes before attempting this program.',
        user_id=4
    )

    demo5 = TrainingPlan(
        title='Sub 3 Hour Marathon Training Plan', body='This 5 month program is desgined to help you break 3 hours in the marathon. This requires a recent (within the last year) half marathon time of 1 hour and 20 minutes.',
        user_id=1
    )
    demo6 = TrainingPlan(
        title='Intense Half Marathon Training Plan', body='This 6 month program is desgined to help you break 1 hour and 20 minutes in the half marathon. This requires a 10K time of 35 minutes or faster.',
        user_id=3
    )
    demo7 = TrainingPlan(
        title='Elite 5K Training Plan', body='This 2 month program is desgined to help you break 17 minutes in the 5K. You should be able to run a mile in under 5 minutes before attempting this plan.',
        user_id=2
    )

    demo8 = TrainingPlan(
        title=' Elite 10K Training Plan', body='This 3 month program is desgined to help you break 40 minutes in the 10K. This requires a recent 5K time of sub 18',
        user_id=4
    )

    demo9 = TrainingPlan(
        title='Beginner Marathon Training Plan', body='This 6 month program is desgined to help you break 5 hours and 30 minutes in the marathon. It is best to have completed a couple of half marathons before attempting this plan.',
        user_id=1
    )
    demo10 = TrainingPlan(
        title='Beginner Half Marathon Training Plan', body='This 5 month program is desgined to help you break 3 hours in the half marathon.',
        user_id=3
    )
    demo11 = TrainingPlan(
        title='Amatuer 5K Training Plan', body='This 3 month program is desgined to help you break 50 minutes in the 5K.',
        user_id=2
    )

    demo12 = TrainingPlan(
        title='Beginner 10K Training Plan', body='This 2 month program is desgined to help you break 2 hours in the 10K.',
        user_id=4
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


def undo_training_plan():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plans RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plans"))

    db.session.commit()
