import React from "react";
import Naavbar from "@/components/Naavbar";
import ProductListingPage from "@/components/product/productview";

type Props = {
  searchParams?: { [key: string]: string | string[] | undefined };
};

const ProductsPage = ({ searchParams }: Props) => {
  const showBest =
    searchParams && searchParams.bestsellers === "true" ? true : false;

  return (
    <div>
      <Naavbar />
      <ProductListingPage showBestSellers={showBest} />
    </div>
  );
};

export default ProductsPage;
