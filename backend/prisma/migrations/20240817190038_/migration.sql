-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "displayName" TEXT NOT NULL DEFAULT 'Twitter Friend',
    "twitterHandle" TEXT NOT NULL DEFAULT '@fractaltechnyc',
    "profilePicture" TEXT NOT NULL DEFAULT 'https://images.spr.so/cdn-cgi/imagedelivery/j42No7y-dcokJuNgXeA0ig/f068d325-7a1f-4b06-a3ce-9cd8bab3f632/DALLE_2024-01-26_18.29.54_-_Create_a_highly_simplified_and_minimalist_pixelated_vector_illustration_of_a_1990s_computer_setup_inspired_by_Susan_Kares_iconic_design_style._The_i/w=256,quality=90,fit=scale-down',
    "firebaseId" TEXT,
    "referredId" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "referral" (
    "id" TEXT NOT NULL,
    "referrerId" TEXT NOT NULL,
    "referredUser" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending',

    CONSTRAINT "referral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userlisting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "leaselength" TEXT NOT NULL,
    "moveInTime" TEXT NOT NULL,
    "housematesCount" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "website" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "userlisting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spacelisting" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "housemates" TEXT NOT NULL,
    "priceRange" TEXT NOT NULL,
    "website" TEXT,
    "image" TEXT,
    "phone" TEXT,
    "email" TEXT,

    CONSTRAINT "spacelisting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "helpform" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "FormData" JSONB NOT NULL,

    CONSTRAINT "helpform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_firebaseId_key" ON "user"("firebaseId");

-- AddForeignKey
ALTER TABLE "user" ADD CONSTRAINT "user_referredId_fkey" FOREIGN KEY ("referredId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "referral" ADD CONSTRAINT "referral_referrerId_fkey" FOREIGN KEY ("referrerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userlisting" ADD CONSTRAINT "userlisting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spacelisting" ADD CONSTRAINT "spacelisting_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "helpform" ADD CONSTRAINT "helpform_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
