import { useState } from "react";
import type { ProductDetailed } from "../types/productTypeDetailed";
import type { Product } from "../types/types";
import { useLoaderData } from "react-router-dom";

// Minimal TypeScript product page component



type Props = {
  onAdd?: (product: Product) => void;
};

export default function ProductPage({ onAdd }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const product = useLoaderData() as ProductDetailed;
  console.log("Loaded product:", product);

  const handleAdd = () => {
    if (product.stock !== undefined && quantity > product.stock) {
      alert("Not enough stock");
      return;
    }
    onAdd?.(product);
  };

  return (
   <main style={{ maxWidth: 720, margin: "24px auto", padding: 16 }}>
  <div style={{ display: "flex", gap: 20, alignItems: "flex-start", border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
    <div style={{ width: 220 }}>
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          style={{ width: "100%", height: 220, objectFit: "contain" }}
        />
      ) : product.thumbnail ? (
        <img
          src={product.thumbnail}
          alt={product.title}
          style={{ width: "100%", height: 220, objectFit: "contain" }}
        />
      ) : (
        <div style={{ width: "100%", height: 220, background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", color: "#999" }}>
          No image
        </div>
      )}

      {/* thumbnails / additional images */}
      {product.images && product.images.length > 1 && (
        <div style={{ marginTop: 12, display: "flex", gap: 8, overflowX: "auto" }}>
          {product.images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${product.title}-${i}`}
              style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }}
            />
          ))}
        </div>
      )}
    </div>

    <div style={{ flex: 1 }}>
      <h1 style={{ margin: 0, fontSize: 20 }}>{product.title}</h1>
      <p style={{ margin: "8px 0", color: "#555" }}>{product.description}</p>

      <div style={{ fontSize: 18, fontWeight: 600 }}>
        ${Number(product.price ?? 0).toFixed(2)}
        {product.discountPercentage ? (
          <span style={{ marginLeft: 10, fontSize: 14, color: "#d00" }}>{product.discountPercentage}% off</span>
        ) : null}
      </div>

      <div style={{ marginTop: 8, color: "#666" }}>
        Rating: {product.rating ?? "-"} • Stock: {product.stock ?? "-"} • Availability: {product.availabilityStatus ?? "-"}
      </div>

      <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
        <label style={{ fontSize: 14 }}>Qty</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))}
          style={{ width: 64, padding: 6 }}
        />

        <button onClick={handleAdd} style={{ padding: "8px 12px", background: "#111", color: "white", border: "none", borderRadius: 6 }}>
          Add to cart
        </button>
      </div>

      <div style={{ marginTop: 16, fontSize: 14, color: "#444" }}>
        <div><strong>Category:</strong> {product.category ?? "-"}</div>
        <div style={{ marginTop: 6 }}><strong>Brand:</strong> {product.brand ?? "-"}</div>
        <div style={{ marginTop: 6 }}><strong>SKU:</strong> {product.sku ?? "-"}</div>
        <div style={{ marginTop: 6 }}><strong>Weight:</strong> {product.weight ?? "-"} g</div>
        <div style={{ marginTop: 6 }}><strong>Minimum Order Quantity:</strong> {product.minimumOrderQuantity ?? "-"}</div>

        <div style={{ marginTop: 12 }}>
          <strong>Dimensions (W × H × D):</strong>{" "}
          {product.dimensions
            ? `${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth}`
            : "-"}
        </div>

        <div style={{ marginTop: 8 }}><strong>Warranty:</strong> {product.warrantyInformation ?? "-"}</div>
        <div style={{ marginTop: 8 }}><strong>Shipping:</strong> {product.shippingInformation ?? "-"}</div>
        <div style={{ marginTop: 8 }}><strong>Return Policy:</strong> {product.returnPolicy ?? "-"}</div>

        <div style={{ marginTop: 12 }}>
          <strong>Tags:</strong>
          <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {(product.tags || []).length === 0 ? (
              <span style={{ color: "#777" }}>-</span>
            ) : (
              (product.tags || []).map((t, i) => (
                <span key={i} style={{ padding: "4px 8px", fontSize: 12, border: "1px solid #eee", borderRadius: 999 }}>
                  {t}
                </span>
              ))
            )}
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Meta:</strong>
          <div style={{ marginTop: 6, fontSize: 13, color: "#555" }}>
            <div><strong>Created At:</strong> {product.meta?.createdAt ? new Date(product.meta.createdAt).toLocaleString() : "-"}</div>
            <div><strong>Updated At:</strong> {product.meta?.updatedAt ? new Date(product.meta.updatedAt).toLocaleString() : "-"}</div>
            <div><strong>Barcode:</strong> {product.meta?.barcode ?? "-"}</div>
            <div style={{ marginTop: 8 }}>
              <strong>QR Code:</strong>{" "}
              {product.meta?.qrCode ? (
                <a href={product.meta.qrCode} target="_blank" rel="noreferrer">
                  <img src={product.meta.qrCode} alt="qr" style={{ width: 80, height: 80, objectFit: "contain", verticalAlign: "middle" }} />
                </a>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <strong>Images:</strong>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap" }}>
            {(product.images || []).length === 0 ? (
              <span style={{ color: "#777" }}>-</span>
            ) : (
              (product.images || []).map((src, i) => (
                <img key={i} src={src} alt={`${product.title}-${i}`} style={{ width: 96, height: 96, objectFit: "cover", borderRadius: 6, border: "1px solid #eee" }} />
              ))
            )}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <strong>Reviews ({(product.reviews || []).length}):</strong>
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 8 }}>
            {(product.reviews || []).length === 0 ? (
              <div style={{ color: "#777" }}>No reviews yet.</div>
            ) : (
              (product.reviews || []).map((r, idx) => (
                <div key={idx} style={{ border: "1px solid #eee", borderRadius: 8, padding: 10 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontWeight: 600 }}>{r.reviewerName ?? r.reviewerEmail ?? "Anonymous"}</div>
                    <div style={{ color: "#444" }}>{r.rating} ★</div>
                  </div>
                  <div style={{ marginTop: 6, color: "#333" }}>{r.comment}</div>
                  <div style={{ marginTop: 6, fontSize: 12, color: "#777" }}>{r.date ? new Date(r.date).toLocaleString() : "-"}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

  );
}
