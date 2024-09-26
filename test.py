from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

# Step 1: Assigning Scores
response_scores = {
    "Strongly Agree": 2,
    "Agree": 1,
    "Neutral": 0,
    "Disagree": -1,
    "Strongly Disagree": -2
}

# Step 2: Mapping Questions to Groups
question_group_mapping = {
    "analyticalThinking": "Analysts",
    "creativity": "Diplomats",
    "organization": "Sentinels",
    "adaptability": "Explorers"
}

# Step 3: Personality Profiles
personality_profiles = {
    # Analysts
    "INTJ": {
        "description": "You are a strategic and independent thinker, always planning for the future.",
        "strengths": ["Strategic", "Independent", "Decisive"],
        "growth": ["Can be too focused on the big picture", "May struggle with emotions"],
        "metaphor": "Like a chess master, you always think several moves ahead."
    },
    "ENTJ": {
        "description": "You are a natural-born leader, always taking charge and executing plans.",
        "strengths": ["Leadership", "Ambition", "Efficiency"],
        "growth": ["Can be overly critical", "May come across as harsh"],
        "metaphor": "You are like a captain steering a ship towards new horizons."
    },
    "INTP": {
        "description": "You are a curious and innovative thinker, constantly exploring new ideas.",
        "strengths": ["Curiosity", "Theoretical thinking", "Innovation"],
        "growth": ["Can be disorganized", "May struggle with following through on tasks"],
        "metaphor": "Like a scientist, you are always exploring uncharted intellectual territory."
    },
    "ENTP": {
        "description": "You are a quick thinker and enjoy debating ideas.",
        "strengths": ["Debating", "Creativity", "Adaptability"],
        "growth": ["Can be argumentative", "May struggle with routine tasks"],
        "metaphor": "Like a lively debate, you thrive on exchanging ideas."
    },

    # Diplomats
    "INFJ": {
        "description": "You are an insightful and idealistic visionary, driven by a deep sense of purpose.",
        "strengths": ["Empathy", "Insightfulness", "Dedication"],
        "growth": ["Can be overly idealistic", "May burn out from taking on too much"],
        "metaphor": "Like a lantern in the dark, you guide others with your deep insights."
    },
    "INFP": {
        "description": "You are a sensitive and creative soul, driven by personal values and compassion.",
        "strengths": ["Compassion", "Creativity", "Idealism"],
        "growth": ["Can be overly idealistic", "May struggle with confrontation"],
        "metaphor": "Like a poet, you bring beauty and emotion into everything you do."
    },
    "ENFJ": {
        "description": "You are a charismatic leader, always striving to inspire and uplift others.",
        "strengths": ["Inspiration", "Empathy", "Leadership"],
        "growth": ["Can be overly idealistic", "May neglect own needs"],
        "metaphor": "Like a mentor, you lead and inspire those around you."
    },
    "ENFP": {
        "description": "You are a creative and enthusiastic free spirit, always seeking new possibilities.",
        "strengths": ["Enthusiasm", "Creativity", "People skills"],
        "growth": ["Can be easily distracted", "May struggle with follow-through"],
        "metaphor": "Like a spark of inspiration, you light up any room with your energy."
    },

    # Sentinels
    "ISTJ": {
        "description": "You are a practical and responsible person who values order and tradition.",
        "strengths": ["Dependability", "Loyalty", "Attention to detail"],
        "growth": ["Can be overly rigid", "May struggle with adapting to change"],
        "metaphor": "Like a well-oiled machine, you ensure everything runs smoothly."
    },
    "ISFJ": {
        "description": "You are a warm and dedicated caretaker, always focused on helping others.",
        "strengths": ["Kindness", "Loyalty", "Practicality"],
        "growth": ["Can be overly self-sacrificing", "May struggle with asserting needs"],
        "metaphor": "Like a guardian angel, you quietly protect and support those you care about."
    },
    "ESTJ": {
        "description": "You are a hardworking and efficient organizer, taking charge to get things done.",
        "strengths": ["Leadership", "Efficiency", "Practicality"],
        "growth": ["Can be overly critical", "May struggle with flexibility"],
        "metaphor": "Like a conductor, you ensure everyone is in sync and working toward a goal."
    },
    "ESFJ": {
        "description": "You are a warm and social individual, highly focused on building community.",
        "strengths": ["Empathy", "Loyalty", "Practicality"],
        "growth": ["Can be overly focused on others' opinions", "May struggle with criticism"],
        "metaphor": "Like a host at a gathering, you create an environment where everyone feels welcome."
    },

    # Explorers
    "ISTP": {
        "description": "You are a practical and logical problem solver, always ready to take action.",
        "strengths": ["Independence", "Problem-solving", "Calm under pressure"],
        "growth": ["Can be detached", "May struggle with emotional expression"],
        "metaphor": "Like a mechanic, you fix what is broken with precision and calm."
    },
    "ISFP": {
        "description": "You are a gentle and artistic soul, living in the moment and valuing personal freedom.",
        "strengths": ["Creativity", "Empathy", "Adaptability"],
        "growth": ["Can be overly private", "May avoid conflict"],
        "metaphor": "Like an artist, you bring beauty to the world through your unique perspective."
    },
    "ESTP": {
        "description": "You are a dynamic and energetic individual, always ready for an adventure.",
        "strengths": ["Boldness", "Adaptability", "Practicality"],
        "growth": ["Can be impulsive", "May struggle with long-term planning"],
        "metaphor": "Like an explorer, you boldly venture into unknown territory."
    },
    "ESFP": {
        "description": "You are a fun-loving and spontaneous person, always bringing joy to those around you.",
        "strengths": ["Charisma", "Enthusiasm", "Creativity"],
        "growth": ["Can be easily bored", "May struggle with discipline"],
        "metaphor": "Like a performer on stage, you captivate and energize those around you."
    }
}

