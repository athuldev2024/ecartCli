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

interface User {
  id: number;
  name: string;
  email: string;
  hash: string;
  mobile: string;
}

export { Product, Cart, User };
