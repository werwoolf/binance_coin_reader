-- CreateTable
CREATE TABLE "CoinPrice" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "CoinPrice_pkey" PRIMARY KEY ("id")
);
