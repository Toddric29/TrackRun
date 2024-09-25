from app.models import db, TagCategory, environment, SCHEMA
from sqlalchemy.sql import text

def seed_tag_category():
    demo = TagCategory(
        name='Difficulty'
    )
    demo2 = TagCategory(
        name='Length Of Plan'
    )
    demo3 = TagCategory(
        name='Race Type'
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


def undo_tag_category():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tag_category RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tag_category"))

    db.session.commit()
