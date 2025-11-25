# SOLID Principles & Refactoring Guidance

This document summarizes the SOLID object-oriented design principles and practical refactoring methods tailored to this repository (Spring Boot backend + React frontend). It gives concrete, low-risk suggestions you can apply incrementally.

---

## Quick Overview of SOLID

- **S — Single Responsibility Principle (SRP):** A class or module should have one reason to change. Keep controllers thin — only handle HTTP concerns; place business rules in services or domain classes.
- **O — Open/Closed Principle (OCP):** Modules should be open for extension, closed for modification. Prefer adding new implementations (e.g., new strategy classes) rather than modifying existing code.
- **L — Liskov Substitution Principle (LSP):** Subtypes must be usable through their base types without altering program correctness. Design interfaces and subclasses so they can be replaced interchangeably.
- **I — Interface Segregation Principle (ISP):** Prefer many small, specific interfaces over large, general ones. Consumers should not depend on methods they do not use.
- **D — Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Use dependency injection (Spring) everywhere appropriate.

---

## How these apply to this repo (concrete suggestions)

### Backend (Spring Boot)
- Controllers (e.g., `controller/*Controller.java`):
  - Keep controllers limited to request mapping, request/response mapping, validation, and authorization checks. Move business logic to `Service` classes.
  - Example: If `AppointmentController` performs scheduling logic, extract that logic into `AppointmentService` (or into domain objects) so controller only delegates.
- Services (`Service/` folder):
  - Ensure services encapsulate transactional boundaries. Annotate service methods with `@Transactional` where needed.
  - If a service grows large, split it by responsibility (e.g., `AppointmentSchedulingService`, `AppointmentNotificationService`).
- Models and DTOs:
  - Introduce DTOs for API boundaries instead of exposing entity/model classes directly. Create `dto` package for request/response structures.
  - Keep persistence entities free of serialization annotations where reasonable; use mappers (MapStruct or manual mappers) to convert between entities and DTOs.
- Repositories:
  - Use repository interfaces for data access (Spring Data JPA). Keep custom queries in repository classes, not services.
- Exceptions & Error Handling:
  - Use `@ControllerAdvice`/`@RestControllerAdvice` (exists: `GlobalExceptionHandler`) to map domain exceptions to HTTP responses. Throw meaningful domain exceptions from services (e.g., `AppointmentConflictException`).

Concrete refactor examples for backend:
- Extract Method: If `DoctorController` has repeated code to build responses, extract to a private helper in a service or shared mapper.
- Introduce Interface: Create `IUserService` and implement `UserService`; change controllers to depend on `IUserService`.
- Replace Conditional with Polymorphism: If inventory or recommendation logic branches by item type, consider Strategy pattern.

### Frontend (React)
- Components (files in `src/components`):
  - Break large components into smaller presentational components and container components.
  - Keep component responsibilities small: rendering, user interaction, and data fetching each isolated. Use hooks for data fetching.
  - Prefer CSS modules (already used in some files) for component-local styles.
- State & Data Fetching:
  - Centralize API calls in `services/api.js` or `src/services/*` (one place for fetch/axios calls). Avoid scattering fetch logic across components.
  - Introduce custom hooks like `useAppointments`, `useAuth`, `useInventory` to encapsulate fetching and transformations.
- Forms & Validation:
  - Extract complex forms into their own components (e.g., `AppointmentForm` is already present). Use form libraries (React Hook Form) for more reliable validation if needed.

Concrete refactor examples for frontend:
- Extract Component: If `Doctor.js` mixes form, list, and detail, split into `DoctorList`, `DoctorDetail`, `DoctorForm`.
- Move API Calls: Move fetch logic from `componentDidMount`/`useEffect` into `services/doctorService.js` and call from a hook.
- Rename Props/Components: Use descriptive names and ensure exported component names match filenames.

---

## Practical Refactoring Methods (short checklist)

- **Read & Run Tests:** Always ensure behavior is covered by tests before refactor. Add tests where missing.
- **Small, Reversible Steps:** Make one small change at a time. Run tests / build frequently.
- **Extract Method:** Pull repeated code into a well-named method.
- **Extract Class / Component:** When a class or component has multiple responsibilities, extract a new class/component for a subset of behavior.
- **Introduce Interface:** Create an interface and make the current class implement it. Update callers to depend on the interface.
- **Move Method / Move Field:** Move logic closer to the data it operates on or to the appropriate service.
- **Replace Conditional with Polymorphism / Strategy:** For complex branching, implement strategy classes and select them via factory or Spring beans.
- **Encapsulate Field / Replace Magic Strings:** Use constants or enums for repeated string values (e.g., role types, statuses).
- **Rename for Clarity:** Rename ambiguous methods/variables to be self-documenting.

---

## Examples & snippets

- Extracting business logic from controller to service (Java):

```
// Before (in Controller)
@PostMapping("/appointments")
public ResponseEntity<?> create(@RequestBody AppointmentRequest r) {
  // validation
  // schedule logic
  // send notifications
}

// After
@PostMapping("/appointments")
public ResponseEntity<?> create(@RequestBody AppointmentRequest r) {
  appointmentService.createAppointment(r);
  return ResponseEntity.ok().build();
}

// In AppointmentService
public void createAppointment(AppointmentRequest r) {
  // schedule logic
  // send notifications
}
```

- React: moving fetch to service + hook

```
// src/services/appointmentService.js
export async function fetchAppointments() {
  const res = await fetch('/api/appointments');
  return res.json();
}

// src/hooks/useAppointments.js
import { useState, useEffect } from 'react';
import { fetchAppointments } from '../services/appointmentService';

export function useAppointments() {
  const [data, setData] = useState([]);
  useEffect(() => { fetchAppointments().then(setData); }, []);
  return data;
}
```

---

## Suggested Prioritized Tasks (pick a few)

- 1 — Extract business logic from controllers into service layer for `AppointmentController` and `ConsultationController`.
- 2 — Add DTOs for public API responses and add mappers for entity ↔ DTO conversions.
- 3 — Create `src/services/*` on frontend and move all fetch logic there; add `use*` hooks.
- 4 — Add unit tests for a backend service and a frontend hook/component.

If you want, I can implement one of these tasks now (pick which), or I can open a few small PR-ready patches implementing (1) or (3).

---

## References & Further Reading

- Uncle Bob Martin — SOLID principles
- Refactoring (Martin Fowler)
- Spring documentation: dependency injection, transactions
- React docs: custom hooks, composition

---

End of document.
