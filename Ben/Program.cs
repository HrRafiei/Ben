using Ben.Data;
using Ben.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ben
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            if(args.Length > 0 && args[0] == "make-first")
            {
                using(var scope = host.Services.CreateScope())
                {

                    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
                    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
                    var context = scope.ServiceProvider.GetRequiredService<ApplicationDatabaseContext>();


                    try
                    {
                        bool createdDb = context.Database.EnsureCreated();
                        if(createdDb)
                        {
                            bool initialized = Initializer.Init(userManager, roleManager, context).Result;

                            if(initialized)
                            {
                                Console.WriteLine("Initialized Successfully.");
                            } else
                            {
                                Console.WriteLine("Initialized Failed!");
                            }

                        }
                    } catch(Exception ex)
                    {
                        Console.WriteLine(ex.Message);
                    }

                }
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>()
                    .UseIIS()
                    .UseUrls("http://localhost:5000");
                });
    }
}
