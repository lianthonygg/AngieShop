import DetailProductView from "@/src/features/detail-product/presentation/views/detail-product-view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const ProductDetail = async ({ params }: PageProps) => {
  const { slug } = await params;

  return <DetailProductView slug={slug} />;
};

export default ProductDetail;
