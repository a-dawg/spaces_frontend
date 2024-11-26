export interface SharedSpace {
    id: number;
    name: string;
    location: string;
    category: string;
    total_capacity: number;
    rooms: number;
    openingHours: string;
    description: string;
    services: string[];
    size: number;
    rating: number;
    image: string;
  }
  
  export const sharedSpaces: SharedSpace[] = [
    {
      id: 1,
      name: "TechHub Coworking",
      location: "123 Innovation St, Silicon Valley, CA",
      category: "Co-working",
      total_capacity: 100,
      rooms: 10,
      openingHours: "24/7",
      description: "A vibrant coworking space for tech enthusiasts and startups.",
      services: ["High-speed Wi-Fi", "Meeting Rooms", "Coffee Bar", "Printing Services"],
      size: 500,
      rating: 4.7,
      image: "/images/techhub.jpg"
    },
    {
      id: 2,
      name: "Creative Corner",
      location: "456 Artisan Ave, Portland, OR",
      category: "Studios",
      total_capacity: 50,
      rooms: 8,
      openingHours: "8:00 AM - 10:00 PM",
      description: "A cozy studio space for artists and designers to unleash their creativity.",
      services: ["Art Supplies", "Exhibition Area", "Photography Studio", "Workshops"],
      size: 300,
      rating: 4.5,
      image: "/images/creative-corner.jpg"
    },
    {
      id: 3,
      name: "Business Center Plus",
      location: "789 Corporate Blvd, New York, NY",
      category: "Meeting Rooms",
      total_capacity: 200,
      rooms: 15,
      openingHours: "7:00 AM - 9:00 PM",
      description: "Professional meeting rooms and conference facilities for businesses of all sizes.",
      services: ["Video Conferencing", "Catering", "Reception Services", "IT Support"],
      size: 800,
      rating: 4.8,
      image: "/images/business-center.jpg"
    },
    {
      id: 4,
      name: "Zen Workspace",
      location: "101 Tranquil Lane, Austin, TX",
      category: "Co-working",
      total_capacity: 75,
      rooms: 6,
      openingHours: "6:00 AM - 10:00 PM",
      description: "A peaceful coworking environment designed to boost productivity and well-being.",
      services: ["Meditation Room", "Standing Desks", "Yoga Classes", "Organic Cafe"],
      size: 400,
      rating: 4.6,
      image: "/images/zen-workspace.jpg"
    },
    {
      id: 5,
      name: "Maker's Workshop",
      location: "202 Industrial Park, Detroit, MI",
      category: "Workshops",
      total_capacity: 40,
      rooms: 4,
      openingHours: "9:00 AM - 8:00 PM",
      description: "Fully equipped workshop for makers, crafters, and DIY enthusiasts.",
      services: ["3D Printers", "Woodworking Tools", "Metalworking Equipment", "Safety Training"],
      size: 600,
      rating: 4.4,
      image: "/images/makers-workshop.jpg"
    }
  ];