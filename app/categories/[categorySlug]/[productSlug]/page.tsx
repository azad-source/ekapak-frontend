import { getProductBySlug } from "@/entities/product/api";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductPlaceholderImage from "@/public/product-placeholder.png";
import { Product } from "@/entities/product/types";
import { AddToCartButton } from "./components/add-to-cart-button";

interface PageProps {
  params: Promise<{
    categorySlug: string;
    productSlug: string;
  }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { productSlug } = await params;
  const productResponse = await getProductBySlug(productSlug);
  const product: Product | undefined = productResponse?.data;

  if (!product) notFound();

  const mainImage =
    product.images?.[0]?.original_url || ProductPlaceholderImage.src;

  // Сортируем свойства: сначала важные, потом остальные
  const orderedPropertyKeys = [
    "Ширина, мм",
    "Толщина, мкм",
    "Намотка, м",
    "Вес рулона, кг",
    "Цвет",
    "Материал",
    "Вид",
    "Назначение упаковки",
  ];

  const otherProperties = Object.keys(product.properties).filter(
    (key) => !orderedPropertyKeys.includes(key) && product.properties[key]
  );

  const allProperties = [
    ...orderedPropertyKeys.filter((key) => product.properties[key]),
    ...otherProperties,
  ];

  return (
    <div className="container mx-auto px-4 py-8 mt-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Левая колонка: изображение */}
        <div className="shrink-0 w-full lg:w-1/2 flex justify-center">
          <Image
            src={mainImage}
            alt={product.name}
            width={400}
            height={400}
            className="object-contain rounded-lg border border-gray-200 max-w-full h-auto"
          />
        </div>

        {/* Правая колонка: информация о товаре */}
        <div className="flex-1 flex flex-col gap-5">
          <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>

          {product.article && (
            <p className="text-sm text-gray-600">Артикул: {product.article}</p>
          )}

          {product.description && (
            <div className="text-gray-700 whitespace-pre-line">
              {product.description}
            </div>
          )}

          {/* Характеристики */}
          {allProperties.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Характеристики
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {allProperties.map((key) => (
                  <div key={key} className="flex justify-between">
                    <dt className="text-gray-600">{key}:</dt>
                    <dd className="text-gray-900 font-medium ml-2">
                      {product.properties[key] || "—"}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Варианты покупки */}
          {product.offers && product.offers.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Доступные предложения
              </h2>
              <div className="space-y-3">
                {product.offers.map((offer) => (
                  <div
                    key={offer.uuid}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-gray-900">
                          {new Intl.NumberFormat("ru-RU", {
                            style: "currency",
                            currency: offer.currency || "RUB",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(parseFloat(offer.price || "0"))}
                        </span>
                        <span className="text-gray-600">
                          / {product.unit_name || offer.unit}
                        </span>
                      </div>
                      <div className="mt-1 text-sm text-gray-600">
                        В наличии: {offer.quantity} {offer.unit}
                      </div>
                    </div>
                    <AddToCartButton
                      product={product}
                      className="w-full sm:w-auto"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Информация о НДС */}
          {product.vat_rate != null && (
            <p className="text-xs text-gray-500 mt-2">
              Включая НДС ({product.vat_rate}%)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
