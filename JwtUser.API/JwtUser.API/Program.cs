using JwtUser.Core.Repositories;
using JwtUser.Core.Services;
using JwtUser.Core.UnitOfWorks;
using JwtUser.Repository.Context;
using JwtUser.Repository.Repositories;
using JwtUser.Repository.UnitOfWorks;
using JwtUser.Service.Mapping;
using JwtUser.Service.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Reflection;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;



// Add services to the container.

builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped(typeof(IGenericService<>), typeof(GenericService<>));

builder.Services.AddScoped<ITransportService, TransportService>();
builder.Services.AddScoped(typeof(ITransportRepository), typeof(TransportRepository));

builder.Services.AddScoped<IAppPersonelService, AppPersonelService>();
builder.Services.AddScoped(typeof(IAppPersonelRepository), typeof(AppPersonelRepository));

builder.Services.AddScoped<ICityService, CityService>();
builder.Services.AddScoped(typeof(ICityRepository), typeof(CityRepository));

builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped(typeof(ICategoryRepository), typeof(CategoryRepository));

builder.Services.AddScoped<IHowCarryService, HowCarryService>();
builder.Services.AddScoped(typeof(IHowCarryRepository), typeof(HowCarryRepository));

builder.Services.AddScoped<ITownService, TownService>();
builder.Services.AddScoped(typeof(ITownRepository), typeof(TownRepository));

builder.Services.AddScoped<IStreetService, StreetService>();
builder.Services.AddScoped(typeof(IStreetRepository), typeof(StreetRepository));

builder.Services.AddScoped<ICarsService, CarsService>();
builder.Services.AddScoped<IPersonalService, PersonalService>();
builder.Services.AddScoped<IApplicationService, ApplicationService>();

builder.Services.AddScoped<ICarsRepository, CarsRepository>();
builder.Services.AddScoped<IPersonalRepository, PersonalRepository>();
builder.Services.AddScoped<IApplicationRepository, ApplicationRepository>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddAutoMapper(typeof(MapProfile));


//Db created
builder.Services.AddDbContext<AppDbContext>(x =>
{
x.LogTo(Console.WriteLine,Microsoft.Extensions.Logging.LogLevel.Information).UseSqlServer(builder.Configuration.GetConnectionString("SqlCon"), option =>
    {
        option.MigrationsAssembly(Assembly.GetAssembly(typeof(AppDbContext)).GetName().Name);
    });
});

// For Identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();


// Adding Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]))
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(opt =>
{
    opt.AddPolicy("NaklijetCors", opt =>
    {
        opt.AllowAnyHeader()
        .AllowAnyMethod()
        .SetIsOriginAllowed((host) => true)
        .AllowCredentials();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("NaklijetCors");


app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
