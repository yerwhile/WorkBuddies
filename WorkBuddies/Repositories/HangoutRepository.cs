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
                        SELECT h.Id, h.Name, h.StreetAddress, h.City, h.State
                          FROM Hangout h
                        WHERE h.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Hangout hangout = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        hangout = new Hangout()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State")
                        };
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

    }
}