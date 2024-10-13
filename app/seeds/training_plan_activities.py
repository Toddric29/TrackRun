from app.models import db, TrainingPlanActivity, environment, SCHEMA
from sqlalchemy.sql import text

def seed_training_plan_activities():
    demo = TrainingPlanActivity(

        training_plan_id=1, activity_id=13, activity_order=1
    )
    demo2 = TrainingPlanActivity(
        training_plan_id=1, activity_id=2, activity_order=1
    )
    demo3 = TrainingPlanActivity(
        training_plan_id=1, activity_id=4, activity_order=1
    )

    demo4 = TrainingPlanActivity(
        training_plan_id=1, activity_id=6, activity_order=1
    )

    demo5 = TrainingPlanActivity(

        training_plan_id=1, activity_id=7, activity_order=1
    )
    demo6 = TrainingPlanActivity(
        training_plan_id=2, activity_id=11, activity_order=1
    )
    demo7 = TrainingPlanActivity(
        training_plan_id=2, activity_id=17, activity_order=1
    )

    demo8 = TrainingPlanActivity(
        training_plan_id=2, activity_id=5, activity_order=1
    )

    demo9 = TrainingPlanActivity(

        training_plan_id=2, activity_id=10, activity_order=1
    )
    demo10 = TrainingPlanActivity(
        training_plan_id=2, activity_id=14, activity_order=1
    )
    demo11 = TrainingPlanActivity(
        training_plan_id=3, activity_id=8, activity_order=1
    )

    demo12 = TrainingPlanActivity(
        training_plan_id=3, activity_id=9, activity_order=1
    )

    demo13 = TrainingPlanActivity(

        training_plan_id=3, activity_id=18, activity_order=1
    )
    demo14 = TrainingPlanActivity(
        training_plan_id=3, activity_id=1, activity_order=1
    )
    demo15 = TrainingPlanActivity(
        training_plan_id=3, activity_id=12, activity_order=1
    )

    demo16 = TrainingPlanActivity(
        training_plan_id=4, activity_id=20, activity_order=1
    )

    demo17 = TrainingPlanActivity(

        training_plan_id=4, activity_id=3, activity_order=1
    )
    demo18 = TrainingPlanActivity(
        training_plan_id=4, activity_id=21, activity_order=1
    )
    demo19 = TrainingPlanActivity(
        training_plan_id=4, activity_id=22, activity_order=1
    )

    demo20 = TrainingPlanActivity(
        training_plan_id=4, activity_id=23, activity_order=1
    )

    demo21 = TrainingPlanActivity(

        training_plan_id=5, activity_id=2, activity_order=1
    )
    demo22 = TrainingPlanActivity(
        training_plan_id=5, activity_id=4, activity_order=1
    )
    demo23 = TrainingPlanActivity(
        training_plan_id=5, activity_id=6, activity_order=1
    )

    demo24 = TrainingPlanActivity(
        training_plan_id=5, activity_id=7, activity_order=1
    )

    demo25 = TrainingPlanActivity(

        training_plan_id=5, activity_id=13, activity_order=1
    )
    demo26 = TrainingPlanActivity(
        training_plan_id=6, activity_id=5, activity_order=1
    )
    demo27 = TrainingPlanActivity(
        training_plan_id=6, activity_id=10, activity_order=1
    )

    demo28 = TrainingPlanActivity(
        training_plan_id=6, activity_id=14, activity_order=1
    )

    demo29 = TrainingPlanActivity(

        training_plan_id=6, activity_id=15, activity_order=1
    )
    demo30 = TrainingPlanActivity(
        training_plan_id=6, activity_id=17, activity_order=1
    )
    demo31 = TrainingPlanActivity(
        training_plan_id=7, activity_id=1, activity_order=1
    )

    demo32 = TrainingPlanActivity(
        training_plan_id=7, activity_id=2, activity_order=1
    )

    demo33 = TrainingPlanActivity(

        training_plan_id=7, activity_id=9, activity_order=1
    )
    demo34 = TrainingPlanActivity(
        training_plan_id=7, activity_id=18, activity_order=1
    )
    demo35 = TrainingPlanActivity(
        training_plan_id=7, activity_id=12, activity_order=1
    )

    demo36 = TrainingPlanActivity(
        training_plan_id=8, activity_id=20, activity_order=1
    )

    demo37 = TrainingPlanActivity(

        training_plan_id=8, activity_id=21, activity_order=1
    )
    demo38 = TrainingPlanActivity(
        training_plan_id=8, activity_id=23, activity_order=1
    )
    demo39 = TrainingPlanActivity(
        training_plan_id=8, activity_id=22, activity_order=1
    )

    demo40 = TrainingPlanActivity(
        training_plan_id=8, activity_id=3, activity_order=1
    )

    demo41 = TrainingPlanActivity(

        training_plan_id=9, activity_id=2, activity_order=1
    )
    demo42 = TrainingPlanActivity(
        training_plan_id=9, activity_id=4, activity_order=1
    )
    demo43 = TrainingPlanActivity(
        training_plan_id=9, activity_id=6, activity_order=1
    )

    demo44 = TrainingPlanActivity(
        training_plan_id=9, activity_id=7, activity_order=1
    )

    demo45 = TrainingPlanActivity(

        training_plan_id=9, activity_id=13, activity_order=1
    )
    demo46 = TrainingPlanActivity(
        training_plan_id=10, activity_id=14, activity_order=1
    )
    demo47 = TrainingPlanActivity(
        training_plan_id=10, activity_id=11, activity_order=1
    )

    demo48 = TrainingPlanActivity(
        training_plan_id=10, activity_id=10, activity_order=1
    )

    demo49 = TrainingPlanActivity(

        training_plan_id=10, activity_id=5, activity_order=1
    )
    demo50 = TrainingPlanActivity(
        training_plan_id=10, activity_id=19, activity_order=1
    )
    demo51 = TrainingPlanActivity(
        training_plan_id=11, activity_id=18, activity_order=1
    )

    demo52 = TrainingPlanActivity(
        training_plan_id=11, activity_id=9, activity_order=1
    )

    demo53 = TrainingPlanActivity(

        training_plan_id=11, activity_id=8, activity_order=1
    )
    demo54 = TrainingPlanActivity(
        training_plan_id=11, activity_id=1, activity_order=1
    )
    demo55 = TrainingPlanActivity(
        training_plan_id=11, activity_id=12, activity_order=1
    )

    demo56 = TrainingPlanActivity(
        training_plan_id=12, activity_id=3, activity_order=1
    )

    demo57 = TrainingPlanActivity(

        training_plan_id=12, activity_id=20, activity_order=1
    )
    demo58 = TrainingPlanActivity(
        training_plan_id=12, activity_id=21, activity_order=1
    )
    demo59 = TrainingPlanActivity(
        training_plan_id=12, activity_id=22, activity_order=1
    )

    demo60 = TrainingPlanActivity(
        training_plan_id=12, activity_id=23, activity_order=1
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
    db.session.add(demo17)
    db.session.add(demo18)
    db.session.add(demo19)
    db.session.add(demo20)
    db.session.add(demo21)
    db.session.add(demo22)
    db.session.add(demo23)
    db.session.add(demo24)
    db.session.add(demo25)
    db.session.add(demo26)
    db.session.add(demo27)
    db.session.add(demo28)
    db.session.add(demo29)
    db.session.add(demo30)
    db.session.add(demo31)
    db.session.add(demo32)
    db.session.add(demo33)
    db.session.add(demo34)
    db.session.add(demo35)
    db.session.add(demo36)
    db.session.add(demo37)
    db.session.add(demo38)
    db.session.add(demo39)
    db.session.add(demo40)
    db.session.add(demo41)
    db.session.add(demo42)
    db.session.add(demo43)
    db.session.add(demo44)
    db.session.add(demo45)
    db.session.add(demo46)
    db.session.add(demo47)
    db.session.add(demo48)
    db.session.add(demo49)
    db.session.add(demo50)
    db.session.add(demo51)
    db.session.add(demo52)
    db.session.add(demo53)
    db.session.add(demo54)
    db.session.add(demo55)
    db.session.add(demo56)
    db.session.add(demo57)
    db.session.add(demo58)
    db.session.add(demo59)
    db.session.add(demo60)
    db.session.commit()


def undo_training_plan_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.training_plan_activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM training_plan_activities"))

    db.session.commit()
