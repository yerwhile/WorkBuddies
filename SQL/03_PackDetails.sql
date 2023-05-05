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
                        WHERE p.Id = 1