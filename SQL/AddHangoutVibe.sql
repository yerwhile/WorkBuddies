CREATE TABLE [Buddy] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [FirstName] nvarchar(255) NOT NULL,
  [LastName] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL,
  [Image] nvarchar(255),
  [About] nvarchar(255),
  [Gender] nvarchar(255),
  [Age] int,
  [CompanyName] nvarchar(255),
  [CompanyIndustry] nvarchar(255),
  [CompanyRole] nvarchar(255),
  [FirebaseUserId] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Pack] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [Description] nvarchar(255),
  [Schedule] nvarchar(255),
  [Image] nvarchar(255),
  [CreateDate] datetime NOT NULL,
  [IsOpen] bit
)
GO

CREATE TABLE [Hangout] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL,
  [StreetAddress] nvarchar(255) NOT NULL,
  [City] nvarchar(255) NOT NULL,
  [State] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Vibe] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [PackHangout] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PackId] int NOT NULL,
  [HangoutId] int NOT NULL
)
GO

CREATE TABLE [PackVibe] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [PackId] int NOT NULL,
  [VibeId] int NOT NULL
)
GO

CREATE TABLE [BuddyPack] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [BuddyId] int NOT NULL,
  [PackId] int NOT NULL,
  [IsPackLeader] bit
)
GO

CREATE TABLE [HangoutVibe] (
  [Id] int PRIMARY KEY IDENTITY(1, 1),
  [HangoutId] int NOT NULL,
  [VibeId] int NOT NULL
)
GO

ALTER TABLE [BuddyPack] ADD FOREIGN KEY ([BuddyId]) REFERENCES [Buddy] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [BuddyPack] ADD FOREIGN KEY ([PackId]) REFERENCES [Pack] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PackHangout] ADD FOREIGN KEY ([PackId]) REFERENCES [Pack] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PackHangout] ADD FOREIGN KEY ([HangoutId]) REFERENCES [Hangout] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PackVibe] ADD FOREIGN KEY ([VibeId]) REFERENCES [Vibe] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [PackVibe] ADD FOREIGN KEY ([PackId]) REFERENCES [Pack] ([Id]) ON DELETE CASCADE
GO

ALTER TABLE [HangoutVibe] ADD FOREIGN KEY ([HangoutId]) REFERENCES [Hangout] ([Id])
GO

ALTER TABLE [HangoutVibe] ADD FOREIGN KEY ([VibeId]) REFERENCES [Vibe] ([Id])
GO
