using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class removers : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Cars_CarsId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_CarsId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "CarsId",
                table: "Applications");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CarsId",
                table: "Applications",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_CarsId",
                table: "Applications",
                column: "CarsId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Cars_CarsId",
                table: "Applications",
                column: "CarsId",
                principalTable: "Cars",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
