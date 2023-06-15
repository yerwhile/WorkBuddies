using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IHangoutRepository
    {
        void Add(Hangout hangout);
        void AddHangoutVibes(HangoutVibe hangoutVibe);
        void DeleteVibesOnHangout(int hangoutId);
        void Update(Hangout hangout);
        Hangout GetById(int id);
        HangoutVibe GetHangoutVibeById(int id);
        List<Hangout> GetHangouts();
        List<Hangout> GetHangoutsByVibe(string vibeName);
        List<Hangout> GetHangoutsByState(string state);
        List<int> GetHangoutIdsByPack(int packId);
    }
}