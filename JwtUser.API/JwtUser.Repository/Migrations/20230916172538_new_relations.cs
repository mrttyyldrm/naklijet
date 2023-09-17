using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class new_relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transports_Statuses_StatusId",
                table: "Transports");

            migrationBuilder.DropIndex(
                name: "IX_Transports_StatusId",
                table: "Transports");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Transports");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Applications",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applications_StatusId",
                table: "Applications",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applications_Statuses_StatusId",
                table: "Applications",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applications_Statuses_StatusId",
                table: "Applications");

            migrationBuilder.DropIndex(
                name: "IX_Applications_StatusId",
                table: "Applications");

            migrationBuilder.DropColumn(
                name: "StatusId",
                table: "Applications");

            migrationBuilder.AddColumn<int>(
                name: "StatusId",
                table: "Transports",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transports_StatusId",
                table: "Transports",
                column: "StatusId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transports_Statuses_StatusId",
                table: "Transports",
                column: "StatusId",
                principalTable: "Statuses",
                principalColumn: "Id");
        }
    }
}
