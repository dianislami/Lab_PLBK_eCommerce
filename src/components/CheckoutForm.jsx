import { useState } from "react";
import { z } from "zod";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

const checkoutSchema = z.object({
  nama: z
    .string()
    .min(3, "Nama harus minimal 3 karakter")
    .max(50, "Nama maksimal 50 karakter")
    .regex(/^[a-zA-Z\s]+$/, "Nama hanya boleh berisi huruf dan spasi"),
  alamat: z
    .string()
    .min(10, "Alamat harus minimal 10 karakter")
    .max(200, "Alamat maksimal 200 karakter"),
  nomorTelepon: z
    .string()
    .regex(
      /^(\+62|0)[0-9]{9,12}$/,
      "Nomor telepon tidak valid (contoh: 081234567890 atau +6281234567890)",
    ),
});

export default function CheckoutForm({
  totalPrice,
  onCheckoutSuccess,
  onBackToHome,
}) {
  const [formData, setFormData] = useState({
    nama: "",
    alamat: "",
    nomorTelepon: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = checkoutSchema.parse(formData);
      setLoading(true);

      setTimeout(() => {
        const orderNumber = `ORD-${uuidv4().slice(0, 8).toUpperCase()}`;
        const orderDate = dayjs().format("DD MMMM YYYY [pukul] HH:mm:ss");

        const order = {
          orderNumber,
          date: orderDate,
          customer: validatedData,
          totalPrice,
          status: "Berhasil",
        };

        console.log("Setting order data:", order);
        setOrderData(order);
        setFormData({
          nama: "",
          alamat: "",
          nomorTelepon: "",
        });

        setLoading(false);

        if (onCheckoutSuccess) {
          onCheckoutSuccess(order);
        }
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error instanceof z.ZodError) {
        const fieldErrors = {};
        const errorMap = error.flatten().fieldErrors;

        Object.keys(errorMap).forEach((field) => {
          if (errorMap[field] && errorMap[field].length > 0) {
            fieldErrors[field] = errorMap[field][0];
          }
        });

        setErrors(fieldErrors);
      }
    }
  };

  return (
    <>
      {/* Modal Success */}
      {orderData && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "12px",
              padding: "2.5rem",
              maxWidth: "500px",
              width: "90%",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✅</div>
            <h2
              style={{
                color: "#27AE60",
                marginBottom: "0.5rem",
                fontSize: "1.8rem",
              }}
            >
              Pesanan Berhasil Dikonfirmasi!
            </h2>
            <p
              style={{
                color: "#666",
                marginBottom: "2rem",
                fontSize: "0.95rem",
              }}
            >
              Terima kasih telah berbelanja dengan kami
            </p>

            {orderData && (
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                  textAlign: "left",
                }}
              >
                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
                    Nomor Pesanan
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                      color: "#1B4F72",
                    }}
                  >
                    {orderData.orderNumber}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
                    Tanggal Pesanan
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {orderData.date}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
                    Nama Penerima
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {orderData.customer.nama}
                  </p>
                </div>

                <div
                  style={{
                    marginBottom: "1rem",
                    paddingBottom: "1rem",
                    borderBottom: "1px solid #ddd",
                  }}
                >
                  <p style={{ margin: 0, color: "#999", fontSize: "0.9rem" }}>
                    Alamat Pengiriman
                  </p>
                  <p
                    style={{
                      margin: "0.25rem 0 0",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      color: "#333",
                    }}
                  >
                    {orderData.customer.alamat}
                  </p>
                </div>

                <div
                  style={{
                    backgroundColor: "white",
                    padding: "1rem",
                    borderRadius: "6px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span style={{ color: "#999", fontSize: "0.95rem" }}>
                    Total Pembayaran
                  </span>
                  <span
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.3rem",
                      color: "#27AE60",
                    }}
                  >
                    ${orderData.totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link
                to="/"
                onClick={onBackToHome}
                style={{
                  padding: "0.75rem 1.5rem",
                  backgroundColor: "#27AE60",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.95rem",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "inline-block",
                }}
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      {!orderData && (
        <div style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
          <h2 style={{ color: "#1B4F72", marginBottom: "1rem" }}>
            Form Checkout
          </h2>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.nama ? "2px solid #dc3545" : "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.nama && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.9rem",
                    margin: "0.25rem 0 0",
                  }}
                >
                  {errors.nama}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Alamat Lengkap
              </label>
              <textarea
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                placeholder="Masukkan alamat lengkap"
                rows="3"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.alamat
                    ? "2px solid #dc3545"
                    : "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                  resize: "vertical",
                }}
              />
              {errors.alamat && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.9rem",
                    margin: "0.25rem 0 0",
                  }}
                >
                  {errors.alamat}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "1.5rem" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleChange}
                placeholder="Contoh: 081234567890"
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: errors.nomorTelepon
                    ? "2px solid #dc3545"
                    : "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
              {errors.nomorTelepon && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: "0.9rem",
                    margin: "0.25rem 0 0",
                  }}
                >
                  {errors.nomorTelepon}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                backgroundColor: loading ? "#ccc" : "#1B4F72",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontSize: "1rem",
                fontWeight: "600",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background-color 0.3s",
              }}
            >
              {loading
                ? "Memproses..."
                : `Checkout - $${totalPrice.toFixed(2)}`}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
