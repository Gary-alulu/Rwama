import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { UserRole, UserStatus } from "@prisma/client";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, role, ...roleData } = body;

    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { message: "Missing required fields." },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email is already registered." },
        { status: 409 }
      );
    }

    const validRoles = [
      "FARMER",
      "BUYER",
      "FACTORY_MANAGER",
      "FACTORY_STAFF",
      "COOPERATIVE_STAFF",
      "PLOT_SELLER"
    ];

    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { message: "Invalid role specified." },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    // Start a transaction to create User and their specific profile
    const result = await prisma.$transaction(async (tx) => {
      // Create Base User
      const user = await tx.user.create({
        data: {
          email,
          name,
          role: role as UserRole,
          passwordHash: hashedPassword,
          status: "PENDING" as UserStatus, // Requires email verification / admin approval
        },
      });

      // Create role-specific profile based on selected role
      switch (role) {
        case "FARMER":
          if (!roleData.farmerId || !roleData.nationalId || !roleData.factoryId) {
            throw new Error("Missing required farmer profile fields.");
          }
          await tx.farmerProfile.create({
            data: {
              userId: user.id,
              farmerId: roleData.farmerId,
              nationalId: roleData.nationalId,
              factoryId: roleData.factoryId,
              phoneNumber: roleData.phoneNumber,
              farmLocation: roleData.farmLocation,
            },
          });
          break;

        case "BUYER":
          await tx.buyerProfile.create({
            data: {
              userId: user.id,
              companyName: roleData.companyName,
              country: roleData.country,
              businessType: roleData.businessType,
            },
          });
          break;

        case "FACTORY_MANAGER":
        case "FACTORY_STAFF":
          if (!roleData.employeeId || !roleData.factoryId) {
            throw new Error("Missing required factory staff fields.");
          }
          await tx.factoryManagerProfile.create({
            data: {
              userId: user.id,
              employeeId: roleData.employeeId,
              factoryId: roleData.factoryId,
            },
          });
          break;

        case "COOPERATIVE_STAFF":
          if (!roleData.employeeId) {
            throw new Error("Missing required cooperative staff fields.");
          }
          await tx.cooperativeStaffProfile.create({
            data: {
              userId: user.id,
              employeeId: roleData.employeeId,
              department: roleData.department,
            },
          });
          break;

        case "PLOT_SELLER":
          await tx.plotSellerProfile.create({
            data: {
              userId: user.id,
              phoneNumber: roleData.phoneNumber,
            },
          });
          break;
      }

      return user;
    });

    // TODO: Send Verification Email using Resend/Nodemailer here

    return NextResponse.json(
      { 
        message: "User registered successfully. Please verify your email.",
        user: { id: result.id, email: result.email, role: result.role } 
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error." },
      { status: 500 }
    );
  }
}
