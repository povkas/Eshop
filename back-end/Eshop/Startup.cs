using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Ehop.Data.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Eshop.Configurations;
using Eshop.Data.Repositories;
using Eshop.Models;
using Eshop.Services;
using Eshop.Services.Interfaces;

namespace Eshop
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.SetUpAutoMapper();
            services.AddAllDependencies();
            services.SetUpDatabase(Configuration);
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
            services.SetUpDatabase(Configuration);
            services.AddScoped<IRepository<User>, UsersRepository>();
            //services.AddTransient<IRegistrationService, RegistrationService>();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors(builder => builder.WithOrigins("http://localhost:3000"));
            app.UseHttpsRedirection();
            app.UseMvc();
            app.InitializeDatabase();
        }
    }
}
