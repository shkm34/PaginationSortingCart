import type { ProductDetailed } from "../types/productTypeDetailed";
import { useLoaderData } from "react-router-dom";
import AddButtonOrQuantity from "./Buttons/AddButtonOrQuantity";

export default function ProductPage() {
  const product = useLoaderData() as ProductDetailed;

  return (
    <main className="max-w-[720px] mx-auto my-6 p-4">
      <div className="flex gap-5 items-start border border-gray-200 rounded-lg p-4">
        <div className="w-[220px]">
          {product.images && product.images.length > 0 ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-[220px] object-contain"
            />
          ) : product.thumbnail ? (
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-[220px] object-contain"
            />
          ) : (
            <div className="w-full h-[220px] bg-gray-50 flex items-center justify-center text-gray-400">
              No image
            </div>
          )}

          {/* thumbnails / additional images */}
          {product.images && product.images.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {product.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.title}-${i}`}
                  className="w-16 h-16 object-cover rounded-md border border-gray-200"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex-1">
          <h1 className="m-0 text-[20px]">{product.title}</h1>
          <p className="my-2 text-gray-600">{product.description}</p>

          <div className="text-[18px] font-semibold">
            ${Number(product.price ?? 0).toFixed(2)}
            {product.discountPercentage ? (
              <span className="ml-2 text-[14px] text-red-600">
                {product.discountPercentage}% off
              </span>
            ) : null}
          </div>

          <div className="mt-2 text-gray-600">
            Rating: {product.rating ?? "-"} • Stock: {product.stock ?? "-"} •
            Availability: {product.availabilityStatus ?? "-"}
          </div>

          <div className="inline-flex items-center gap-3 bg-white  rounded-xl p-2 shadow-sm ">
            {/* add to cart or set quantity  */}
            <AddButtonOrQuantity product={product} />
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <div className="flex justify-around gap-5 ">
          {/* description */}
          <div>
            {/* meta */}
            <div className="mt-3">
              <strong>Meta:</strong>
              <div className="mt-2 text-[13px] text-gray-600">
                <div>
                  <strong>Created At:</strong>{" "}
                  {product.meta?.createdAt
                    ? new Date(product.meta.createdAt).toLocaleString()
                    : "-"}
                </div>
                <div>
                  <strong>Updated At:</strong>{" "}
                  {product.meta?.updatedAt
                    ? new Date(product.meta.updatedAt).toLocaleString()
                    : "-"}
                </div>
                <div>
                  <strong>Barcode:</strong> {product.meta?.barcode ?? "-"}
                </div>
                <div className="mt-2">
                  <strong>QR Code:</strong>{" "}
                  {product.meta?.qrCode ? (
                    <a
                      href={product.meta.qrCode}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={product.meta.qrCode}
                        alt="qr"
                        className="w-20 h-20 object-contain align-middle"
                      />
                    </a>
                  ) : (
                    "-"
                  )}
                </div>
              </div>
            </div>

            {/* Images */}
            <div className="mt-3">
              <strong>Images:</strong>
              <div className="mt-2 flex gap-2 flex-wrap">
                {(product.images || []).length === 0 ? (
                  <span className="text-gray-500">-</span>
                ) : (
                  (product.images || []).map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt={`${product.title}-${i}`}
                      className="w-24 h-24 object-cover rounded-md border border-gray-200"
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <div>
              <strong>Category:</strong> {product.category ?? "-"}
            </div>
            <div className="mt-2">
              <strong>Brand:</strong> {product.brand ?? "-"}
            </div>
            <div className="mt-2">
              <strong>SKU:</strong> {product.sku ?? "-"}
            </div>
            <div className="mt-2">
              <strong>Weight:</strong> {product.weight ?? "-"} g
            </div>
            <div className="mt-2">
              <strong>Minimum Order Quantity:</strong>{" "}
              {product.minimumOrderQuantity ?? "-"}
            </div>

            <div className="mt-3">
              <strong>Dimensions (W × H × D):</strong>{" "}
              {product.dimensions
                ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
                : "-"}
            </div>

            <div className="mt-2">
              <strong>Warranty:</strong> {product.warrantyInformation ?? "-"}
            </div>
            <div className="mt-2">
              <strong>Shipping:</strong> {product.shippingInformation ?? "-"}
            </div>
            <div className="mt-2">
              <strong>Return Policy:</strong> {product.returnPolicy ?? "-"}
            </div>

            <div className="mt-3">
              <strong>Tags:</strong>
              <div className="mt-2 flex gap-2 flex-wrap">
                {(product.tags || []).length === 0 ? (
                  <span className="text-gray-500">-</span>
                ) : (
                  (product.tags || []).map((t, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs border border-gray-200 rounded-full"
                    >
                      {t}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Reviews */}
        <div className="mt-4">
          <strong>Reviews ({(product.reviews || []).length}):</strong>
          <div className="mt-2 flex flex-col gap-2">
            {(product.reviews || []).length === 0 ? (
              <div className="text-gray-500">No reviews yet.</div>
            ) : (
              (product.reviews || []).map((r, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-2.5"
                >
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">
                      {r.reviewerName ?? r.reviewerEmail ?? "Anonymous"}
                    </div>
                    <div className="text-gray-700">{r.rating} ★</div>
                  </div>
                  <div className="mt-2 text-gray-800">{r.comment}</div>
                  <div className="mt-2 text-xs text-gray-500">
                    {r.date ? new Date(r.date).toLocaleString() : "-"}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
