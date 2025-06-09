#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { testTool } from "./tools/index.js";

const server = new McpServer({
  name: "movies",
  version: "1.0.0",
});

server.tool("test", { id: z.string() }, testTool);

const transport = new StdioServerTransport();
await server.connect(transport);
