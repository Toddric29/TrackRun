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
        name='Half Marathon', category_id='2'
    )

    demo4 = Tag(
        name='5K', category_id='1'
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.commit()


def undo_tag():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tags RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tags"))

    db.session.commit()
