using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IPackRepository
    {
        void Add(Pack pack);
        List<Pack> GetPacks();
        List<Pack> GetPacksByState(string state);
        List<Pack> GetPacksByHangout(string hangout);
        List<Pack> GetPacksByCity(string city);
        List<Pack> GetPacksByCompany(string company);
        Pack GetPackById(int id);

        bool DoesBuddyBelong(int buddyId, int packId);
        void Update(Pack pack);
        int GetBuddyCountByPack(int packId);
    }
}