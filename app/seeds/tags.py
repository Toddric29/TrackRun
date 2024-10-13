from app.models import db, Tag, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tag():
    demo = Tag(
        name='10K', category_id='3'
    )
    demo2 = Tag(
        name='Marathon', category_id='3'
    )
    demo3 = Tag(
        name='Half Marathon', category_id='3'
    )

    demo4 = Tag(
        name='5K', category_id='3'
    )

    demo5 = Tag(
        name='Beginner', category_id='1'
    )
    demo6 = Tag(
        name='Expert', category_id='1'
    )
    demo7 = Tag(
        name='Amatuer', category_id='1'
    )

    demo8 = Tag(
        name='Experienced', category_id='1'
    )

    demo9 = Tag(
        name='6 months', category_id='2'
    )
    demo10 = Tag(
        name='3 months', category_id='2'
    )
    demo11 = Tag(
        name='5 months', category_id='2'
    )

    demo12 = Tag(
        name='2 months', category_id='2'
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


def undo_tag():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
