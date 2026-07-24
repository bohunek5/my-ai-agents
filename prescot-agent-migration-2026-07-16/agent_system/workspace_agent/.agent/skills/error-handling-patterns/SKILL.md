---
name: error-handling-patterns
description: Master error handling patterns across languages including exceptions, Result types, and graceful degradation. Use when implementing error handling, designing APIs, or improving application reliability.
---

# Error Handling Patterns

Build resilient applications with robust error handling strategies that gracefully handle failures.

## When to Use

- Implementing error handling in new features.
- Designing error-resilient APIs.
- Debugging production issues.

## Core Patterns

### 1. TypeScript/JS: Result Type

```typescript
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };
const Ok = <T>(value: T): Result<T, never> => ({ ok: true, value });
const Err = <E>(error: E): Result<never, E> => ({ ok: false, error });
```

### 2. Python: Custom Exception Hierarchy

```python
class ApplicationError(Exception):
    """Base exception for all application errors."""
    pass
```

### 3. Circuit Breaker

Prevent cascading failures by rejecting requests when an external service is down.

## Best Practices

- **Fail Fast:** Validate early.
- **Preserve Context:** Include stack traces and metadata.
- **Don't Swallow Errors:** Log or re-throw.
- **Cleanup:** Always use try-finally or context managers.
