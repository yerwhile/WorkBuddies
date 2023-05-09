using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;
using System.Linq;

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
                        SELECT p.Id, p.[Name], p.[Description], p.Schedule, p.[Image], p.CreateDate, p.IsOpen,
                            v.Id AS VibeId, v.[Name] AS VibeName,
                            h.Id as HangoutId, h.[Name] as HangoutName, h.StreetAddress as HangoutStreetAddress,
                            h.City as HangoutCity, h.[State] as HangoutState,
                            b.Id as BuddyId, b.[FirstName] as BuddyFirstName, b.[LastName] as BuddyLastName,
                             b.Email as BuddyEmail, b.FirebaseUserId as BuddyFirebaseId,
                            b.City as BuddyCity, b.[State] as BuddyState, b.CompanyName as BuddyCompanyName
                                FROM Pack p
                            LEFT JOIN BuddyPack bp ON bp.PackId = p.Id
                            LEFT JOIN Buddy b ON b.Id = bp.BuddyId
                            LEFT JOIN PackVibe pv ON pv.PackId = p.Id
                            LEFT JOIN Vibe v ON v.Id = pv.VibeId
                            LEFT JOIN PackHangout ph ON ph.PackId = p.Id
                            LEFT JOIN Hangout h ON h.Id = ph.HangoutId
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Pack pack = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if(pack == null)
                        {
                            pack = new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen"),
                                Buddies = new List<Buddy>(),
                                Vibes = new List<Vibe>(),
                                Hangouts = new List<Hangout>()
                            };
                        }
                        
                        if (DbUtils.IsNotDbNull(reader, "BuddyId"))
                        {
                            var buddyId = reader.GetInt32(reader.GetOrdinal("BuddyId"));
                            

                            var existingBuddy = pack.Buddies.FirstOrDefault(b => b.Id == buddyId) ?? new Buddy()
                            {
                                Id = buddyId,
                                FirstName = DbUtils.GetString(reader, "BuddyFirstName"),
                                LastName = DbUtils.GetString(reader, "BuddyLastName"),
                                Email = DbUtils.GetString(reader, "BuddyEmail"),
                                FirebaseUserId = DbUtils.GetString(reader, "BuddyFirebaseId"),
                                City = DbUtils.GetString(reader, "BuddyCity"),
                                State = DbUtils.GetString(reader, "BuddyState"),
                                CompanyName = DbUtils.GetString(reader, "BuddyCompanyName")
                            };
                            if(pack.Buddies.FirstOrDefault(b => b.Id == buddyId) == null)
                            {
                                pack.Buddies.Add(existingBuddy);
                            }
                            
                        }

                        if (DbUtils.IsNotDbNull(reader, "HangoutId"))
                        {
                            var hangoutId = reader.GetInt32(reader.GetOrdinal("HangoutId"));
                            var existingHangout = pack.Hangouts.FirstOrDefault(h => h.Id == hangoutId) ?? new Hangout()
                            {
                                Id = hangoutId,
                                Name = DbUtils.GetString(reader, "HangoutName"),
                                StreetAddress = DbUtils.GetString(reader, "HangoutStreetAddress"),
                                City = DbUtils.GetString(reader, "HangoutCity"),
                                State = DbUtils.GetString(reader, "HangoutState")
                            };
                            if(pack.Hangouts.FirstOrDefault(h => h.Id == hangoutId) == null)
                            {
                                pack.Hangouts.Add(existingHangout);
                            }
                            
                        }

                        if(DbUtils.IsNotDbNull(reader, "VibeId"))
                        {
                            var vibeId = reader.GetInt32(reader.GetOrdinal("VibeId"));
                            var existingVibe = pack.Vibes.FirstOrDefault(v => v.Id == vibeId) ?? new Vibe()
                            {
                                Id = vibeId,
                                Name = DbUtils.GetString(reader, "VibeName")
                            };
                            if(pack.Vibes.FirstOrDefault(v => v.Id == vibeId) == null)
                            {
                                pack.Vibes.Add(existingVibe);
                            }
                            
                        }

                    }
                    reader.Close();

                    return pack;
                }
            }
        }

        public List<Pack> GetPacksByState(string state)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.[Description], p.Schedule, p.[Image], p.CreateDate, p.IsOpen,
                                b.[State],
                                bp.Id AS BuddyPackId
                                FROM Pack p
                            LEFT JOIN BuddyPack bp ON bp.PackId = p.Id
                            LEFT JOIN Buddy b ON b.Id = bp.BuddyId
                            WHERE b.[State] LIKE @state";

                    DbUtils.AddParameter(cmd, "@state", $"%{state}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var packs = new List<Pack>();
                        while (reader.Read())
                        {

                            var packId = reader.GetInt32(reader.GetOrdinal("Id"));
                            var existingPack = packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            };
                            if (packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                packs.Add(existingPack);
                            }
                        }
                        return packs;
                    }
                }
            }
        }


        public List<Pack> GetPacksByHangout(string hangout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.[Description], p.Schedule, p.[Image], p.CreateDate, p.IsOpen,
                                h.[Name]
                                FROM Pack p
                            LEFT JOIN PackHangout ph ON ph.PackId = p.Id
                            LEFT JOIN Hangout h ON h.Id = ph.HangoutId
                            WHERE h.[Name] LIKE @hangout";

                    DbUtils.AddParameter(cmd, "@hangout", $"%{hangout}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var packs = new List<Pack>();
                        while (reader.Read())
                        {
                            var packId = reader.GetInt32(reader.GetOrdinal("Id"));
                            var existingPack = packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            };
                            if (packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                packs.Add(existingPack);
                            }
                        }
                        return packs;
                    }
                }
            }
        }

        public List<Pack> GetPacksByCity(string city)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.[Description], p.Schedule, p.[Image], p.CreateDate, p.IsOpen,
                               b.City
                                FROM Pack p
                            LEFT JOIN BuddyPack bp ON bp.PackId = p.Id
                            LEFT JOIN Buddy b ON b.Id = bp.BuddyId
                        WHERE b.City LIKE @city";

                    DbUtils.AddParameter(cmd, "@city", $"%{city}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var packs = new List<Pack>();
                        while (reader.Read())
                        {
                            var packId = reader.GetInt32(reader.GetOrdinal("Id"));
                            var existingPack = packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            };
                            if (packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                packs.Add(existingPack);
                            }
                        }
                        return packs;
                    }
                }
            }
        }

        public List<Pack> GetPacksByCompany(string company)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.[Name], p.[Description], p.Schedule, p.[Image], p.CreateDate, p.IsOpen,
                               b.CompanyName
                                FROM Pack p
                            LEFT JOIN BuddyPack bp ON bp.PackId = p.Id
                            LEFT JOIN Buddy b ON b.Id = bp.BuddyId
                        WHERE b.CompanyName LIKE @company";

                    DbUtils.AddParameter(cmd, "@company", $"%{company}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var packs = new List<Pack>();
                        while (reader.Read())
                        {
                            var packId = reader.GetInt32(reader.GetOrdinal("Id"));
                            var existingPack = packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            };
                            if (packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                packs.Add(existingPack);
                            }
                        }
                        return packs;
                    }
                }
            }
        }

        public int GetBuddyCountByPack (int packId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd  = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT bp.Id
                                            FROM BuddyPack bp
                                                LEFT JOIN Pack p ON p.Id = bp.PackId
                                            WHERE bp.PackId = @packId";

                    DbUtils.AddParameter(cmd, "@packId", packId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var buddyPacks = new List<BuddyPack>();
                        while (reader.Read())
                        {
                            var buddyPack = new BuddyPack()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                            };
                            buddyPacks.Add(buddyPack);
                        }
                        return buddyPacks.Count;
                    }
                }
            }
        }

        public bool DoesBuddyBelong(int buddyId, int packId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT bp.Id AS BuddyPackId, bp.BuddyId, bp.PackId, p.Id, b.Id as PrimaryBuddyId
                                            FROM Pack p
                                                LEFT JOIN BuddyPack bp ON bp.PackId = p.Id
                                                LEFT JOIN Buddy b ON b.Id = bp.BuddyId
                                            WHERE b.Id = @buddyId AND p.Id = @packId";

                    DbUtils.AddParameter(cmd, "@buddyId", buddyId);
                    DbUtils.AddParameter(cmd, "@packId", packId);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        int anyId = 0;
                        if(reader.Read())
                        {
                            anyId = reader.GetInt32(reader.GetOrdinal("Id"));
                            if (anyId > 0)
                            {
                                return true;
                            }
                        }
                        return false;
                    }
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

        public PackVibe GetPackVibeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pv.Id, pv.PackId, pv.VibeId
                          FROM PackVibe pv
                        WHERE pv.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    PackVibe packVibe = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        packVibe = new PackVibe()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PackId = DbUtils.GetInt(reader, "PackId"),
                            VibeId = DbUtils.GetInt(reader, "VibeId")
                        };
                    }
                    reader.Close();

                    return packVibe;
                }
            }
        }

        public PackHangout GetPackHangoutById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ph.Id, ph.PackId, ph.HangoutId
                          FROM PackHangout ph
                        WHERE ph.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    PackHangout packHangout = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        packHangout = new PackHangout()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PackId = DbUtils.GetInt(reader, "PackId"),
                            HangoutId = DbUtils.GetInt(reader, "HangoutId")
                        };
                    }
                    reader.Close();

                    return packHangout;
                }
            }
        }

        public void AddPackHangouts(PackHangout packHangout)
        {
            using (var conn = Connection)
            {
                conn.Open();
                foreach (var hangoutId in packHangout.HangoutIds)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO PackHangout (PackId, HangoutId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@packId, @hangoutId)";

                        DbUtils.AddParameter(cmd, "@packId", packHangout.PackId);
                        DbUtils.AddParameter(cmd, "@hangoutId", hangoutId);

                        cmd.ExecuteNonQuery();
                    }
                }

            }
        }

        public void DeleteHangoutsOnPack(int packId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PackHangout
                                        WHERE PackHangout.PackId = @id";

                    DbUtils.AddParameter(cmd, "@id", packId);
                    cmd.ExecuteNonQuery();
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

        public void AddPackVibes(PackVibe packVibe)
        {
            using (var conn = Connection)
            {
                conn.Open();
                foreach(var vibeId in packVibe.VibeIds)
                {
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"INSERT INTO PackVibe (PackId, VibeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@packId, @vibeId)";

                        DbUtils.AddParameter(cmd, "@packId", packVibe.PackId);
                        DbUtils.AddParameter(cmd, "@vibeId", vibeId);

                        cmd.ExecuteNonQuery();
                    }
                }
                
            }
        }

        public void DeleteVibesOnPack(int packId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM PackVibe
                                        WHERE PackVibe.PackId = @id";

                    DbUtils.AddParameter(cmd, "@id", packId);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
