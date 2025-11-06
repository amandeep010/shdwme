-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('HOODIE', 'SWEAT_SHIRTS', 'OVERSIZED_TSHIRTS');

-- CreateEnum
CREATE TYPE "SIZE" AS ENUM ('S', 'M', 'L', 'XL');

-- CreateEnum
CREATE TYPE "CURRENCY_TYPE" AS ENUM ('PERCENTAGE', 'CURRENCY_TYPE');

-- CreateEnum
CREATE TYPE "ACTIVE_STATUS" AS ENUM ('ACTIVE', 'EXPIRED');

-- CreateEnum
CREATE TYPE "ROLE_TITLE" AS ENUM ('SUPER_ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "PAYMENT_MODE" AS ENUM ('ONLINE', 'CASH_ON_DELIVERY');

-- CreateEnum
CREATE TYPE "PAYMENT_STATUS" AS ENUM ('SUCCESS', 'FAILED', 'PROCESSING');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('RECEIVED', 'SHIPPED', 'DELIVERED', 'REJECTED');

-- CreateTable
CREATE TABLE "Roles" (
    "roleId" SERIAL NOT NULL,
    "roleName" "ROLE_TITLE" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("roleId")
);

-- CreateTable
CREATE TABLE "Users" (
    "userId" SERIAL NOT NULL,
    "fName" TEXT,
    "lName" TEXT,
    "email" TEXT NOT NULL,
    "roleId" INTEGER NOT NULL,
    "mobile" TEXT,
    "password" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "address" TEXT,
    "pincode" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Products" (
    "productId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT,
    "price" TEXT,
    "categories" "CATEGORY" NOT NULL,
    "size" "SIZE" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Products_pkey" PRIMARY KEY ("productId")
);

-- CreateTable
CREATE TABLE "Coupons" (
    "couponId" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "couponCode" TEXT NOT NULL,
    "couponDiscount" INTEGER NOT NULL,
    "currencyType" "CURRENCY_TYPE" NOT NULL,
    "couponTerms" TEXT NOT NULL,
    "discountMaxLimit" INTEGER NOT NULL,
    "maxCoupon" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Coupons_pkey" PRIMARY KEY ("couponId")
);

-- CreateTable
CREATE TABLE "UserCouponMapping" (
    "userCouponId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "ACTIVE_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserCouponMapping_pkey" PRIMARY KEY ("userCouponId")
);

-- CreateTable
CREATE TABLE "ProductCouponMapping" (
    "productCouponId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "couponId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "ACTIVE_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ProductCouponMapping_pkey" PRIMARY KEY ("productCouponId")
);

-- CreateTable
CREATE TABLE "Orders" (
    "orderId" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "userOrderId" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "UserOrder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "paymentMode" "PAYMENT_MODE" NOT NULL,
    "paymentStatus" "PAYMENT_STATUS" NOT NULL,
    "gstCharge" DOUBLE PRECISION NOT NULL,
    "handlingCharge" DOUBLE PRECISION NOT NULL,
    "shipping" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "discountType" "CURRENCY_TYPE" NOT NULL,
    "total" INTEGER NOT NULL,
    "shippingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "status" "ORDER_STATUS" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserOrder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCart" (
    "cartId" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserCart_pkey" PRIMARY KEY ("cartId")
);

-- CreateTable
CREATE TABLE "UserSession" (
    "userSessionId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "UserSession_pkey" PRIMARY KEY ("userSessionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"("roleId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCouponMapping" ADD CONSTRAINT "UserCouponMapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCouponMapping" ADD CONSTRAINT "UserCouponMapping_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupons"("couponId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCouponMapping" ADD CONSTRAINT "ProductCouponMapping_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupons"("couponId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCouponMapping" ADD CONSTRAINT "ProductCouponMapping_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_userOrderId_fkey" FOREIGN KEY ("userOrderId") REFERENCES "UserOrder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOrder" ADD CONSTRAINT "UserOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCart" ADD CONSTRAINT "UserCart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("productId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSession" ADD CONSTRAINT "UserSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
