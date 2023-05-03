using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;

namespace WorkBuddies.Repositories
{
    public class PackRepository : BaseRepository, IPackRepository
    {
        public PackRepository(IConfiguration configuration) : base(configuration) { }

        public List<Pack> GetPacks()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT p.Id, p.Name, p.Description, p.Schedule, p.Image, p.CreateDate, p.IsOpen 
                                    FROM Pack p";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var packs = new List<Pack>();
                        while (reader.Read())
                        {
                            packs.Add(new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            });
                        }
                        return packs;
                    }
                }
            }
        }

        public Pack GetPackById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.Name, p.Description, p.Schedule, p.Image, p.CreateDate, p.IsOpen 
                            FROM Pack p
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Pack pack = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        pack = new Pack()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Description = DbUtils.GetString(reader, "Description"),
                            Schedule = DbUtils.GetString(reader, "Schedule"),
                            Image = DbUtils.GetNullableString(reader, "Image"),
                            CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                            IsOpen = DbUtils.GetBool(reader, "IsOpen")
                        };
                    }
                    reader.Close();

                    return pack;
                }
            }
        }

        public void Add(Pack pack)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Pack (Name, Description, Schedule, Image, CreateDate, IsOpen)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Name, @Description, @Schedule, @Image, @CreateDate, @IsOpen)";

                    DbUtils.AddParameter(cmd, "@Name", pack.Name);
                    DbUtils.AddParameter(cmd, "@Description", pack.Description);
                    DbUtils.AddParameter(cmd, "@Schedule", pack.Schedule);
                    DbUtils.AddParameter(cmd, "@Image", pack.Image);
                    DbUtils.AddParameter(cmd, "@CreateDate", pack.CreateDate);
                    DbUtils.AddParameter(cmd, "@IsOpen", pack.IsOpen);

                    pack.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Pack pack)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Buddy
                                        SET Name = @Name,
                                            Description = @Description,
                                            Schedule = @Schedule,
                                            Image = @Image,
                                            CreateDate = @CreateDate,
                                            IsOpen = @IsOpen
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", pack.Name);
                    DbUtils.AddParameter(cmd, "@Description", pack.Description);
                    DbUtils.AddParameter(cmd, "@Schedule", pack.Schedule);
                    DbUtils.AddParameter(cmd, "@Image", pack.Image);
                    DbUtils.AddParameter(cmd, "@CreateDate", pack.CreateDate);
                    DbUtils.AddParameter(cmd, "@IsOpen", pack.IsOpen);
                    DbUtils.AddParameter(cmd, "@Id", pack.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
