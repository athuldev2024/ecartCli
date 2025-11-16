interface Product {
  id: number;
  price: number;
  title: string;
  imageURL: string;
  description: string;
  quantity: number;
}
interface Cart {
  id: number;
  price: number;
  title: string;
  imageURL: string;
  quantity: number;
}

export { Product, Cart };
