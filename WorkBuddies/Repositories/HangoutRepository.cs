using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;
using WorkBuddies.Repositories;
using System.Linq;

namespace WorkBuddies.Repositories
{
    public class HangoutRepository : BaseRepository, IHangoutRepository
    {
        public HangoutRepository(IConfiguration configuration) : base(configuration) { }


        public Hangout GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT h.Id, h.[Name], h.StreetAddress, h.City, h.[State],
                            v.Id AS VibeId, v.[Name] AS VibeName,
                            p.Id AS PackId, p.[Name] AS PackName, p.CreateDate AS PackFormed
                          FROM Hangout h
                            LEFT JOIN HangoutVibe hv ON hv.HangoutId = h.Id
                            LEFT JOIN Vibe v ON v.Id = hv.VibeId
                            LEFT JOIN PackHangout ph ON ph.HangoutId = h.Id
                            LEFT JOIN Pack p ON p.Id = ph.PackId
                        WHERE h.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Hangout hangout = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if (hangout == null)
                        {
                            hangout = new Hangout()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Packs = new List<Pack>(),
                                Vibes = new List<Vibe>()
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "PackId"))
                        {
                            var packId = reader.GetInt32(reader.GetOrdinal("PackId"));
                            var existingPack = hangout.Packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = packId,
                                Name = DbUtils.GetString(reader, "PackName"),
                                CreateDate = DbUtils.GetDateTime(reader, "PackFormed")
                            };
                            if (hangout.Packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                hangout.Packs.Add(existingPack);
                            }

                        }

                        if (DbUtils.IsNotDbNull(reader, "VibeId"))
                        {
                            var vibeId = reader.GetInt32(reader.GetOrdinal("VibeId"));
                            var existingVibe = hangout.Vibes.FirstOrDefault(v => v.Id == vibeId) ?? new Vibe()
                            {
                                Id = vibeId,
                                Name = DbUtils.GetString(reader, "VibeName")
                            };
                            if (hangout.Vibes.FirstOrDefault(v => v.Id == vibeId) == null)
                            {
                                hangout.Vibes.Add(existingVibe);
                            }

                        }

                    }
                    reader.Close();

                    return hangout;
                }
            }
        }

        public List<Hangout> GetHangouts()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT h.Id, h.Name, h.StreetAddress, h.City, h.State
                                    FROM Hangout h
                                ORDER BY h.Name";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var hangouts = new List<Hangout>();
                        while (reader.Read())
                        {
                            hangouts.Add(new Hangout()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State")
                            });
                        }
                        return hangouts;
                    }
                }
            }
        }

        public List<Hangout> GetHangoutsByVibe(string vibeName)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT h.Id, h.[Name], h.StreetAddress, h.City, h.[State]
                                FROM Hangout h
                            LEFT JOIN HangoutVibe hv ON hv.HangoutId = h.Id
                            LEFT JOIN Vibe v ON v.Id = hv.VibeId
                        WHERE v.[Name] LIKE @vibeName";

                    DbUtils.AddParameter(cmd, "@vibeName", $"%{vibeName}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var hangouts = new List<Hangout>();
                        while (reader.Read())
                        {

                            var hangoutId = reader.GetInt32(reader.GetOrdinal("Id"));
                            var existingHangout = hangouts.FirstOrDefault(h => h.Id == hangoutId) ?? new Hangout()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetNullableString(reader, "State")
                            };
                            if (hangouts.FirstOrDefault(h => h.Id == hangoutId) == null)
                            {
                                hangouts.Add(existingHangout);
                            }
                        }
                        return hangouts;
                    }
                }
            }
        }

        public List<Hangout> GetHangoutsByState(string state)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT h.Id, h.[Name], h.StreetAddress, h.City, h.[State]
                                    FROM Hangout h
                                WHERE h.[State] LIKE @state";

                    DbUtils.AddParameter(cmd, "@state", $"%{state}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var hangouts = new List<Hangout>();
                        while (reader.Read())
                        {
                            hangouts.Add(new Hangout()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State")
                            });
                        }
                        return hangouts;
                    }
                }
            }
        }

        public List<int> GetHangoutIdsByPack(int packId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT h.Id
                                    FROM Hangout h
                                JOIN PackHangout ph ON ph.HangoutId = h.Id
                                WHERE ph.PackId = @packId";

                    DbUtils.AddParameter(cmd, "@packId", packId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var hangoutIds = new List<int>();
                        while (reader.Read())
                        {
                            var hangout = new Hangout()
                            {
                                Id = DbUtils.GetInt(reader, "Id")
                            };
                            hangoutIds.Add(hangout.Id);
                        }
                        return hangoutIds;
                    }
                }
            }
        }

        public HangoutVibe GetHangoutVibeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT hv.Id, hv.HangoutId, hv.VibeId
                          FROM HangoutVibe hv
                        WHERE hv.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    HangoutVibe hangoutVibe = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        hangoutVibe = new HangoutVibe()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            HangoutId = DbUtils.GetInt(reader, "HangoutId"),
                            VibeId = DbUtils.GetInt(reader, "VibeId")
                        };
                    }
                    reader.Close();

                    return hangoutVibe;
                }
            }
        }

        public void Add(Hangout hangout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Hangout (Name, StreetAddress, City, State)
                                        OUTPUT INSERTED.ID
                                        VALUES (@name, @streetAddress, @city, @state)";

                    DbUtils.AddParameter(cmd, "@name", hangout.Name);
                    DbUtils.AddParameter(cmd, "@streetAddress", hangout.StreetAddress);
                    DbUtils.AddParameter(cmd, "@city", hangout.City);
                    DbUtils.AddParameter(cmd, "@state", hangout.State);

                    hangout.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void AddHangoutVibes(HangoutVibe hangoutVibe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                foreach (var vibeId in hangoutVibe.VibeIds)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO HangoutVibe (HangoutId, VibeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@hangoutId, @vibeId)";

                        DbUtils.AddParameter(cmd, "@hangoutId", hangoutVibe.HangoutId);
                        DbUtils.AddParameter(cmd, "@vibeId", vibeId);

                        cmd.ExecuteNonQuery();
                    }
                }

            }
        }

        public void Update(Hangout hangout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Hangout
                                        SET Name = @Name,
                                            StreetAddress = @StreetAddress,
                                            City = @City,
                                            State = @State
                                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", hangout.Name);
                    DbUtils.AddParameter(cmd, "@StreetAddress", hangout.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", hangout.City);
                    DbUtils.AddParameter(cmd, "@State", hangout.State);
                    DbUtils.AddParameter(cmd, "@Id", hangout.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteVibesOnHangout(int hangoutId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM HangoutVibe
                                        WHERE HangoutVibe.HangoutId = @id";

                    DbUtils.AddParameter(cmd, "@id", hangoutId);
                    cmd.ExecuteNonQuery();
                }
            }
        }

    }
}