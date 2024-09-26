from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity

training_plan_routes = Blueprint('training-plans', __name__)

"Get all training plans"
@training_plan_routes.route('/')
def training_plans():
    training_plans = TrainingPlan.query.all()
    return [training_plan.to_dict() for training_plan in training_plans]

"Get training plan details"
@training_plan_routes.route('/<int:id>')
def get_plan(id):
    plan_res = TrainingPlan.query.get(id)
    if not plan_res:
        return jsonify({"error": "Training plan couldn't be found"}), 404
    user = User.query.filter(User.id == plan_res.user_id).first()

    plan = {
        'id': plan_res.id,
        'title': plan_res.title,
        'body': plan_res.body,
        'username': user.username,
        'created_at': plan_res.created_at,
        'updated_at': plan_res.updated_at
    }

    return jsonify(plan)

"Get all activities for a training plan"
# @training_plan_routes.route('/<int:id>/activity')
# def get_plan(id):
#     plan_res = TrainingPlan.query.get(id)
#     user = User.query.filter(User.id == plan_res.user_id).first()
#     if not plan_res:
#         return jsonify({"error": "Training plan couldn't be found"}), 404

#     plan = {
#         'id': plan_res.id,
#         'title': plan_res.title,
#         'body': plan_res.body,
#         'username': user.username,
#         'created_at': plan_res.created_at,
#         'updated_at': plan_res.updated_at
#     }

#     return jsonify(plan)
