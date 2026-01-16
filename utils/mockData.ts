
export interface Guide {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  status: 'Available' | 'Busy';
  title: string;
  tags: string[];
  isQuickResponder: boolean;
  image: string;
  languages: string[];
  bio: string;
}

export const GUIDES: Guide[] = [
  {
    id: 1,
    name: "Emma Watson",
    rating: 4.95,
    reviews: 156,
    price: 60,
    status: "Available",
    title: "Cambridge History Student",
    tags: ["Multilingual", "Identity Verified"],
    isQuickResponder: true,
    image: "https://i.pravatar.cc/150?img=25",
    languages: ["English", "French", "Spanish"],
    bio: "Specializing in 17th-century architecture and student life at Cambridge. I provide a unique insider's perspective."
  },
  {
    id: 2,
    name: "James Lee",
    rating: 4.85,
    reviews: 92,
    price: 55,
    status: "Available",
    title: "Local Expert",
    tags: ["Multilingual", "Identity Verified"],
    isQuickResponder: false,
    image: "https://i.pravatar.cc/150?img=12",
    languages: ["English", "Mandarin"],
    bio: "Born and raised in Cambridge. I know the hidden gems that tourists usually miss."
  },
  {
    id: 3,
    name: "Sarah Connors",
    rating: 4.92,
    reviews: 110,
    price: 65,
    status: "Busy",
    title: "Architecture Specialist",
    tags: ["Identity Verified"],
    isQuickResponder: true,
    image: "https://i.pravatar.cc/150?img=13",
    languages: ["English", "German"],
    bio: "Ph.D. student in Architecture. Let's explore the structural marvels of the colleges."
  },
  {
    id: 4,
    name: "Michael Chen",
    rating: 4.75,
    reviews: 45,
    price: 50,
    status: "Busy",
    title: "Gourmet Foodie",
    tags: ["Multilingual"],
    isQuickResponder: false,
    image: "https://i.pravatar.cc/150?img=5",
    languages: ["English", "Cantonese"],
    bio: "Join me for a culinary tour of the best local eats and historic pubs."
  }
];

export interface AudioTour {
  id: number;
  title: string;
  desc: string;
  time: string;
  rating: number;
  reviews: number;
  languages: string[];
  price: number;
  image: string;
}

export const AUDIO_TOURS: AudioTour[] = [
  {
    id: 1,
    title: "Historic Cambridge Colleges Walk",
    desc: "Explore famous colleges and hidden history at your own pace.",
    time: "90 min",
    rating: 4.8,
    reviews: 210,
    languages: ["English", "Chinese", "French"],
    price: 9.99,
    image: "https://picsum.photos/seed/kings_college/200/200"
  },
  {
    id: 2,
    title: "University of Oxford Highlights",
    desc: "Discover architectural marvels and student life.",
    time: "120 min",
    rating: 4.9,
    reviews: 350,
    languages: ["English", "Chinese"],
    price: 12.50,
    image: "https://picsum.photos/seed/oxford_dome/200/200"
  }
];

export const COFFEE_HOSTS = [
    {
      id: 1,
      name: "Sophia Davis",
      role: "Oxford PhD Student",
      bio: "Passionate about literature and history. Let's chat over coffee.",
      languages: "English, French",
      price: 25,
      image: "https://i.pravatar.cc/150?img=25"
    },
    {
      id: 2,
      name: "James Lee",
      role: "Cambridge MBA Candidate",
      bio: "Discussing business strategies and startups. Open to new ideas.",
      languages: "English, Mandarin",
      price: 30,
      image: "https://i.pravatar.cc/150?img=12"
    }
];

export const RESTAURANTS = [
    {
      id: 1,
      name: "Liceria & Co.",
      rating: 4.9,
      reviews: 78,
      price: "$25 - $50",
      tags: ["Indonesian", "Rice Dish"],
      image: "https://picsum.photos/seed/rice_dish/200/200"
    },
    {
      id: 2,
      name: "Spice Garden",
      rating: 4.8,
      reviews: 120,
      price: "$20 - $40",
      tags: ["Indian", "Curry"],
      image: "https://picsum.photos/seed/butter_chicken/200/200"
    }
];
