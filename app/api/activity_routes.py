from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity, db, TrainingPlanComment, TrainingPlanTag, Tag, ActivityComment
from app.forms import TrainingPlanForm, TrainingPlanCommentForm, TagForm, ActivityForm, ActivityCommentForm

activity_routes = Blueprint('activity', __name__)

#Edit an activity
@activity_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_activity(id):
    activity = Activity.query.get(id)
    # If activity doesn't exist
    if not activity:
        return jsonify({"message": "Activity couldn't be found"}), 404
    if activity.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to edit this activity"}), 403

    form = ActivityForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        activity.title=form.data['title']
        activity.body=form.data['body']

        db.session.commit()

        res = {
            "title": activity.title,
            "body": activity.body,
            "user_id": current_user.id,
            "created_at": activity.created_at,
            "updated_at": activity.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

# Delete an Activity
@activity_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_plan(id):
    activity = Activity.query.get(id)

    if not activity:
        return jsonify({"message": "Activity couldn't be found"}), 404

    if activity.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete this activity"}), 403

    db.session.delete(activity)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})

#Get activity comments
@activity_routes.route('/<int:activity_id>/comments', methods=['GET'])
def activity_comments(activity_id):
    activity = Activity.query.get(activity_id)

    if not activity:
        return jsonify({"message": "Activity couldn't be found"}), 404

    comments = ActivityComment.query.join(Activity).filter(ActivityComment.activity_id == activity_id).all()

    comments_res = [
        {
            'id': comment.id,
            'user_id': comment.user_id,
            'activity_id': comment.activity_id,
            'comment': comment.comment,
            'User': {
                'id': comment.user.id,
                'username': comment.user.username,
                'email': comment.user.email
            }
        } for comment in comments]


    return jsonify(comments_res)

# Create a activity comment
@activity_routes.route('/<int:activity_id>/comments', methods=['POST'])
@login_required
def create_comment(activity_id):

    activity = Activity.query.get(activity_id)
    if not activity:
        return jsonify({"error": "Activity couldn't be found"}), 404

    form = ActivityCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = ActivityComment(
            user_id=current_user.id,
            activity_id=activity_id,
            comment=form.data['comment']
        )

        db.session.add(comment)
        db.session.commit()
        res = {
            "id": comment.id,
            "user_id": comment.user_id,
            "activity_id": comment.activity_id,
            "comment": comment.comment,
            'created_at': comment.created_at,
            'updated_at': comment.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401

##Delete an Activity comment
@activity_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = ActivityComment.query.get(comment_id)

    # Check if comment exists
    if not comment:
        return jsonify({"error": "Comment couldn't be found"}), 404

    # Check if authorized
    if comment.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to delete comment"}), 403

    db.session.delete(comment)
    db.session.commit()

    return jsonify({"message": "Successfully deleted"})
