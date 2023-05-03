using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IPackRepository
    {
        void Add(Pack pack);
        List<Pack> GetPacks();
        Pack GetPackById(int id);
        void Update(Pack pack);
    }
}