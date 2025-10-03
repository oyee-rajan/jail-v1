import Naavbar from "@/components/Naavbar";
import ProductListingPage from "@/components/product/productview";
import React from "react";

type PageProps = {
  params: { category: string };
};

const Productviews = ({ params }: PageProps) => {
  const { category } = params;

  return (
    <div>
      <Naavbar />
      <ProductListingPage category={category} />
    </div>
  );
};

export default Productviews;
