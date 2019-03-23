﻿using Eshop.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Eshop.Migrations
{
    [DbContext(typeof(Context))]
    [Migration("20190308091221_Registration")]
    partial class Registration
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.8-servicing-32085")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Eshop.Models.User", b =>
            {
                b.Property<int>("Id")
                    .ValueGeneratedOnAdd()
                    .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                b.Property<string>("Address")
                    .IsRequired()
                    .HasMaxLength(128);

                b.Property<string>("City")
                    .IsRequired();

                b.Property<string>("ConfirmPassword");

                b.Property<string>("Country")
                    .IsRequired();

                b.Property<string>("Email")
                    .IsRequired()
                    .HasMaxLength(255);

                b.Property<string>("Name")
                    .IsRequired();

                b.Property<string>("Password")
                    .IsRequired()
                    .HasMaxLength(128);

                b.Property<string>("Surname")
                    .IsRequired();

                b.HasKey("Id");

                b.ToTable("Users");
            });
#pragma warning restore 612, 618
        }
    }
}
