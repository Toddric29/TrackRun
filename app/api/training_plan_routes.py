from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity, db, TrainingPlanComment, TrainingPlanTag, Tag
from app.forms import TrainingPlanForm, TrainingPlanCommentForm, TagForm, ActivityForm

training_plan_routes = Blueprint('training-plans', __name__)

##Get all training plans
@training_plan_routes.route('/')
def training_plans():
    training_plans = TrainingPlan.query.all()
    return [training_plan.to_dict() for training_plan in training_plans]

##Get training plan details
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
        'user_id': plan.user.id,
        'created_at': plan.created_at,
        'updated_at': plan.updated_at
    })

##Get all activities for a training plan
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
           "id": plan.id,
            "title": plan.title,
            "body": plan.body,
            "user_id": current_user.id,
            "created_at": plan.created_at,
            "updated_at": plan.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

# Create Activity
@training_plan_routes.route('/<int:id>/activities', methods=["POST"])
@login_required
def create_activity(id):
    plan = TrainingPlan.query.get(id)
    # If plan doesn't exist
    if not plan:
        return jsonify({"message": "Training Plan couldn't be found"}), 404
    if plan.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to edit this plan"}), 403
    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
       activity = Activity(
          title=form.data['title'],
          body=form.data['body'],
          user_id=current_user.id
          )
       db.session.add(activity)
       db.session.commit()
       planactivity = TrainingPlanActivity(
          training_plan_id = id,
          activity_id = activity.id,
          activity_order = 1
       )
       db.session.add(planactivity)
       db.session.commit()
       res = {
          "id": activity.id,
          "title": activity.title,
          "body": activity.body,
          "user_id": current_user.id,
          "created_at": activity.created_at,
          "updated_at": activity.updated_at
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

#Get training plan comments
@training_plan_routes.route('/<int:training_plan_id>/comments', methods=['GET'])
def plan_comments(training_plan_id):
    comments = TrainingPlanComment.query.join(TrainingPlan).filter(TrainingPlanComment.training_plan_id == training_plan_id).all()

    comments_res = [
        {
            'id': comment.id,
            'user_id': comment.user_id,
            'training_plan_id': comment.training_plan_id,
            'comment': comment.comment,
            'User': {
                'id': comment.user.id,
                'username': comment.user.username,
                'email': comment.user.email
            }
        } for comment in comments]


    return jsonify(comments_res)

# Create a training plan comment
@training_plan_routes.route('/<int:training_plan_id>/comments', methods=['POST'])
@login_required
def create_comment(training_plan_id):

    plan = TrainingPlan.query.get(training_plan_id)
    if not plan:
        return jsonify({"error": "Training Plan couldn't be found"}), 404

    form = TrainingPlanCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = TrainingPlanComment(
            user_id=current_user.id,
            training_plan_id=training_plan_id,
            comment=form.data['comment']
        )

        db.session.add(comment)
        db.session.commit()
        res = {
            "id": comment.id,
            "user_id": comment.user_id,
            "training_plan_id": comment.training_plan_id,
            "comment": comment.comment,
            'created_at': comment.created_at,
            'updated_at': comment.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

# Get all Tags of a Plan Based on the Plan's id
@training_plan_routes.route('/<int:training_plan_id>/tags')
def get_tags(training_plan_id):
  plan = TrainingPlan.query.get(training_plan_id)
  if not plan:
    return jsonify({"error": "Training Plan not found"}), 404

  tags = TrainingPlanTag.query.filter(TrainingPlanTag.training_plan_id == training_plan_id).all()

  tag_res = [
      {
        'id': tag.tags.id,
        'name': tag.tags.name
      }
    for tag in tags]


  return jsonify(tag_res)

# Add a Tag For a Plan Based on the Plan's id
@training_plan_routes.route('/<int:training_plan_id>/tags', methods=['POST'])
@login_required
def add_tags(training_plan_id):
  plan = TrainingPlan.query.get(training_plan_id)
  if not plan:
    return jsonify({"error": "Training Plan not found"}), 404
  elif current_user.id != plan.user.id:
    return jsonify({"message": "Unauthorized"}), 401
  form = TagForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if form.validate_on_submit():
    name = form.data['name']
    tag = Tag.query.filter_by(name=name).first()
    if not tag:
      newTag = Tag(
        name = name
      )
      db.session.add(newTag)
      db.session.commit()
      tag = newTag
    plantag = TrainingPlanTag(
      training_plan_id = training_plan_id,
      tag_id = tag.id
    )
    db.session.add(plantag)
    db.session.commit()
    res = {
      "id": tag.id,
      "name": name
    }
    return jsonify(res), 200
  else:
    return form.errors, 400

#Delete a Tag
@training_plan_routes.route('/<int:training_plan_id>/tags/<int:tag_id>', methods=['DELETE'])
@login_required
def delete_tags(training_plan_id, tag_id):
  plan = TrainingPlan.query.get(training_plan_id)

  if not plan:
    return jsonify({"error": "Training Plan not found"}), 404

  elif current_user.id != plan.user.id:
    return jsonify({"message": "Unauthorized"}), 401

  plantag = TrainingPlanTag.query.get((training_plan_id, tag_id))
  db.session.delete(plantag)

  db.session.commit()

  return jsonify({"message": "Successfully deleted"})

# Get all plans of a specific tag
@training_plan_routes.route('/tags/<int:tag_id>', methods=['GET'])
def get_plans_by_tag(tag_id):
  tag = Tag.query.filter(Tag.id == tag_id).first()

  if tag:
    plantags = TrainingPlanTag.query.filter(TrainingPlanTag.tag_id == tag_id).all()

    return jsonify([
        {
          'Tags': [plantag.tags.to_dict() for plantag in TrainingPlanTag.query.filter(TrainingPlanTag.tag_id == plantag.tag_id).all()],
          'id': plantag.tag_id,
          'title': plantag.training_plans.title,
          'training_plan_id': plantag.training_plans.id,
          'body': plantag.training_plans.body
        }
        for plantag in plantags
      ]
    ), 200
  else:
    return jsonify({
       []
    }), 200

#Follow a Training Plan
@training_plan_routes.route('/<int:training_plan_id>/follow', methods=['POST'])
@login_required
def follow_question(training_plan_id):
    plan = TrainingPlan.query.get(training_plan_id)
    if not plan:
        return jsonify({"error": "Training Plan not found"}), 404

    following = TrainingPlanFollowing(user_id=current_user.id, training_plan_id=training_plan_id)
    db.session.add(following)
    try:
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "You are already following this training plan."}), 400

    res = {
        'message': 'Saved for Later'
    }
    return jsonify(res), 200

# Unfollow a Training Plan
@training_plan_routes.route('/<int:training_plan_id>/follow', methods=['DELETE'])
@login_required
def unfollow_question(training_plan_id):
    following = TrainingPlanFollowing.query.get([current_user.id, training_plan_id])
    if not following:
       return jsonify({"message": "Training Plan couldn't be found in your saved list"}), 404
    db.session.delete(following)
    db.session.commit()
    res = {
       'message': 'Training Plan unsaved'
    }
    return jsonify(res), 200

##Delete a Training Plan comment
@training_plan_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = TrainingPlanComment.query.get(comment_id)

    # Check if comment exists
    if not comment:
        return jsonify({"error": "Comment couldn't be found"}), 404

    # Check if authorized
    if comment.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})
