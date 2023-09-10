using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class Insurances_packagehelpers_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "InsuranceId",
                table: "Transports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PackageHelperId",
                table: "Transports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Insurances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Price = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurances", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PackageHelpers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PackageHelpers", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Transports_InsuranceId",
                table: "Transports",
                column: "InsuranceId");

            migrationBuilder.CreateIndex(
                name: "IX_Transports_PackageHelperId",
                table: "Transports",
                column: "PackageHelperId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_Insurances_InsuranceId",
                table: "Transports",
                column: "InsuranceId",
                principalTable: "Insurances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_PackageHelpers_PackageHelperId",
                table: "Transports",
                column: "PackageHelperId",
                principalTable: "PackageHelpers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_Insurances_InsuranceId",
                table: "Transports");

            migrationBuilder.DropForeignKey(
                name: "FK_Transports_PackageHelpers_PackageHelperId",
                table: "Transports");

            migrationBuilder.DropTable(
                name: "Insurances");

            migrationBuilder.DropTable(
                name: "PackageHelpers");

            migrationBuilder.DropIndex(
                name: "IX_Transports_InsuranceId",
                table: "Transports");

            migrationBuilder.DropIndex(
                name: "IX_Transports_PackageHelperId",
                table: "Transports");

            migrationBuilder.DropColumn(
                name: "InsuranceId",
                table: "Transports");

            migrationBuilder.DropColumn(
                name: "PackageHelperId",
                table: "Transports");
        }
    }
}
