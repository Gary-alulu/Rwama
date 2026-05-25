import { NextResponse } from 'next/server';

export interface CoffeeLot {
  id: string;
  name: string;
  factory: string;
  grade: string;
  scaScore: number;
  price: string;
  flavorNotes: string[];
  availability: 'In-Stock' | 'Pre-order';
  image: string;
}

const MOCK_LOTS: CoffeeLot[] = [
  {
    id: "RWA-2024-AA-001",
    name: "Peaberry Reserve",
    factory: "Muthigi-ini",
    grade: "PB",
    scaScore: 88.5,
    price: "$8.40/kg",
    flavorNotes: ["Blackcurrant", "Lemon Zest", "Dark Chocolate"],
    availability: "In-Stock",
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600",
  },
  {
    id: "RWA-2024-AB-002",
    name: "Classic AB",
    factory: "Kimatu",
    grade: "AB",
    scaScore: 86.0,
    price: "$6.80/kg",
    flavorNotes: ["Red Plum", "Brown Sugar", "Black Tea"],
    availability: "In-Stock",
    image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600",
  },
  {
    id: "RWA-2024-AA-003",
    name: "Top AA",
    factory: "Muburi",
    grade: "AA",
    scaScore: 87.5,
    price: "$7.90/kg",
    flavorNotes: ["Grapefruit", "Caramel", "Jasmine"],
    availability: "Pre-order",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=600",
  },
  {
    id: "RWA-2024-AA-004",
    name: "Muthigi-ini AA",
    factory: "Muthigi-ini",
    grade: "AA",
    scaScore: 89.0,
    price: "$8.10/kg",
    flavorNotes: ["Bergamot", "Honey", "Blackberry"],
    availability: "In-Stock",
    image: "https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=600",
  },
  {
    id: "RWA-2024-PB-005",
    name: "Kimatu Peaberry",
    factory: "Kimatu",
    grade: "PB",
    scaScore: 87.0,
    price: "$8.00/kg",
    flavorNotes: ["Cranberry", "Toffee", "Hibiscus"],
    availability: "Pre-order",
    image: "https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=600",
  },
  {
    id: "RWA-2024-AB-006",
    name: "Muburi Estate",
    factory: "Muburi",
    grade: "AB",
    scaScore: 85.5,
    price: "$6.50/kg",
    flavorNotes: ["Cherry", "Milk Chocolate", "Orange"],
    availability: "In-Stock",
    image: "https://images.unsplash.com/photo-1514432324607-a2ce7beea847?q=80&w=600",
  }
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const factory = searchParams.get('factory');
  const grade = searchParams.get('grade');
  const availability = searchParams.get('availability');
  const minScore = searchParams.get('minScore') ? parseFloat(searchParams.get('minScore') as string) : 0;

  // Simulate network delay for cinematic effect
  await new Promise(resolve => setTimeout(resolve, 800));

  let filteredLots = [...MOCK_LOTS];

  if (search) {
    filteredLots = filteredLots.filter(lot => 
      lot.name.toLowerCase().includes(search) || 
      lot.id.toLowerCase().includes(search) ||
      lot.factory.toLowerCase().includes(search)
    );
  }

  if (factory && factory !== 'All') {
    filteredLots = filteredLots.filter(lot => lot.factory.toLowerCase() === factory.toLowerCase());
  }

  if (grade && grade !== 'All') {
    filteredLots = filteredLots.filter(lot => lot.grade === grade);
  }

  if (availability && availability !== 'All') {
    filteredLots = filteredLots.filter(lot => lot.availability === availability);
  }

  if (minScore > 0) {
    filteredLots = filteredLots.filter(lot => lot.scaScore >= minScore);
  }

  return NextResponse.json(filteredLots);
}
