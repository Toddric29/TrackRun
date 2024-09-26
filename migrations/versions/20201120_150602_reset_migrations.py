"""Reset Migrations

Revision ID: ffdc0a98111c
Revises:
Create Date: 2020-11-20 15:06:02.230689

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.sql import func

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ffdc0a98111c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=40), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
    # ### end Alembic commands ###qqqqqqqqq

    op.create_table('training_plans',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=5000), nullable=False),
    sa.Column('body', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    # sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    # sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE training_plans SET SCHEMA {SCHEMA};")

    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=5000), nullable=False),
    sa.Column('body', sa.String(length=250), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE activities SET SCHEMA {SCHEMA};")

    op.create_table('training_plan_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=5000), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('training_plan_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['training_plan_id'], ['training_plans.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE training_plan_comments SET SCHEMA {SCHEMA};")

    op.create_table('training_plan_following',
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('training_plan_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['training_plan_id'], ['training_plans.id'], ),
    sa.PrimaryKeyConstraint('user_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE training_plan_following SET SCHEMA {SCHEMA};")

    op.create_table('tag_category',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=5000), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tag_category SET SCHEMA {SCHEMA};")

    op.create_table('tags',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=5000), nullable=False),
    sa.Column('category_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.ForeignKeyConstraint(['category_id'], ['tag_category.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE tags SET SCHEMA {SCHEMA};")

    op.create_table('activity_comments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('comment', sa.String(length=5000), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.Column('updated_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now(), onupdate=sa.func.now()),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ),
    sa.PrimaryKeyConstraint('id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE activity_comments SET SCHEMA {SCHEMA};")

    op.create_table('training_plan_tags',
    sa.Column('training_plan_id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.ForeignKeyConstraint(['training_plan_id'], ['training_plans.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tags.id'], ),
    sa.PrimaryKeyConstraint('training_plan_id')
    )

    op.create_table('training_plan_activities',
    sa.Column('training_plan_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.Column('order', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.TIMESTAMP(timezone=True), server_default=sa.func.now()),
    sa.ForeignKeyConstraint(['training_plan_id'], ['training_plans.id'], ),
    sa.ForeignKeyConstraint(['activity_id'], ['activity.id'], ),
    sa.PrimaryKeyConstraint('training_plan_id')
    )

    if environment == "production":
        op.execute(f"ALTER TABLE training_plan_following SET SCHEMA {SCHEMA};")

def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('training_plan_activities')
    op.drop_table('training_plan_tags')
    op.drop_table('activity_comments')
    op.drop_table('tags')
    op.drop_table('tag_category')
    op.drop_table('training_plan_following')
    op.drop_table('training_plan_comments')
    op.drop_table('activities')
    op.drop_table('training_plans')
    op.drop_table('users')
    # ### end Alembic commands ###