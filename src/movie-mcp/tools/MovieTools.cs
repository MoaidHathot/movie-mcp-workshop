using System.ComponentModel;
using ModelContextProtocol.Server;

[McpServerToolType]
public sealed class MovieTools
{
	private static string ApiKey => Environment.GetEnvironmentVariable("OMDB_API_KEY") ?? throw new InvalidOperationException("OMDB_API_KEY environment variable is not set.");

	[McpServerTool, Description("test")]
	public static Task<Movie> Test(IMovieDb movieDb)
		=> throw new NotImplementedException();
}
