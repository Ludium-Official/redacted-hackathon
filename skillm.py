import requests
import openai
from dotenv import load_dotenv
import os


load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
openai.api_key = OPENAI_API_KEY

def fetch_github_data(username):
    """Fetch GitHub data for a given user, including repositories."""
    headers = {'Authorization': f'token {GITHUB_TOKEN}'}
    
    user_url = f"https://api.github.com/users/{username}"
    repos_url = f"https://api.github.com/users/{username}/repos"
    
    user_data = requests.get(user_url, headers=headers).json()
    
    repos_response = requests.get(repos_url, headers=headers)
    if repos_response.status_code == 200:
        repos_data = repos_response.json()  
    else:
        print(f"Error fetching repos: {repos_response.status_code}")
        repos_data = [] 
    
    return user_data, repos_data

def analyze_repos(repos_data):
    """Analyze repositories to extract skills and contributions."""
    skill_counts = {}
    
    for repo in repos_data:
        if isinstance(repo, dict):  
            language = repo.get('language')
            if language:
                skill_counts[language] = skill_counts.get(language, 0) + 1
                
    return skill_counts

def generate_prompt(username, skill_counts):
    """Generate a prompt for GPT-4 to assess skill level based on GitHub activity."""
    skills = ", ".join([f"{language} ({count})" for language, count in skill_counts.items()])
    prompt = f"""
    GitHub user {username} has demonstrated experience in the following skills and languages:
    {skills}.
    
    Based on this information, please provide a detailed assessment of the user's skill levels for each technology, 
    focusing on their proficiency and typical usage frequency on a scale from 1 to 10, where 1 is novice and 10 is expert.
    
    Additionally, provide insights into whether their skillset suggests they are stronger in frontend, backend, 
    or full-stack development.
    """
    return prompt

def evaluate_skills_with_gpt4(prompt):
    """Use GPT-4 to evaluate skills based on the prompt."""
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an expert software engineering assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=150,
        temperature=0.7
    )
    return response['choices'][0]['message']['content'].strip()

def main(username):
    user_data, repos_data = fetch_github_data(username)
    skill_counts = analyze_repos(repos_data)
    prompt = generate_prompt(user_data.get('login'), skill_counts)
    skill_assessment = evaluate_skills_with_gpt4(prompt)
    
    print(f"GitHub User: {user_data.get('login')}")
    print("Skill Counts:", skill_counts)
    print("Skill Assessment:\n", skill_assessment)

main("github_username")

