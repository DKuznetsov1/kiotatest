using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SampleController : ControllerBase
{
    private static readonly List<SampleItem> Items = new()
    {
        new SampleItem { Id = 1, Name = "First", Description = "First item", NewProp = $"that's new prop {1}" },
        new SampleItem { Id = 2, Name = "Second", Description = "Second item", NewProp = $"that's new prop {2}" }
    };

    [HttpGet]
    public ActionResult<IEnumerable<SampleItem>> Get()
    {
        return Ok(Items);
    }

    [HttpGet("{id:int}")]
    [ProducesResponseType(typeof(SampleItem), StatusCodes.Status200OK)]
    public IActionResult GetById(int id)
    {
        var item = Items.FirstOrDefault(i => i.Id == id);
        return item is null ? NotFound() : Ok(item);
    }


    [HttpGet("with-description/{desc}")]
    public ActionResult<SampleItem> GetByDesc(string desc)
    {
        var item = Items.FirstOrDefault(i => i.Description.Equals(desc, StringComparison.OrdinalIgnoreCase));
        return item is null ? NotFound() : Ok(item);
    }

    [HttpPost]
    public ActionResult<SampleItem> Create(SampleItemCreate dto)
    {
        var nextId = Items.Any() ? Items.Max(i => i.Id) + 1 : 1;
        var item = new SampleItem { Id = nextId, Name = dto.Name, Description = dto.Description };
        Items.Add(item);
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }

    [HttpPut("{id:int}")]
    public ActionResult Update(int id, SampleItemUpdate dto)
    {
        var item = Items.FirstOrDefault(i => i.Id == id);
        if (item is null) return NotFound();
        item.Name = dto.Name ?? item.Name;
        item.Description = dto.Description ?? item.Description;
        return NoContent();
    }
}

public record SampleItem
{
    public int Id { get; init; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; }

    public string NewProp { get; set; }
}

public record SampleItemCreate
{
    public string Name { get; init; } = string.Empty;
    public string Description { get; init; }
}

public record SampleItemUpdate
{
    public string Name { get; init; }
    public string Description { get; init; }
}
