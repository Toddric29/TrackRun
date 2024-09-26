from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity, db
from app.forms import TrainingPlanForm

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

# Create Plan
@training_plan_routes.route('/', methods=["POST"])
@login_required
def create_plan():
    form = TrainingPlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        plan = TrainingPlan(
            title=form.data['title'],
            body=form.data['body'],
            user_id=current_user.id
        )
        db.session.add(plan)
        db.session.commit()
        res = {
            "title": plan.title,
            "body": plan.body,
            "user_id": current_user.id,
            "created_at": plan.created_at,
            "updated_at": plan.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401
#Edit a plan
@training_plan_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_plan(id):
    plan = TrainingPlan.query.get(id)
    # If plan doesn't exist
    if not plan:
        return jsonify({"message": "Training Plan couldn't be found"}), 404
    if plan.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to edit this plan"}), 403

    form = TrainingPlanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        plan.title=form.data['title']
        plan.body=form.data['body']

        db.session.commit()

        res = {
            "title": plan.title,
            "body": plan.body,
            "user_id": current_user.id,
            "created_at": plan.created_at,
            "updated_at": plan.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

# Delete a Plan
@training_plan_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plan(id):
    plan = TrainingPlan.query.get(id)

    if not plan:
        return jsonify({"message": "Training Plan couldn't be found"}), 404

    if plan.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete this plan"}), 403

    db.session.delete(plan)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})
