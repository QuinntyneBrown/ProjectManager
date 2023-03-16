using System.Collections.Generic;


namespace ProjectManager.Api.Core;

public class ResponseBase
{
    public List<string> ValidationErrors { get; set; }
}
