# Backend Setup Checklist - Node.js + Express + TypeScript + SQLite

## Phase 1: Project Setup

- [ ] Create a new directory for the backend (e.g., `f1-bet-backend` or `backend`)
- [ ] Initialize npm project: `npm init -y`
- [ ] Install TypeScript and development dependencies:
  ```bash
  npm install -D typescript @types/node @types/express ts-node nodemon
  ```
- [ ] Install runtime dependencies:
  ```bash
  npm install express sqlite3 cors
  npm install -D @types/cors
  ```
- [ ] Create `tsconfig.json` with appropriate settings
- [ ] Create `package.json` scripts:
  - `dev`: Use nodemon to watch and restart on changes
  - `build`: Compile TypeScript to JavaScript
  - `start`: Run the compiled JavaScript

## Phase 2: Database Setup

- [ ] Create database initialization script (`src/db/init.ts` or `src/db/init.js`)
- [ ] Run SQL schema from `docs/database-schema.sql` to create tables
- [ ] Test database connection
- [ ] Create database utility functions:
  - `getDb()` - Get database connection
  - `initDb()` - Initialize/create tables
  - `closeDb()` - Close connection (for graceful shutdown)

## Phase 3: Type Definitions

- [ ] Create `src/types/bet.ts` (or copy from frontend)
- [ ] Create database row types (e.g., `BetRow`, `UserRow`)
- [ ] Create API request/response types
- [ ] Ensure types match your frontend `BetData` interface

## Phase 4: API Routes

- [ ] Set up Express app with middleware:
  - [ ] CORS middleware (allow your frontend origin)
  - [ ] JSON body parser
  - [ ] Error handling middleware
- [ ] Create route handlers:
  - [ ] `POST /api/bets` - Submit a new bet
    - Validate request body matches `BetData` structure
    - Check if user already exists (handle updates vs inserts)
    - Insert/update bet data in database
    - Handle JSON serialization for arrays/objects (top3Drivers, betterDriverPerTeam)
    - Return success/error response
  - [ ] `GET /api/bets` - Get all bets (for results view)
    - Query all bets from database
    - Parse JSON fields back to objects/arrays
    - Return array of bet data
  - [ ] `GET /api/bets/:userName` - Get specific user's bet (optional)
  - [ ] `PUT /api/bets/:userName` - Update existing bet (optional)
  - [ ] `DELETE /api/bets/:userName` - Delete a bet (optional, for testing)

## Phase 5: Data Transformation

- [ ] Create utility functions to convert between:
  - Frontend `BetData` format ↔ Database row format
  - Handle JSON serialization/deserialization for:
    - `top3Drivers` (array → JSON string)
    - `top3Teams` (array → JSON string)
    - `betterDriverPerTeam` (object → JSON string)
  - Handle boolean/null values (SQLite uses INTEGER: 0/1/NULL)

## Phase 6: Error Handling

- [ ] Add try-catch blocks to all database operations
- [ ] Create consistent error response format
- [ ] Handle database constraint violations (e.g., duplicate user_name)
- [ ] Add input validation (check required fields, data types)
- [ ] Return appropriate HTTP status codes (200, 201, 400, 500)

## Phase 7: Testing

- [ ] Test POST endpoint with Postman/curl/your frontend
- [ ] Test GET endpoint returns all bets
- [ ] Test error cases (invalid data, missing fields)
- [ ] Verify data persistence (restart server, data should remain)
- [ ] Test with your frontend `betApi.ts`

## Phase 8: Environment Configuration

- [ ] Create `.env` file for configuration:
  - `PORT` (default: 3000)
  - `DB_PATH` (path to SQLite database file)
  - `CORS_ORIGIN` (your frontend URL)
- [ ] Install `dotenv` package
- [ ] Load environment variables in your app
- [ ] Add `.env` to `.gitignore`

## Phase 9: Development Workflow

- [ ] Set up hot-reload with nodemon
- [ ] Create `.gitignore` (node_modules, .env, *.db, dist/)
- [ ] Test full flow: Frontend → API → Database → API → Frontend

## Phase 10: Optional Enhancements

- [ ] Add request logging middleware
- [ ] Add rate limiting (prevent spam submissions)
- [ ] Add data validation library (e.g., `zod` or `joi`)
- [ ] Add database migrations system (for schema changes)
- [ ] Add API documentation (Swagger/OpenAPI)

## Key Learning Points

1. **SQLite with Node.js**: Use `sqlite3` package, learn callback vs promise patterns
2. **TypeScript**: Type your database queries and responses
3. **JSON Serialization**: SQLite doesn't have native JSON, so stringify/parse arrays/objects
4. **Error Handling**: Always wrap database calls in try-catch
5. **CORS**: Configure properly to allow your frontend to call the API

## Common Pitfalls to Avoid

- ❌ Forgetting to parse JSON strings back to objects when reading from DB
- ❌ Not handling NULL values correctly (SQLite uses NULL, TypeScript uses `null`)
- ❌ Not validating input data before inserting
- ❌ Forgetting to close database connections
- ❌ Not handling duplicate user submissions (should you update or reject?)

## Resources

- SQLite3 Node.js docs: https://github.com/TryGhost/node-sqlite3
- Express.js docs: https://expressjs.com/
- TypeScript handbook: https://www.typescriptlang.org/docs/
