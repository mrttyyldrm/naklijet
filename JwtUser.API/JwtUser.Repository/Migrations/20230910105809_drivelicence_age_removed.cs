using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class drivelicence_age_removed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Personals");

            migrationBuilder.DropColumn(
                name: "DrivingLicence",
                table: "Personals");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Age",
                table: "Personals",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "DrivingLicence",
                table: "Personals",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
