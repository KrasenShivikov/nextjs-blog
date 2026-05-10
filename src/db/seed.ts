import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, posts } from "./schema";

async function seed() {
  // sample users
  const rawUsers = [
    { name: "Steve", email: "steve@gmail.com", password: "pass123" },
    { name: "Maria", email: "maria@gmail.com", password: "pass123" },
  ];

  console.log("Hashing passwords and inserting users...");

  const createdUsers: { id: string; name: string; email: string }[] = [];

  for (const u of rawUsers) {
    const hashed = await bcrypt.hash(u.password, 10);
    const inserted = await db
      .insert(users)
      .values({ name: u.name, email: u.email, passwordHash: hashed })
      .returning({ id: users.id, name: users.name, email: users.email });

    const row = inserted[0];
    createdUsers.push({ id: row.id, name: row.name, email: row.email });
  }

  console.log(`Inserted ${createdUsers.length} users.`);

  console.log("Inserting posts for each user...");

  const samplePostsFor = (authorName: string) => [
    {
      title: `${authorName} — First Post`,
      content: `This is the first post by ${authorName}.`,
      tags: ["intro", "welcome"],
    },
    {
      title: `${authorName} — Second Post`,
      content: `A follow-up from ${authorName}.`,
      tags: ["update"],
    },
    {
      title: `${authorName} — Thoughts`,
      content: `Random thoughts by ${authorName}.`,
      tags: ["thoughts"],
    },
    {
      title: `${authorName} — Tips`,
      content: `Some handy tips from ${authorName}.`,
      tags: ["tips"]
    },
    {
      title: `${authorName} — Wrap Up`,
      content: `Wrapping up from ${authorName}.`,
      tags: ["wrap-up"]
    },
  ];

  for (const user of createdUsers) {
    const postsToInsert = samplePostsFor(user.name);
    for (const p of postsToInsert) {
      await db.insert(posts).values({
        title: p.title,
        content: p.content,
        tags: p.tags,
        owner: user.id,
      });
    }
    console.log(`Inserted ${postsToInsert.length} posts for ${user.email}`);
  }

  console.log("Seeding complete.");
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
