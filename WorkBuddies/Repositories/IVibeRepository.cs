using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IVibeRepository
    {
        List<Vibe> GetVibes();
        Vibe GetById(int id);
        List<int> GetVibeIdsByPack(int packId);
        List<int> GetVibeIdsByHangout(int hangoutId);
        void Add(Vibe vibe);
    }
}