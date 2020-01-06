# finance

Finance predictions and analytics.

## Running project

### Mongodb

Start MongoDB service:

```bash
sudo service mongod start
```

Stop MongoDB service:

```bash
sudo service mongod stop
```

### Backend

```bash
npm i
npm start
```

### Frontend

```bash
cd frontend
npm i
npm start
```

## Deploy
    
```bash
git push heroku master
```

See logs:
```bash
heroku logs --source app --tail
```
