import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@launchdock.me" },
    update: {},
    create: {
      email: "admin@launchdock.me",
      name: "Admin User",
      passwordHash: adminPassword,
      role: "ADMIN",
      isEmailVerified: true,
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // Create sample client user
  const clientPassword = await bcrypt.hash("client123", 12);
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "John Doe",
      passwordHash: clientPassword,
      role: "CLIENT",
      isEmailVerified: true,
      phone: "+1234567890",
      company: "Example Corp",
    },
  });

  console.log("✅ Client user created:", client.email);

  // Create sample project
  const project = await prisma.project.create({
    data: {
      name: "E-commerce Website",
      type: "Web Development",
      description: "A modern e-commerce platform with payment integration",
      status: "DEVELOPMENT",
      progress: 45,
      deadline: new Date("2024-12-31"),
      clientId: client.id,
    },
  });

  console.log("✅ Sample project created:", project.name);

  // Create sample milestones
  const milestones = await Promise.all([
    prisma.milestone.create({
      data: {
        projectId: project.id,
        title: "Design Phase",
        description: "Complete all design mockups",
        dueDate: new Date("2024-11-30"),
        completed: true,
        orderIndex: 1,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project.id,
        title: "Development Phase",
        description: "Implement core features",
        dueDate: new Date("2024-12-15"),
        completed: false,
        orderIndex: 2,
      },
    }),
    prisma.milestone.create({
      data: {
        projectId: project.id,
        title: "Testing & Launch",
        description: "Final testing and deployment",
        dueDate: new Date("2024-12-31"),
        completed: false,
        orderIndex: 3,
      },
    }),
  ]);

  console.log("✅ Created", milestones.length, "milestones");

  // Create sample tasks
  const tasks = await Promise.all([
    prisma.task.create({
      data: {
        projectId: project.id,
        title: "Set up authentication",
        description: "Implement user login and registration",
        status: "DONE",
        completed: true,
        orderIndex: 1,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        title: "Build product catalog",
        description: "Create product listing and detail pages",
        status: "IN_PROGRESS",
        completed: false,
        orderIndex: 2,
      },
    }),
    prisma.task.create({
      data: {
        projectId: project.id,
        title: "Integrate payment gateway",
        description: "Add Stripe payment processing",
        status: "TODO",
        completed: false,
        orderIndex: 3,
      },
    }),
  ]);

  console.log("✅ Created", tasks.length, "tasks");

  // Create sample messages
  const messages = await Promise.all([
    prisma.message.create({
      data: {
        projectId: project.id,
        senderId: admin.id,
        content: "Welcome to your project! We're excited to work with you.",
        type: "TEXT",
      },
    }),
    prisma.message.create({
      data: {
        projectId: project.id,
        senderId: client.id,
        content: "Thank you! Looking forward to seeing the progress.",
        type: "TEXT",
      },
    }),
  ]);

  console.log("✅ Created", messages.length, "messages");

  console.log("\n🎉 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
















