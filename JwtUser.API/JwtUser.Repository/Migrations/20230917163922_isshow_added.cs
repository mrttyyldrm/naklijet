using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace JwtUser.Repository.Migrations
{
    /// <inheritdoc />
    public partial class isshow_added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isShow",
                table: "Transports",
                type: "bit",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isShow",
                table: "Transports");
        }
    }
}
