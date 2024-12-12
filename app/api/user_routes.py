from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, TrainingPlan, TrainingPlanFollowing, TrainingPlanLike

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/training-plans')
@login_required
def user_plans():
    plans = TrainingPlan.query.join(User).filter(TrainingPlan.user_id == current_user.id).all()


    plans_res = [
            {
                'id': plan.id,
                'user_id': plan.user_id,
                'title': plan.title,
                'body': plan.body,
                'created_at': plan.created_at,
                'updated_at': plan.updated_at
                } for plan in plans]


    return jsonify(plans_res)

@user_routes.route('/training-plans/following')
def plans_followed():
    followed_plans = TrainingPlanFollowing.query.join(TrainingPlan).filter(TrainingPlanFollowing.user_id == current_user.id).all()

    response = [
            {
                'id': followed_plan.training_plans.id,
                'user_id': followed_plan.user_id,
                'title': followed_plan.training_plans.title,
                'body': followed_plan.training_plans.body,
                'created_at': followed_plan.created_at
            }
            for followed_plan in followed_plans
        ]

    return jsonify(response)

@user_routes.route('/training-plans/like')
def plans_liked():
    liked_plans = TrainingPlanLike.query.join(TrainingPlan).filter(TrainingPlanLike.user_id == current_user.id).all()

    response = [
            {
                'id': liked_plan.training_plans.id,
                'user_id': liked_plan.user_id,
                'title': liked_plan.training_plans.title,
                'body': liked_plan.training_plans.body,
                'created_at': liked_plan.created_at
            }
            for liked_plan in liked_plans
        ]

    return jsonify(response)
