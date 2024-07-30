export class RestaurantDish {
    id: string;
    name: string;
    calories: number;
    portion: number;
    price: number;
    glycemicIndex: number;
    homeDishId: string;
    imageUrl: string;
    imageCredits: string;
    ingredients?: any[];
}