using Eshop.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Eshop.Configurations
{
    public static class ConfigurationsExtensionMethods
    {
        public static void SetUpDatabase(this IServiceCollection service, IConfiguration configuration)
        {
            service.AddDbContext<Context>(options =>
                options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));
        }

        public static void InitializeDatabase(this IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<Context>();
//                context.Database.Migrate();
                SeedData.Seed(context);
            }
        }
    }
}