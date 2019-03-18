using Microsoft.EntityFrameworkCore.Migrations;

namespace Eshop.Migrations
{
    public partial class Productmodelalteration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Products");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Category",
                table: "Products",
                nullable: false,
                defaultValue: 0);
        }
    }
}