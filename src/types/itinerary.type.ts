export interface TravelItinerary {
  city: string;
  days: number;
  budget: number;
  totalCost: number;
  dailyPlan: DailyPlan[];
  recommendations: Recommendations;
}

export interface DailyPlan {
  day: number;
  activities: Activity[];
}

export interface Activity {
  time: string; // Example: "09:00 AM"
  description: string;
  location: string;
  cost: number;
  type: 'food' | 'sightseeing' | 'transport' | 'shopping' | 'accommodation';
}

export interface Recommendations {
  generalTips: string[]; // Example: ["Bring comfortable shoes", "Avoid crowded areas at noon"]
  localCuisine: string[]; // Example: ["Try the famous local dish XYZ"]
  transportOptions: string[]; // Example: ["Rent a bike", "Use metro for short distances"]
}

export interface ItineraryResponse {
  id: string;
  user_id: string;
  data: string;
}