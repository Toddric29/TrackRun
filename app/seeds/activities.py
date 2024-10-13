from app.models import db, Activity, environment, SCHEMA
from sqlalchemy.sql import text

def seed_activities():
    demo = Activity(
        title='5 1K reps @ Half Marathon pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=2
    )
    demo2 = Activity(
        title='10 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=1
    )
    demo3 = Activity(
        title='7 miles at marathon pace', body='Designed to get you accustomed to running at your marathon pace for an extended period of time.',
        user_id=4
    )
    demo4 = Activity(
        title='13 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=1
    )

    demo5 = Activity(
        title='10 1K reps @ Half Marathon pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=3
    )
    demo6 = Activity(
        title='20 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=1
    )
    demo7 = Activity(
        title='14 miles at marathon pace', body='Designed to get you accustomed to running at your marathon pace for an extended period of time.',
        user_id=1
    )
    demo8 = Activity(
        title='5 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=2
    )

    demo9 = Activity(
        title='3 1 mile reps @ 10K pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=2
    )
    demo10 = Activity(
        title='5 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=3
    )
    demo11 = Activity(
        title='8 reps of 800M sprints at 5K pace', body='This will be very difficult. Make sure you are well rest prior to attempting. Take a two minute break in between reps.',
        user_id=3
    )
    demo12 = Activity(
        title='15 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=2
    )

    demo13 = Activity(
        title='30 minute Tempo run (half marathon pace)', body='This workout is fast, but shouldn not feel like a race. If it does, slow down a bit.',
        user_id=1
    )
    demo14 = Activity(
        title='8 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=3
    )
    demo15 = Activity(
        title='12 miles at marathon pace', body='Designed to get you accustomed to running at your marathon pace for an extended period of time.',
        user_id=3
    )
    demo16 = Activity(
        title='22 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=4
    )

    demo17 = Activity(
        title='8 1K reps @ Half Marathon pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=3
    )
    demo18 = Activity(
        title='2 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=2
    )
    demo19 = Activity(
        title='11 miles at marathon pace', body='Designed to get you accustomed to running at your marathon pace for an extended period of time.',
        user_id=3
    )
    demo20 = Activity(
        title='6 reps of 800M sprints at 5K pace', body='This will be very difficult. Make sure you are well rest prior to attempting. Take a two minute break in between reps.',
        user_id=4
    )

    demo21 = Activity(
        title='4 1 mile reps @ 10K pace', body='This is a speed workout, with the goal of challenging you. Do your best to hit consistent paces. Take a 2 minute break in between sets.',
        user_id=4
    )
    demo22 = Activity(
        title='11 miles at easy pace', body='This pace should be conversational. A conversational pace is a pace that can run will talking to someone without heavy breathing.',
        user_id=4
    )
    demo23 = Activity(
        title='7 reps of 800M sprints at 5K pace', body='This will be very difficult. Make sure you are well rest prior to attempting. Take a two minute break in between reps.',
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
    db.session.commit()


def undo_activities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.activities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM activities"))

    db.session.commit()
