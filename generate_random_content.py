import requests
from faker import Faker
import random
import os
from datetime import datetime

fake = Faker()

def fetch_random_joke():
    response = requests.get('https://official-joke-api.appspot.com/random_joke')
    joke = response.json()
    return f"{joke['setup']} - {joke['punchline']}"

def fetch_random_fact():
    response = requests.get('https://randomfactgenerator.net/api')
    return response.json().get('fact')

def fetch_random_quote():
    response = requests.get('https://api.quotable.io/random')
    return response.json().get('content')

def fetch_weather():
    response = requests.get('https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=YOUR_LOCATION')
    weather = response.json()
    return f"The current weather is {weather['current']['condition']['text']}."

def mutate_data(content):
    transformations = [
        lambda x: x.upper(),
        lambda x: x.lower(),
        lambda x: x[::-1],
        lambda x: " ".join(random.sample(x.split(), len(x.split())))
    ]
    transformation = random.choice(transformations)
    return transformation(content)

def generate_hybrid_content():
    jokes = [fetch_random_joke() for _ in range(3)]
    facts = [fetch_random_fact() for _ in range(3)]
    quotes = [fetch_random_quote() for _ in range(3)]
    weather = fetch_weather()

    return (
        f"Jokes of the Day:\n" + "\n".join(jokes) +
        f"\n\nInteresting Facts:\n" + "\n".join(facts) +
        f"\n\nInspirational Quotes:\n" + "\n".join(quotes) +
        f"\n\nWeather Update:\n{weather}"
    )

def generate_complex_template_content():
    templates = [
        "Imagine a world where {entity} can {action}. It would be {adjective} and {emotion}.",
        "In a {place}, {character} discovered {object}. It was a {adjective} find, filled with {emotion}.",
        "What if {character} could {action}? It would lead to {result}, creating a {adjective} and {emotion} scenario."
    ]
    
    template = random.choice(templates)
    content = template.format(
        entity=fake.word(),
        action=fake.verb(),
        adjective=fake.word(),
        emotion=fake.word(),
        place=fake.city(),
        character=fake.name(),
        object=fake.word(),
        result=fake.sentence()
    )
    
    return mutate_data(content)

def create_markdown_file(title, content):
    filename = f"_posts/{datetime.now().strftime('%Y-%m-%d')}-{title.replace(' ', '-')}.md"
    template = f"""
    ---
    title: {title}
    date: {datetime.now().isoformat()}
    ---

    {content}
    """
    with open(filename, 'w') as file:
        file.write(template)

def main():
    title = fake.sentence()
    content = generate_complex_template_content()
    create_markdown_file(title, content)

if __name__ == "__main__":
    main()
