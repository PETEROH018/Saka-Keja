import { useEffect, useState } from "react";
import "./PaymentPopup.css";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function isValidKenyanPhone(phone) {
  return /^(07|01)\d{8}$/.test(phone);
}

export default function PaymentPopup({
  isOpen,
  onClose,
  amount = 0,
  onPaymentRequest,
  unitName = "",
}) {
  const [method, setMethod] = useState("mpesa"); // 'mpesa' or 'card'
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (e) => {
      if (e.key === "Escape" && !loading) handleClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, loading]);

  if (!isOpen) return null;

  const resetForm = () => {
    setMethod("mpesa");
    setPhone("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setError("");
    setLoading(false);
    setSuccess(false);
  };

  const handleClose = () => {
    if (loading) return;
    resetForm();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (method === "mpesa") {
      const cleanPhone = phone.replace(/\D/g, "");
      if (!cleanPhone) {
        setError("Enter your M-Pesa phone number.");
        return;
      }
      if (!isValidKenyanPhone(cleanPhone)) {
        setError("Enter a valid Kenyan number starting with 07 or 01.");
        return;
      }
    } else {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        setError("Enter a valid 16-digit card number.");
        return;
      }
      if (!cardExpiry.includes("/")) {
        setError("Enter a valid MM/YY expiration date.");
        return;
      }
      if (cardCvc.length < 3) {
        setError("Enter a valid 3-digit CVC.");
        return;
      }
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid payment amount.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const cleanPhone = phone.replace(/\D/g, "");
      const formattedPhone = cleanPhone ? `254${cleanPhone.slice(1)}` : "";

      if (onPaymentRequest) {
        await onPaymentRequest({
          amount: Number(amount),
          payment_method: method,
          phone: formattedPhone,
          card_details: method === "card" ? { cardNumber, cardExpiry, cardCvc } : null,
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error("Payment error:", err);
      setError(err instanceof Error ? err.message : "Payment processing failed.");
    } finally {
      setLoading(false);
    }
  };

  const formattedAmount = Number(amount || 0).toLocaleString();

  return (
    <div className="payment-overlay" onMouseDown={(e) => e.target === e.currentTarget && !loading && handleClose()}>
      <div className="payment-modal" role="dialog" aria-modal="true">
        <button type="button" className="payment-close" onClick={handleClose} disabled={loading}>×</button>

        {success ? (
          <div className="payment-success">
            <div className="success-icon">✓</div>
            <h2>Booking Secured!</h2>
            {unitName && <p className="font-semibold text-gray-700">{unitName}</p>}
            <p>Your deposit payment was successful. Unit availability has been updated.</p>
            <button type="button" className="payment-button" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="payment-header">
              <h2>Secure Your Booking</h2>
              {unitName && <p className="font-semibold text-gray-700">{unitName}</p>}
              <p>Pay your deposit of KES {formattedAmount} to reserve this unit.</p>
            </div>

            {/* Payment Method Selector */}
            <div className="method-toggle">
              <button
                type="button"
                className={`toggle-btn ${method === "mpesa" ? "active" : ""}`}
                onClick={() => { setMethod("mpesa"); setError(""); }}
              >
                💚 M-Pesa
              </button>
              <button
                type="button"
                className={`toggle-btn ${method === "card" ? "active" : ""}`}
                onClick={() => { setMethod("card"); setError(""); }}
              >
                💳 Credit/Debit Card
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {method === "mpesa" ? (
                <div className="payment-field">
                  <label htmlFor="phone">M-Pesa Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="0712 345 678"
                    value={formatPhone(phone)}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    disabled={loading}
                  />
                </div>
              ) : (
                <div className="card-fields">
                  <div className="payment-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 1122 3344 5566"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="card-inline-fields">
                    <div className="payment-field">
                      <label>Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                    <div className="payment-field">
                      <label>CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        maxLength="4"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && <p className="payment-error">{error}</p>}

              <button type="submit" className="payment-button" disabled={loading}>
                {loading ? "Processing Payment..." : `Pay KES ${formattedAmount}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}