using Microsoft.OpenApi.Models;

var AllowServerOrigins = "_allowServerOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

//test
builder.Services.AddControllersWithViews();
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowServerOrigins",
        policy =>
        {
            policy
                .WithOrigins("http://localhost:5145", "https://localhost:7111", "https://localhost:44441") // specifying the allowed origin
                .AllowAnyMethod() // defining the allowed HTTP method
                .AllowAnyHeader(); // allowing any header to be sent
        });
});
builder.Services.AddSwaggerGen(c =>
{
    c.AddServer(new OpenApiServer
    {
        Description = "Development Server",
        Url = "https://localhost:7111/"
    });
    
    c.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"] + e.ActionDescriptor.RouteValues["controller"]}");
});

var app = builder.Build();


app.UseSwagger(options => { options.SerializeAsV2 = true; }).UseSwaggerUI();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.UseCors(builder => builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader());

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
