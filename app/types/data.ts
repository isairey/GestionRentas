export interface Room {
  _id: number;
  roomNumber: string;
  title: string;
  description: string;
  price: number;
  features: string[];
  status: 'vacant' | 'occupied';
}

export interface Update {
  _id: string ,
  update: string,
  description: string,
  createdAt: string,
}
    