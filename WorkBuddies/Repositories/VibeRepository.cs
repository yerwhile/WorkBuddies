using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;

namespace WorkBuddies.Repositories
{
    public class VibeRepository : BaseRepository, IVibeRepository
    {
        public VibeRepository(IConfiguration configuration) : base(configuration) { }

        public List<Vibe> GetVibes()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT v.Id, v.Name 
                                    FROM Vibe v";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var vibes = new List<Vibe>();
                        while (reader.Read())
                        {
                            vibes.Add(new Vibe()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            });
                        }
                        return vibes;
                    }
                }
            }
        }

        public Vibe GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT v.Id, v.Name
                          FROM Vibe v
                        WHERE v.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Vibe vibe = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        vibe = new Vibe()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }
                    reader.Close();

                    return vibe;
                }
            }
        }

        public List<int> GetVibeIdsByPack(int packId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT v.Id, v.Name 
                                    FROM Vibe v
                                JOIN PackVibe pv ON pv.VibeId = v.Id
                                WHERE pv.PackId = @packId";

                    DbUtils.AddParameter(cmd, "@packId", packId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var vibeIds = new List<int>();
                        while (reader.Read())
                        {
                            var vibe = new Vibe() 
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            vibeIds.Add(vibe.Id);
                        }
                        return vibeIds;
                    }
                }
            }
        }

        public List<int> GetVibeIdsByHangout(int hangoutId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT v.Id, v.Name 
                                    FROM Vibe v
                                JOIN HangoutVibe hv ON hv.VibeId = v.Id
                                WHERE hv.HangoutId = @hangoutId";

                    DbUtils.AddParameter(cmd, "@hangoutId", hangoutId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var vibeIds = new List<int>();
                        while (reader.Read())
                        {
                            var vibe = new Vibe()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name")
                            };
                            vibeIds.Add(vibe.Id);
                        }
                        return vibeIds;
                    }
                }
            }
        }

        public void Add(Vibe vibe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Vibe (Name)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name)";

                    DbUtils.AddParameter(cmd, "@name", vibe.Name);

                    vibe.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
