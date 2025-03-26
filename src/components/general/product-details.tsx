const ProductDetails = ({
  desc,
  eolInfo,
}: {
  desc: string;
  eolInfo: string;
}) => {
  return (
    <>
      <h4 className="text-lg lg:text-xl font-medium">Description</h4>

      <p className="text-[#696969]">{desc}</p>

      <h4 className="text-lg lg:text-xl font-medium">
        End of Life Instructions
      </h4>

      <p className="text-[#696969]">{eolInfo}</p>
    </>
  );
};

export default ProductDetails;
