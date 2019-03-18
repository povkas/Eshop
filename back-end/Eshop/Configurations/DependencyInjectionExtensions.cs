using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ehop.Data.Repositories;
using Eshop.Data.Repositories;
using Eshop.Models;
using Eshop.Services;
using EShop.Services;
using EShop.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Eshop.Configurations
{
    public static class DependencyInjectionExtensions
    {
        public static IServiceCollection AddAllDependencies(this IServiceCollection service)
        {
            return service
                .AddDataLayerDependencies()
                .AddApplicationDependencies();
        }

        public static IServiceCollection AddDataLayerDependencies(this IServiceCollection service)
        {
            return service
                .AddScoped<IRepository<Product>, ProductsRepository>()
                .AddScoped<IRepository<User>, UsersRepository>();
        }

        public static IServiceCollection AddApplicationDependencies(this IServiceCollection service)
        {
            return service
                .AddScoped<IProductsService, ProductsService>()
                .AddScoped<ILoginService, LoginService>();
        }
    }
}
