# Fashion Booking — Spring Boot + MongoDB + React

This version uses **MongoDB**.

## Prereqs
- Java 17 + Maven
- Node 18+
- MongoDB on `mongodb://localhost:27017` (DB: `fashiondb`)

### Start MongoDB
- Homebrew (macOS):
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community@7.0
  brew services start mongodb-community@7.0
  ```
- Docker:
  ```bash
  docker run -d --name mongo -p 27017:27017 -v mongo_data:/data/db mongo:7
  ```

## Run Backend
```bash
cd backend
mvn spring-boot:run
```
API base: `http://localhost:8080/api`

## Run Frontend
```bash
cd frontend
npm i
npm run dev
```

## Endpoints
- `GET /api/products` — `q, category, minPrice, maxPrice, color, size, sort, page, size`
- `GET /api/categories`
- `POST /api/bookings` — `{ customerName, email, productId?, appointmentAt (ISO), note }`

Notes: Filtering is implemented via MongoTemplate + Criteria with pagination/sort. Sample data seeds on first run.
