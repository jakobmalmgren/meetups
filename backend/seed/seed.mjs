import dotenv from "dotenv";
import Meetup from "../models/meetupModel.mjs";
import connectDB from "../config/db.mjs";

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    const meetups = [
      {
        title: "React Workshop",
        description: "Lär dig React på en dag",
        host: "JS24",
        date: new Date("2025-11-15T10:00:00"),
        location: "Stockholm",
        category: "Web Development",
        capacity: 20,
        attendees: [],
        reviews: [],
      },
      {
        title: "MongoDB Basics",
        description: "Kom igång med MongoDB",
        host: "JS24",
        date: new Date("2025-11-20T14:00:00"),
        location: "Online",
        category: "Database",
        capacity: 50,
        attendees: [],
        reviews: [],
      },
      {
        title: "Vue.js Nybörjarkurs",
        description: "Introduktion till Vue.js",
        host: "Frontend Team",
        date: new Date("2025-12-01T09:00:00"),
        location: "Göteborg",
        category: "Web Development",
        capacity: 15,
        attendees: [],
        reviews: [],
      },
      {
        title: "Node.js och Express",
        description: "Bygg backend med Node och Express",
        host: "Backend Guru",
        date: new Date("2025-12-05T13:00:00"),
        location: "Online",
        category: "Backend",
        capacity: 30,
        attendees: [],
        reviews: [],
      },
      {
        title: "MongoDB Avancerat",
        description: "Fördjupa dina kunskaper i MongoDB",
        host: "DB Expert",
        date: new Date("2025-12-10T14:00:00"),
        location: "Stockholm",
        category: "Database",
        capacity: 25,
        attendees: [],
        reviews: [],
      },
    ];

    for (const meetup of meetups) {
      const exists = await Meetup.findOne({ title: meetup.title });
      if (!exists) {
        await Meetup.create(meetup);
        console.log(`Meetup "${meetup.title}" added`);
      } else {
        console.log(`Meetup "${meetup.title}" already exists`);
      }
    }

    console.log("Seed done");
    process.exit();
  } catch (err) {
    console.error("error trying to seed:", err);
    process.exit(1);
  }
};

seedData();
