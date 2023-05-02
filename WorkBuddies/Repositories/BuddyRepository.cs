using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using WorkBuddies.Models;
using WorkBuddies.Utils;
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
                        SELECT b.Id, b.FirebaseUserId, b.FirstName, b.LastName, 
                               b.Email, b.City, b.State, b.Image, b.About,
                               b.Gender, b.Age, b.CompanyName, b.CompanyIndustry, b.CompanyRole
                          FROM Buddy b
                        WHERE b.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

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
                                Image = DbUtils.GetString(reader, "Image"),
                                About = DbUtils.GetString(reader, "About"),
                                Gender = DbUtils.GetString(reader, "Gender"),
                                Age = DbUtils.GetInt(reader, "Age"),
                                CompanyName = DbUtils.GetString(reader, "CompanyName"),
                                CompanyIndustry = DbUtils.GetString(reader, "CompanyIndustry"),
                                CompanyRole = DbUtils.GetString(reader, "CompanyRole")
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

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}