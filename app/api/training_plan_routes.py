from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity

training_plan_routes = Blueprint('training-plans', __name__)

"Get all training plans"
@training_plan_routes.route('/')
def training_plans():
    training_plans = TrainingPlan.query.all()
    return [training_plan.to_dict() for training_plan in training_plans]

"Get training plan details"
@training_plan_routes.route('/<int:id>')
def get_plan(id):
    plan = TrainingPlan.query.options(joinedload(TrainingPlan.user, innerjoin=True)).get(id)

    if not plan:
        return jsonify({"error": "Training plan couldn't be found"}), 404

    return jsonify({
        'id': plan.id,
        'title': plan.title,
        'body': plan.body,
        'username': plan.user.username,
        'created_at': plan.created_at,
        'updated_at': plan.updated_at
    })

"Get all activities for a training plan"
@training_plan_routes.route('/<int:id>/activity')
def get_activities(id):
    plan = TrainingPlan.query.options(joinedload(TrainingPlan.training_plan_activities).joinedload(TrainingPlanActivity.activities)).get(id)

    if not plan:
        return jsonify({"error": "Training plan couldn't be found"}), 404

    response = [
        {
            'id': activity.activities.id,
            'title': activity.activities.title,
            'body': activity.activities.body
        } for activity in plan.training_plan_activities]
    return jsonify(response)
