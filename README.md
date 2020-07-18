# Private finance analytics

The project is used for personal purposes. It allows us to aggregate data on our own finances, analyze and predict future expenses and incomes.

## Running project

1. Install and run MongoDB service

```bash
sudo service mongod start
```

2. Install backend dependencies and run

```bash
npm install
npm start
```

3. Install frontend dependencies and run

```bash
cd frontend
npm install
npm start
```

## deployment

```bash
git push heroku master
```

See logs:
```bash
heroku logs --source app --tail
```
