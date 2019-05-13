from flask_babel import lazy_gettext as _

# Set up default error and warning messages
error_messages = {
    'MANDATORY_QUESTION': _('Enter an answer to continue.'),
    'MANDATORY_TEXTFIELD': _('Enter an answer to continue.'),
    'MANDATORY_NUMBER': _('Enter an answer to continue.'),
    'MANDATORY_TEXTAREA': _('Enter an answer to continue.'),
    'MANDATORY_RADIO': _('Select an answer to continue.'),
    'MANDATORY_DROPDOWN': _('Select an answer to continue.'),
    'MANDATORY_CHECKBOX': _('Select all that apply to continue.'),
    'MANDATORY_DATE': _('Enter a date to continue.'),
    'MANDATORY_DURATION': _('Enter a duration to continue.'),
    'NUMBER_TOO_SMALL': _('Enter an answer more than or equal to %(min)s.'),
    'NUMBER_TOO_LARGE': _('Enter an answer less than or equal to %(max)s.'),
    'NUMBER_TOO_SMALL_EXCLUSIVE': _('Enter an answer more than %(min)s.'),
    'NUMBER_TOO_LARGE_EXCLUSIVE': _('Enter an answer less than %(max)s.'),
    'TOTAL_SUM_NOT_EQUALS': _('Enter answers that add up to %(total)s'),
    'TOTAL_SUM_NOT_LESS_THAN_OR_EQUALS': _(
        'Enter answers that add up to or are less than %(total)s'
    ),
    'TOTAL_SUM_NOT_LESS_THAN': _('Enter answers that add up to less than %(total)s'),
    'TOTAL_SUM_NOT_GREATER_THAN': _(
        'Enter answers that add up to greater than %(total)s'
    ),
    'TOTAL_SUM_NOT_GREATER_THAN_OR_EQUALS': _(
        'Enter answers that add up to or are greater than %(total)s'
    ),
    'INVALID_NUMBER': _('Enter a number.'),
    'INVALID_INTEGER': _('Enter a whole number.'),
    'INVALID_DECIMAL': _('Enter a number rounded to %(max)d decimal places.'),
    'MAX_LENGTH_EXCEEDED': _(
        'Your answer is too long, it has to be less than %(max)d characters.'
    ),
    'INVALID_DATE': _('Enter a valid date.'),
    'INVALID_DATE_RANGE': _(
        "Enter a 'period to' date later than the 'period from' date."
    ),
    'INVALID_DURATION': _('Enter a valid duration.'),
    'DATE_PERIOD_TOO_SMALL': _(
        'Enter a reporting period greater than or equal to %(min)s.'
    ),
    'DATE_PERIOD_TOO_LARGE': _(
        'Enter a reporting period less than or equal to %(max)s.'
    ),
    'SINGLE_DATE_PERIOD_TOO_EARLY': _('Enter a date after %(min)s.'),
    'SINGLE_DATE_PERIOD_TOO_LATE': _('Enter a date before %(max)s.'),
    'MUTUALLY_EXCLUSIVE': _('Remove an answer to continue.'),
}
