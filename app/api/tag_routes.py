from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity, db, TrainingPlanComment, TrainingPlanTag, Tag, ActivityComment
from app.forms import TrainingPlanForm, TrainingPlanCommentForm, TagForm, ActivityForm, ActivityCommentForm

tag_routes = Blueprint('tags', __name__)

##Get all tags
@tag_routes.route('')
def tags():
    tags = Tag.query.all()
    return [tag.to_dict() for tag in tags]
