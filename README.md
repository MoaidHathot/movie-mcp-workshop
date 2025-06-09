# MCP Workshop – Build a Movie Database MCP using .NET or TypeScript
Welcome to the Model Context Protocol (MCP) Workshop!
This hands-on session will teach you how to design a well-crafted MCP server, not just a basic one.

## Workshop Goals
The purpose of this workshop is to help you:
- Understand how design decisions impact LLM interactions.
- Learn to build an MCP that maximizes usability and flexibility.
- Go beyond the minimal — build something reusable, clean, and powerful.

You'll be building a Movie Database MCP that wraps around the [OMDB API](https://www.omdbapi.com/).

## Setup
You will receive a .NET or TypeScript project containing:
- A nearly empty MCP skeleton, boilerplate code already written.
- A wrapper for the OMDB APIs
> ⚠️ **Important**: You may not change anything inside the OMDB API wrapper.  
> You may only use it to implement your MCP logic.

## MCP Clients
You can use **any MCP client**, but we **strongly recommend using `Visual Studio Code` with `GitHub Copilot`**.

Other clients (e.g., `cline`) may work, but **your experience may differ** and we can't offer full support for all tools as they may not support all MCP features.

## Rules

> Please read these carefully. Your submission will be reviewed based on them.

1. **Build a good, general-purpose MCP** — not one hardcoded for this workshop.
2. **Do not hardcode task-specific logic** — your server should work in other scenarios too.
3. **MCPs must work with potentially *any* MCP client**, not just a specific one.
4. **You may **not** modify the OMDB API implementation**.
5. **You can choose to use either .NET or TypeScript**, but using a language that is *not* your main work language earns a **+10 point bonus**.
6. **You may work alone, in pairs, or in small groups** — we recommend **pair programming**.
7. Tasks can be completed **in any order**, but:
   - When you complete Task N, all **previous tasks (1 to N-1)** must continue working as expected.
   - **Do not break previously working functionality** when adding new features.

## Task List and Points

Each task has an associated **point value**. Once you complete a task:
- **Call an instructor** to review it.
- Upon approval, **log your progress in the shared Excel sheet**.

Completing the tasks will earn you points toward the final score.

### Final Tips

- Be thoughtful: Good MCP design is about **reusability, extensibility, and clarity**.
- Test with your own prompts and clients.
- Ask for help when needed — we’re here to support your learning journey!
- The @modelcontextprotocol/inspector can help you debug your MCP server on the Protocol level

---

## Environment Requirements

To run this project you will need the following:
### for TypeScript
1. Node >= 20
2. npm >= 10
### for .NET
1. .NET SDK 9
2. Editor/IDE of your choice (e.g., Visual Studio, Visual Studio Code, Neovim, etc.)

## To run the project locally
### for TypeScript
1. Clone the repo
2. Run `npm install`
3. Run `npm run build`
4. Optionally, you can install and use `npx @modelcontextprotocol/inspector dotnet run --project ./src/movie-mcp/movie-mcp.csproj`
### for .NET
1. Run ` dotnet build .\src\movie-mcp\`
2. Optionally, you can install and use `npx @modelcontextprotocol/inspector dotnet run --project ./src/movie-mcp/movie-mcp.csproj`


