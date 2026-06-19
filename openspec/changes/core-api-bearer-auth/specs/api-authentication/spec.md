## ADDED Requirements

### Requirement: Bearer authentication on all non-public routes

The core API SHALL require a valid `Authorization: Bearer <token>` header on every route except those on the public allowlist. The token SHALL be compared against the configured `API_SECRET`. Requests with a missing, malformed, or non-matching header SHALL receive `401 Unauthorized` and the route handler SHALL NOT execute.

#### Scenario: Valid token is accepted

- **WHEN** a request to a protected route includes `Authorization: Bearer <API_SECRET>`
- **THEN** the request proceeds to the route handler and returns its normal response

#### Scenario: Missing header is rejected

- **WHEN** a request to a protected route has no `Authorization` header
- **THEN** the API responds `401 Unauthorized` and does not execute the handler

#### Scenario: Wrong token is rejected

- **WHEN** a request to a protected route includes a Bearer token that does not match `API_SECRET`
- **THEN** the API responds `401 Unauthorized` and does not execute the handler

#### Scenario: Malformed header is rejected

- **WHEN** a request includes an `Authorization` header that is not in `Bearer <token>` form
- **THEN** the API responds `401 Unauthorized`

### Requirement: Public allowlist for health probes

The API SHALL allow `/health` and `/health/live` to be reached without authentication so liveness and readiness probes continue to function. No other route SHALL be on the allowlist.

#### Scenario: Health endpoints are public

- **WHEN** a request to `/health` or `/health/live` arrives with no `Authorization` header
- **THEN** the API responds normally without a 401

#### Scenario: Data routes are not public

- **WHEN** an unauthenticated request reaches any route other than the allowlisted health endpoints
- **THEN** the API responds `401 Unauthorized`

### Requirement: Fail closed when the secret is missing in production

When `NODE_ENV` is `production` and `API_SECRET` is not set, the API SHALL reject authenticated routes (fail closed) rather than skipping authentication. The condition SHALL be surfaced as a clear server-side error at startup.

#### Scenario: Production without a secret rejects traffic

- **WHEN** `NODE_ENV=production`, `API_SECRET` is unset, and a request reaches a protected route
- **THEN** the API responds `401 Unauthorized` and logs that `API_SECRET` is not configured

#### Scenario: Non-production without a secret allows local development

- **WHEN** `NODE_ENV` is not `production` and `API_SECRET` is unset
- **THEN** protected routes are reachable without a token so local development is not blocked

### Requirement: Constant-time secret comparison

The token comparison SHALL use a constant-time algorithm so that response timing does not reveal how many leading characters of a guess are correct.

#### Scenario: Comparison does not short-circuit on first mismatch

- **WHEN** the provided token differs from `API_SECRET`
- **THEN** the comparison runs in time independent of where the first differing character occurs
