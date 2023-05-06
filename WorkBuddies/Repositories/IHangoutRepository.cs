using System.Collections.Generic;
using WorkBuddies.Models;

namespace WorkBuddies.Repositories
{
    public interface IHangoutRepository
    {
        void Add(Hangout hangout);
        Hangout GetById(int id);
        List<Hangout> GetHangouts();
        List<Hangout> GetHangoutsByState(string state);
    }
}