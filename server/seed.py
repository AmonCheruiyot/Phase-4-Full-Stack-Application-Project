#!/usr/bin/env python3
from faker import Faker
from models import db, Freelancer, Client, Project
from app import app

fake = Faker()

def create_freelancers(num):
    freelancers = []
    for _ in range(num):
        freelancer = Freelancer(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email()
        )
        freelancers.append(freelancer)
        db.session.add(freelancer)
    db.session.commit()
    return freelancers

def create_clients(num):
    clients = []
    for _ in range(num):
        client = Client(
            name=fake.name(),
            username=fake.user_name(),
            email=fake.email()
        )
        clients.append(client)
        db.session.add(client)
    db.session.commit()
    return clients

def create_projects(num, freelancers, clients):
    for _ in range(num):
        project = Project(
            title=fake.catch_phrase(),
            description=fake.text(),
            rate=fake.random_int(min=10, max=1000),
            freelancer_id=fake.random_element(freelancers).id,
            client_id=fake.random_element(clients).id
        )
        db.session.add(project)
    db.session.commit()

def seed_database():
    with app.app_context():
        db.drop_all()
        db.create_all()

        freelancers = create_freelancers(10)
        clients = create_clients(10)
        create_projects(20, freelancers, clients)

if __name__ == "__main__":
    seed_database()
    print("Database seeded successfully!")