@app.route('/')
def index():
    # Render the test1.html form
    return render_template('test1.html')

@app.route('/submit', methods=['POST'])
def submit():
    # Collect User Responses from the form 
    user_responses = { 
        "analyticalThinking": request.form.get('analyticalThinking'), 
        "creativity": request.form.get('creativity'), 
        "organization": request.form.get('organization'), 
        "adaptability": request.form.get('adaptability') 
    }

    # Validate if all responses are provided
    if not all(user_responses.values()):
        return jsonify({"error": "Please answer all questions."})

    # Summing Scores
    group_scores = {
        "Analysts": 0,
        "Diplomats": 0,
        "Sentinels": 0,
        "Explorers": 0
    }

    # Calculate total score for each group
    for question, response in user_responses.items():
        group = question_group_mapping.get(question)
        score = response_scores.get(response, 0)  # Default to 0 if the response is not found
        if group:
            group_scores[group] += score

    # Determine Primary Group
    primary_group = max(group_scores, key=group_scores.get)

    # Narrowing Down to Exact Personality Type
    personality_type = None
    if primary_group == "Analysts":
        if user_responses["analyticalThinking"] == "Strongly Agree":
            personality_type = "INTJ"
        elif user_responses["analyticalThinking"] == "Agree":
            personality_type = "ENTJ"
        else:
            personality_type = "INTP"

    elif primary_group == "Diplomats":
        if user_responses["creativity"] == "Strongly Agree":
            personality_type = "ENFP"
        elif user_responses["creativity"] == "Agree":
            personality_type = "ENFJ"
        else:
            personality_type = "INFP"

    elif primary_group == "Sentinels":
        if user_responses["organization"] == "Strongly Agree":
            personality_type = "ISTJ"
        elif user_responses["organization"] == "Agree":
            personality_type = "ISFJ"
        else:
            personality_type = "ESFJ"

    elif primary_group == "Explorers":
        if user_responses["adaptability"] == "Strongly Agree":
            personality_type = "ESTP"
        elif user_responses["adaptability"] == "Agree":
            personality_type = "ISTP"
        else:
            personality_type = "ESFP"

    # Get Personality Profile
    profile = personality_profiles.get(personality_type, {})

    # Return the result as JSON
    return jsonify({
        "personality_type": personality_type,
        "description": profile.get("description"),
        "strengths": profile.get("strengths"),
        "growth": profile.get("growth"),
        "metaphor": profile.get("metaphor")
    })

if __name__ == '__main__':
    app.run(debug=True)