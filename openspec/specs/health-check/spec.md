# health-check

## Purpose

Provide operational health endpoints for the public API so that orchestrators and load balancers can determine whether the process is alive and whether it is ready to serve traffic. Liveness is a cheap process check; readiness probes the runtime dependencies (database and Redis cache).

## Requirements

### Requirement: Liveness probe

The public API SHALL expose an unauthenticated `GET /api/health/live` endpoint that reports whether the process is running, without probing external dependencies. It SHALL respond quickly and SHALL NOT depend on the database or cache.

#### Scenario: Process is running

- **WHEN** a client sends `GET /api/health/live`
- **THEN** the API responds with HTTP `200` and a JSON body `{ "status": "ok" }`

#### Scenario: No authentication required

- **WHEN** a client sends `GET /api/health/live` without an `Authorization` header
- **THEN** the API responds with HTTP `200` and does not return `401`

### Requirement: Readiness probe

The public API SHALL expose an unauthenticated `GET /api/health` endpoint that probes the runtime dependencies of the external (non-admin) API path — the database and the Redis cache — and reports each dependency's status plus an overall status.

#### Scenario: All dependencies healthy

- **WHEN** a client sends `GET /api/health` and the database and Redis are both reachable
- **THEN** the API responds with HTTP `200`
- **AND** the JSON body has `status` equal to `"ok"` and a `checks` object reporting each dependency (e.g. `database`, `redis`) as `"up"`

#### Scenario: A dependency is unavailable

- **WHEN** a client sends `GET /api/health` and at least one dependency (database or Redis) is unreachable or times out
- **THEN** the API responds with HTTP `503`
- **AND** the JSON body has `status` equal to `"error"` and the failing dependency reported as `"down"` in the `checks` object

#### Scenario: Dependency check is bounded in time

- **WHEN** a dependency probe does not respond within a fixed timeout
- **THEN** that dependency is reported as `"down"` and the endpoint still returns a response with HTTP `503` rather than hanging

#### Scenario: No sensitive data exposed

- **WHEN** a client sends `GET /api/health`
- **THEN** the response body contains only dependency status indicators and SHALL NOT include connection strings, credentials, stack traces, or internal admin/cron details
