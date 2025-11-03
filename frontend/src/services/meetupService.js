const mockMeetups = [
  { id: 1, title: "Frontend Developers Meetup", date: "2025-11-05", location: "Stockholm", category: "Web Development" },
  { id: 2, title: "React CI/CD Workshop", date: "2025-12-10", location: "Göteborg", category: "DevOps" },
  { id: 3, title: "JavaScript Community Night", date: "2026-01-14", location: "Stockholm", category: "Web Development" },
  { id: 4, title: "Docker Deep Dive", date: "2026-02-08", location: "Malmö", category: "DevOps" },
  { id: 5, title: "Node.js API Masterclass", date: "2026-03-02", location: "Göteborg", category: "Backend" },
  { id: 6, title: "GitHub Actions for Beginners", date: "2026-03-28", location: "Stockholm", category: "DevOps" },
  { id: 7, title: "Modern CSS & Tailwind Workshop", date: "2026-04-11", location: "Malmö", category: "Web Development" },
  { id: 8, title: "Fullstack Networking Night", date: "2026-05-09", location: "Göteborg", category: "Networking" },
  { id: 9, title: "TypeScript Fundamentals Bootcamp", date: "2026-06-20", location: "Stockholm", category: "Web Development" },
  { id: 10, title: "Next.js and Vite Integration Session", date: "2026-07-15", location: "Distans", category: "Web Development" },
  { id: 11, title: "Old AI Ethics Panel", date: "2025-01-20", location: "Distans", category: "AI" } // Från din "history"
];

/**
 * Simulerar ett nätverksanrop för att hämta alla meetups.
 * När backend är klar, byt ut detta mot ett verkligt fetch-anrop.
 */
export const getAllMeetups = () => {
  console.log("Fetching mock meetups...");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockMeetups);
    }, 500); // Simulerar 0.5s laddningstid
  });
};