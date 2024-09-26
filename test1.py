from flask import Flask, request, jsonify

app = Flask(__name__)

def determine_personality_type(group, scores):
    """
    Function to determine the specific personality type within the group.
    
    Args:
    - group (str): The personality group (e.g., "Analysts", "Diplomats", etc.)
    - scores (list): A list of scores corresponding to questions related to personality traits.
    
    Returns:
    - str: The determined personality type (e.g., "INTJ", "ENFJ", etc.)
    """
    
    # Placeholder for personality type
    personality_type = ""

    # Analyze scores for each personality type based on characteristics
    if group == "Analysts":
        # Criteria for INTJ, INTP, ENTJ, ENTP
        if scores[0] > 5:  # Example: higher score on analytical thinking questions
            personality_type = "INTJ"  # More focused on strategy and long-term planning
        elif scores[1] > 5:  # Questions related to abstract thinking
            personality_type = "INTP"  # Prefers exploring concepts and theories
        elif scores[2] > 5:  # Leadership-oriented questions
            personality_type = "ENTJ"  # Assertive and enjoys leading
        else:
            personality_type = "ENTP"  # Innovative and likes debating ideas

    elif group == "Diplomats":
        # Criteria for INFJ, INFP, ENFJ, ENFP
        if scores[3] > 5:  # Questions focused on empathy and understanding others
            personality_type = "INFJ"  # Visionary and values deep connections
        elif scores[4] > 5:  # Creativity and values personal beliefs
            personality_type = "INFP"  # Idealistic and driven by values
        elif scores[5] > 5:  # Leadership and social awareness questions
            personality_type = "ENFJ"  # Charismatic and supportive leader
        else:
            personality_type = "ENFP"  # Energetic and loves new ideas

    elif group == "Sentinels":
        # Criteria for ISTJ, ISFJ, ESTJ, ESFJ
        if scores[6] > 5:  # Dependability and structure-oriented questions
            personality_type = "ISTJ"  # Practical and values traditions
        elif scores[7] > 5:  # Nurturing and supportive behaviors
            personality_type = "ISFJ"  # Caring and attentive to others' needs
        elif scores[8] > 5:  # Direct and organized leadership questions
            personality_type = "ESTJ"  # Efficient and enjoys responsibility
        else:
            personality_type = "ESFJ"  # Sociable and values harmony

    elif group == "Explorers":
        # Criteria for ISTP, ISFP, ESTP, ESFP
        if scores[9] > 5:  # Questions related to problem-solving and practicality
            personality_type = "ISTP"  # Analytical and likes hands-on work
        elif scores[10] > 5:  # Artistic inclination and personal expression
            personality_type = "ISFP"  # Sensitive and values aesthetics
        elif scores[11] > 5:  # Adventurous and action-oriented questions
            personality_type = "ESTP"  # Bold and enjoys spontaneity
        else:
            personality_type = "ESFP"  # Enthusiastic and lives in the moment

    # Return the determined personality type
    return personality_type

@app.route('/submit_test', methods=['POST'])
def submit_test():
    data = request.json
    group = data.get('group')  # e.g., "Analysts"
    scores = data.get('scores')  # e.g., [6, 3, 5, ...]

    # Validate scores length based on expected number of questions
    if len(scores) != 12:
        return jsonify({"error": "Invalid number of scores"}), 400

    # Determine personality type based on scores
    personality_type = determine_personality_type(group, scores)

    # Return the result as JSON
    return jsonify({"personality_type": personality_type})

if __name__ == '__main__':
    app.run(debug=True)