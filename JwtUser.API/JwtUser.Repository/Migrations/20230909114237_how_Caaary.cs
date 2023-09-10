using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class how_Caaary : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_HowCarry_HowCarryId",
                table: "Transports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HowCarry",
                table: "HowCarry");

            migrationBuilder.RenameTable(
                name: "HowCarry",
                newName: "HowCarries");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HowCarries",
                table: "HowCarries",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_HowCarries_HowCarryId",
                table: "Transports",
                column: "HowCarryId",
                principalTable: "HowCarries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_HowCarries_HowCarryId",
                table: "Transports");

            migrationBuilder.DropPrimaryKey(
                name: "PK_HowCarries",
                table: "HowCarries");

            migrationBuilder.RenameTable(
                name: "HowCarries",
                newName: "HowCarry");

            migrationBuilder.AddPrimaryKey(
                name: "PK_HowCarry",
                table: "HowCarry",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_HowCarry_HowCarryId",
                table: "Transports",
                column: "HowCarryId",
                principalTable: "HowCarry",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
