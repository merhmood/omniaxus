import { StaticImageData } from "next/image";

type ProductType = {
  id: string;
  image: string | StaticImageData;
  subImages: [string, string, string, string];
  title: string;
  description: string;
  link?: string;
  sellerLink?: string;
};

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Defines the shape with values necessary to increase the products
interface IncreaseProduct {
  productsCursor: number;
  products: ProductType[];
  setRenderedProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setProductCursor: React.Dispatch<React.SetStateAction<number>>;
  isSession: boolean;
  sessionCursor?: number;
}

export type { ProductType, Props, IncreaseProduct };
