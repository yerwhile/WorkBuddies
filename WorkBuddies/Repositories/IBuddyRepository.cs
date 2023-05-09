using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IBuddyRepository
    {
        void Add(Buddy buddy);
        Buddy GetByFirebaseUserId(string firebaseUserId);
        List<Buddy> GetBuddies();
        List<Buddy> GetBuddiesByState(string state);
        Buddy GetById(int id);
        BuddyPack GetBuddyPackById(int id);
        BuddyPack FindBuddyPackByPack(int buddyId, int packId);
        void Update(Buddy buddy);
        void AddBuddyPack(BuddyPack buddyPack);
        void DeleteBuddyPack(int buddyPackId);
    }
}