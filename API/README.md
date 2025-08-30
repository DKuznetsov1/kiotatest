# API Web API Boilerplate

This folder contains a minimal C# .NET Web API project (no database) with example GET, POST and PUT endpoints.

Quick start (requires .NET SDK installed):

1. Open a command prompt and navigate to the project folder:

```cmd
cd /d API\Api
```

2. Restore and run:

```cmd
dotnet restore
dotnet run
```

The API will start and Swagger UI will be available at https://localhost:<port>/swagger when running in Development.

Endpoints:
- GET  /api/sample          -> list items
- GET  /api/sample/{id}     -> get item by id
- POST /api/sample          -> create item
- PUT  /api/sample/{id}     -> update item
