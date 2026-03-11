# Job Tracker Microservices

A microservice-based job application tracking platform built with .NET 8.

## Architecture

Services:

- AuthService (authentication + JWT)
- JobService (job application management)

Each service has:
- separate database
- separate API
- JWT authentication

## Tech Stack

- .NET 8
- ASP.NET Core
- Entity Framework Core
- SQL Server
- JWT Authentication

## Future Improvements and Additions

- Docker Compose
- API Gateway
- RabbitMQ event messaging
