/*
Prisma schema:
model User {
  // metadata
  id             String         @id @default(cuid())
  createdAt      DateTime       @default(now())
  updatedAt      DateTime       @default(now()) @updatedAt
  // fields
  name           String
  clerkId        String         @unique
  referredId     String?
  referredByUser User?          @relation("Referrals", fields: [referredId], references: [id])
  Listing        SpaceListing[]
  ReferredUsers  User[]         @relation("Referrals")
  UserListing    UserListing[]
  HelpForm       HelpForm[]

  @@map("user")
}

*/

export type Response<T> = Promise<{ data: T; error: string }>;

export type User = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  displayName: string;
  twitterHandle: string;
  profilePicture: string;
  firebaseId: string | null;
  referredId: string | null;
  referredByUser: User | null;
};
export interface IUserService {
  getById: (userId: string) => Response<User>;
  getAll: () => Response<User[]>;
  create: (user: User) => Response<User>;
  update: (userId: string, user: User) => Response<User>;
  delete: (userId: string) => Response<User>;
  getCurrentUser: () => Response<User | null>;
}