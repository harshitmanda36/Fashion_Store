# Fashion Store— Spring Boot + MongoDB + React


## Prereqs
- Java 17 + Maven
- Node 18+
- MongoDB 



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

