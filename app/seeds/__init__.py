from flask.cli import AppGroup
from .users import seed_users, undo_users
from .activities import seed_activities, undo_activities
from .activity_comments import seed_activity_comment, undo_activity_comment
from .tag_category import seed_tag_category, undo_tag_category
from .tags import seed_tag, undo_tag
from .training_plan_comments import seed_training_plan_comment, undo_training_plan_comment
from .training_plan_following import seed_training_plan_following, undo_training_plan_following
from .training_plan_like import seed_training_plan_like, undo_training_plan_like
from .training_plan_tags import seed_training_plan_tag, undo_training_plan_tag
from .training_plans import seed_training_plan, undo_training_plan
from .training_plan_activities import seed_training_plan_activities, undo_training_plan_activities

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_activities()
        undo_activity_comment()
        undo_tag_category()
        undo_tag()
        undo_training_plan_comment()
        undo_training_plan_following()
        undo_training_plan_like()
        undo_training_plan_tag()
        undo_training_plan()
        undo_training_plan_activities()
    seed_users()
    seed_activities()
    seed_activity_comment()
    seed_tag_category()
    seed_tag()
    seed_training_plan()
    seed_training_plan_comment()
    seed_training_plan_following()
    seed_training_plan_like()
    seed_training_plan_tag()
    seed_training_plan_activities()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_activities()
    undo_activity_comment()
    undo_tag_category()
    undo_tag()
    undo_training_plan_comment()
    undo_training_plan_following()
    undo_training_plan_like()
    undo_training_plan_tag()
    undo_training_plan()
    undo_training_plan_activities()
    # Add other undo functions here
