from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class ActivityCommentForm(FlaskForm):
    comment = StringField('comment', validators=[DataRequired()])
