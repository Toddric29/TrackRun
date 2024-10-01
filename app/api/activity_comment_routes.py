from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from sqlalchemy.orm import joinedload
from sqlalchemy.exc import IntegrityError
from app.models import User, TrainingPlan, TrainingPlanFollowing, Activity, TrainingPlanActivity, db, TrainingPlanComment, TrainingPlanTag, Tag, ActivityComment
from app.forms import TrainingPlanForm, TrainingPlanCommentForm, TagForm, ActivityForm, ActivityCommentForm

activity_comment_routes = Blueprint('activity-comments', __name__)

# Update an activity comment
@activity_comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = ActivityComment.query.get(comment_id)
    # Check if comment exists
    if not comment:
        return jsonify({"error": "Comment couldn't be found"}), 404

    # Check if authorized
    if comment.user_id != current_user.id:
        return jsonify({"error": "Not Authorized to update comment"}), 403

    form = ActivityCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment.comment = form.data['comment']

        db.session.commit()

        res = {
            "id": comment.id,
            "user_id": comment.user_id,
            "activity_id": comment.activity_id,
            "comment": comment.comment,
            "created_at": comment.created_at,
            "updated_at": comment.updated_at
        }
        return jsonify(res), 201
    else:
        return form.errors, 401
