using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;
using System.Linq;
using WorkBuddies.Repositories;

namespace WorkBuddies.Repositories
{
    public class BuddyRepository : BaseRepository, IBuddyRepository
    {
        public BuddyRepository(IConfiguration configuration) : base(configuration) { }

        public Buddy GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.FirebaseUserId, b.FirstName, b.LastName, 
                               b.Email, b.City, b.State, b.Image, b.About,
                               b.Gender, b.Age, b.CompanyName, b.CompanyIndustry, b.CompanyRole
                          FROM Buddy b
                        WHERE FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    Buddy buddy = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        buddy = new Buddy()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            Image = DbUtils.GetString(reader, "Image"),
                            About = DbUtils.GetString(reader, "About"),
                            Gender = DbUtils.GetString(reader, "Gender"),
                            Age = DbUtils.GetInt(reader, "Age"),
                            CompanyName = DbUtils.GetString(reader, "CompanyName"),
                            CompanyIndustry = DbUtils.GetString(reader, "CompanyIndustry"),
                            CompanyRole = DbUtils.GetString(reader, "CompanyRole")
                        };
                    }
                    reader.Close();

                    return buddy;
                }
            }
        }

        public Buddy GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT b.Id, b.[FirstName], b.[LastName],
                             b.Email, b.FirebaseUserId,
                            b.City, b.[State], b.[Image], b.About, b.Gender, b.Age, b.CompanyName, b.CompanyIndustry, b.CompanyRole,
                            p.Id as PackId, p.[Name] as PackName, p.[Description], p.Schedule, p.[Image] as PackImage, p.CreateDate, p.IsOpen,
                            h.Id as HangoutId, h.[Name] as HangoutName, h.StreetAddress as HangoutStreetAddress,
                            h.City as HangoutCity, h.[State] as HangoutState
                                FROM Buddy b
                            LEFT JOIN BuddyPack bp ON bp.BuddyId = b.Id
                            LEFT JOIN Pack p ON p.Id = bp.PackId
                            LEFT JOIN PackHangout ph ON ph.PackId = p.Id
                            LEFT JOIN Hangout h ON h.Id = ph.HangoutId
                        WHERE b.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Buddy buddy = null;

                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        if(buddy == null)
                        {
                            buddy = new Buddy()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Image = DbUtils.GetString(reader, "Image"),
                                About = DbUtils.GetString(reader, "About"),
                                Gender = DbUtils.GetString(reader, "Gender"),
                                Age = DbUtils.GetInt(reader, "Age"),
                                CompanyName = DbUtils.GetString(reader, "CompanyName"),
                                CompanyIndustry = DbUtils.GetString(reader, "CompanyIndustry"),
                                CompanyRole = DbUtils.GetString(reader, "CompanyRole"),
                                Packs = new List<Pack>(),
                                Hangouts = new List<Hangout>()
                            };
                        }

                        if (DbUtils.IsNotDbNull(reader, "PackId"))
                        {
                            var packId = reader.GetInt32(reader.GetOrdinal("PackId"));


                            var existingPack = buddy.Packs.FirstOrDefault(p => p.Id == packId) ?? new Pack()
                            {
                                Id = DbUtils.GetInt(reader, "PackId"),
                                Name = DbUtils.GetString(reader, "PackName"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Schedule = DbUtils.GetString(reader, "Schedule"),
                                Image = DbUtils.GetNullableString(reader, "PackImage"),
                                CreateDate = DbUtils.GetDateTime(reader, "CreateDate"),
                                IsOpen = DbUtils.GetBool(reader, "IsOpen")
                            };
                            if (buddy.Packs.FirstOrDefault(p => p.Id == packId) == null)
                            {
                                buddy.Packs.Add(existingPack);
                            }

                        }

                        if (DbUtils.IsNotDbNull(reader, "HangoutId"))
                        {
                            var hangoutId = reader.GetInt32(reader.GetOrdinal("HangoutId"));
                            var existingHangout = buddy.Hangouts.FirstOrDefault(h => h.Id == hangoutId) ?? new Hangout()
                            {
                                Id = hangoutId,
                                Name = DbUtils.GetString(reader, "HangoutName"),
                                StreetAddress = DbUtils.GetString(reader, "HangoutStreetAddress"),
                                City = DbUtils.GetString(reader, "HangoutCity"),
                                State = DbUtils.GetString(reader, "HangoutState")
                            };
                            if (buddy.Hangouts.FirstOrDefault(h => h.Id == hangoutId) == null)
                            {
                                buddy.Hangouts.Add(existingHangout);
                            }

                        }

                    }
                    reader.Close();

                    return buddy;
                }
            }
        }

        public List<Buddy> GetBuddies()
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT b.Id, b.FirebaseUserId, b.FirstName, b.LastName, 
                                    b.Email, b.City, b.State, b.Image, b.About,
                                    b.Gender, b.Age, b.CompanyName, b.CompanyIndustry, b.CompanyRole
                                FROM Buddy b
                                        ORDER BY b.LastName";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var buddies = new List<Buddy>();
                        while (reader.Read())
                        {
                            buddies.Add(new Buddy()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                About = DbUtils.GetNullableString(reader, "About"),
                                Gender = DbUtils.GetNullableString(reader, "Gender"),
                                Age = DbUtils.GetNullableInt(reader, "Age"),
                                CompanyName = DbUtils.GetNullableString(reader, "CompanyName"),
                                CompanyIndustry = DbUtils.GetNullableString(reader, "CompanyIndustry"),
                                CompanyRole = DbUtils.GetNullableString(reader, "CompanyRole")
                            });
                        }
                        return buddies;
                    }
                }
            }
        }

        public List<Buddy> GetBuddiesByState(string state)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                SELECT b.Id, b.FirebaseUserId, b.FirstName, b.LastName, 
                                    b.Email, b.City, b.State, b.Image, b.About,
                                    b.Gender, b.Age, b.CompanyName, b.CompanyIndustry, b.CompanyRole
                                FROM Buddy b
                                        WHERE b.State LIKE @state";

                    DbUtils.AddParameter(cmd, "@state", $"%{state}%");

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var buddies = new List<Buddy>();
                        while (reader.Read())
                        {
                            buddies.Add(new Buddy()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                Image = DbUtils.GetNullableString(reader, "Image"),
                                About = DbUtils.GetNullableString(reader, "About"),
                                Gender = DbUtils.GetNullableString(reader, "Gender"),
                                Age = DbUtils.GetNullableInt(reader, "Age"),
                                CompanyName = DbUtils.GetNullableString(reader, "CompanyName"),
                                CompanyIndustry = DbUtils.GetNullableString(reader, "CompanyIndustry"),
                                CompanyRole = DbUtils.GetNullableString(reader, "CompanyRole")
                            });
                        }
                        return buddies;
                    }
                }
            }
        }


        public void Add(Buddy buddy)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Buddy (FirebaseUserId, FirstName, LastName, Email, City, State, Image, 
                                                                 About, Gender, Age, CompanyName, CompanyIndustry, CompanyRole)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @FirstName, @LastName, @Email, @City, @State, @Image,
                                                @About, @Gender, @Age, @CompanyName, @CompanyIndustry, @CompanyRole)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", buddy.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@FirstName", buddy.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", buddy.LastName);
                    DbUtils.AddParameter(cmd, "@Email", buddy.Email);
                    DbUtils.AddParameter(cmd, "@City", buddy.City);
                    DbUtils.AddParameter(cmd, "@State", buddy.State);
                    DbUtils.AddParameter(cmd, "@Image", buddy.Image);
                    DbUtils.AddParameter(cmd, "@About", buddy.About);
                    DbUtils.AddParameter(cmd, "@Gender", buddy.Gender);
                    DbUtils.AddParameter(cmd, "@Age", buddy.Age);
                    DbUtils.AddParameter(cmd, "@CompanyName", buddy.CompanyName);
                    DbUtils.AddParameter(cmd, "@CompanyIndustry", buddy.CompanyIndustry);
                    DbUtils.AddParameter(cmd, "@CompanyRole", buddy.CompanyRole);

                    buddy.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public BuddyPack GetBuddyPackById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT bp.Id, bp.PackId, bp.BuddyId
                          FROM BuddyPack bp
                        WHERE bp.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    BuddyPack buddyPack = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        buddyPack = new BuddyPack()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PackId = DbUtils.GetInt(reader, "PackId"),
                            BuddyId = DbUtils.GetInt(reader, "BuddyId")
                        };
                    }
                    reader.Close();

                    return buddyPack;
                }
            }
        }

        public void AddBuddyPack(BuddyPack buddyPack)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO BuddyPack (BuddyId, PackId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@buddyId, @packId)";

                    DbUtils.AddParameter(cmd, "@buddyId", buddyPack.BuddyId);
                    DbUtils.AddParameter(cmd, "@packId", buddyPack.PackId);

                    buddyPack.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Buddy buddy)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Buddy
                                        SET FirebaseUserId = @firebaseUserId,
                                            FirstName = @firstName,
                                            LastName = @lastName,
                                            Email = @email,
                                            City = @city,
                                            State = @state,
                                            Image = @image,
                                            About = @about,
                                            Gender = @gender,
                                            Age = @age,
                                            CompanyName = @companyName,
                                            CompanyIndustry = @companyIndustry,
                                            CompanyRole = @companyRole
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@firstName", buddy.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", buddy.LastName);
                    DbUtils.AddParameter(cmd, "@email", buddy.Email);
                    DbUtils.AddParameter(cmd, "@image", buddy.Image);
                    DbUtils.AddParameter(cmd, "@about", buddy.About);
                    DbUtils.AddParameter(cmd, "@gender", buddy.Gender);
                    DbUtils.AddParameter(cmd, "@age", buddy.Age);
                    DbUtils.AddParameter(cmd, "@companyName", buddy.CompanyName);
                    DbUtils.AddParameter(cmd, "@companyIndustry", buddy.CompanyIndustry);
                    DbUtils.AddParameter(cmd, "@companyRole", buddy.CompanyRole);
                    DbUtils.AddParameter(cmd, "@id", buddy.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}