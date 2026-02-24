from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

from pymongo import MongoClient

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Connect to MongoDB
        client = MongoClient('localhost', 27017)
        db = client['octofit_db']

        # Clear collections
        db.users.delete_many({})
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        # Create unique index for email
        db.users.create_index([('email', 1)], unique=True)

        # Teams
        marvel = {'name': 'Marvel', 'description': 'Team Marvel'}
        dc = {'name': 'DC', 'description': 'Team DC'}
        marvel_id = db.teams.insert_one(marvel).inserted_id
        dc_id = db.teams.insert_one(dc).inserted_id

        # Users (super heroes)
        users = [
            {'name': 'Tony Stark', 'email': 'tony@marvel.com', 'team_id': marvel_id},
            {'name': 'Steve Rogers', 'email': 'steve@marvel.com', 'team_id': marvel_id},
            {'name': 'Bruce Wayne', 'email': 'bruce@dc.com', 'team_id': dc_id},
            {'name': 'Clark Kent', 'email': 'clark@dc.com', 'team_id': dc_id},
        ]
        user_ids = db.users.insert_many(users).inserted_ids

        # Activities
        activities = [
            {'user_id': user_ids[0], 'type': 'run', 'distance': 5, 'duration': 30},
            {'user_id': user_ids[1], 'type': 'cycle', 'distance': 20, 'duration': 60},
            {'user_id': user_ids[2], 'type': 'swim', 'distance': 2, 'duration': 40},
            {'user_id': user_ids[3], 'type': 'run', 'distance': 10, 'duration': 50},
        ]
        db.activities.insert_many(activities)

        # Leaderboard
        leaderboard = [
            {'user_id': user_ids[0], 'points': 100},
            {'user_id': user_ids[1], 'points': 90},
            {'user_id': user_ids[2], 'points': 110},
            {'user_id': user_ids[3], 'points': 95},
        ]
        db.leaderboard.insert_many(leaderboard)

        # Workouts
        workouts = [
            {'user_id': user_ids[0], 'workout': 'Chest Day', 'suggestion': 'Bench Press'},
            {'user_id': user_ids[1], 'workout': 'Leg Day', 'suggestion': 'Squats'},
            {'user_id': user_ids[2], 'workout': 'Back Day', 'suggestion': 'Deadlift'},
            {'user_id': user_ids[3], 'workout': 'Cardio', 'suggestion': 'Running'},
        ]
        db.workouts.insert_many(workouts)

        self.stdout.write(self.style.SUCCESS('octofit_db populated with test data'))
