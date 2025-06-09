import { CallToolResult } from "@modelcontextprotocol/sdk/types.js";

export const testTool = async ({
  id,
}: {
  id: string;
}): Promise<CallToolResult> => {
  return {
    content: [{ type: "text", text: JSON.stringify("Hello, MCP!") }],
  };
};
