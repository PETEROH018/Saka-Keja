import React, { useEffect, useState } from "react";
import "./PaymentPopup.css";

function formatNineDigits(value) {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
}

function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

export default function PaymentPopup({
  isOpen,
  onClose,
  amount = 0,
  onPaymentRequest,
  unitName = "",
}) {
  const [method, setMethod] = useState("mpesa");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");
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
    setPhoneDigits("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvc("");
    setCardHolder("");
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
    setError("");

    if (method === "mpesa") {
      const cleanDigits = phoneDigits.replace(/\D/g, "");
      if (cleanDigits.length !== 9) {
        setError("Enter a valid 9-digit number (e.g., 712345678).");
        return;
      }
      if (!/^[71]/.test(cleanDigits)) {
        setError("Number must start with 7 or 1.");
        return;
      }
    } else {
      const cleanCard = cardNumber.replace(/\s/g, "");
      if (cleanCard.length !== 16) {
        setError("Card number must be 16 digits.");
        return;
      }
      if (!cardHolder.trim()) {
        setError("Enter the cardholder's name.");
        return;
      }
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardExpiry)) {
        setError("Enter expiry as MM/YY.");
        return;
      }
      if (cardCvc.replace(/\D/g, "").length < 3) {
        setError("CVC must be 3 or 4 digits.");
        return;
      }
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid deposit amount.");
      return;
    }

    setLoading(true);

    try {
      const formattedPhone = method === "mpesa" ? `254${phoneDigits}` : "";

      if (onPaymentRequest) {
        await onPaymentRequest({
          amount: Number(amount),
          payment_method: method,
          phone: formattedPhone,
          card_details:
            method === "card"
              ? {
                  number: cardNumber.replace(/\s/g, ""),
                  expiry: cardExpiry,
                  cvc: cardCvc,
                  holder: cardHolder,
                }
              : null,
        });
      }
      setSuccess(true);
    } catch (err) {
      console.error("Payment Error:", err);
      setError(err instanceof Error ? err.message : "Payment processing failed.");
    } finally {
      setLoading(false);
    }
  };

  const formattedAmount = Number(amount || 0).toLocaleString();

  return (
    <div
      className="payment-overlay"
      onMouseDown={(e) => e.target === e.currentTarget && !loading && handleClose()}
    >
      <div className="payment-modal">
        <button
          type="button"
          className="payment-close"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close"
        >
          ✕
        </button>

        {success ? (
          <div className="payment-success">
            <div className="success-badge">✓</div>
            <h2>Deposit Confirmed</h2>
            {unitName && <p className="unit-subtitle">{unitName}</p>}
            <p className="success-desc">
              Your deposit of <strong>KES {formattedAmount}</strong> has been received and your booking is complete.
            </p>
            <button type="button" className="action-btn-success" onClick={handleClose}>
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="payment-header">
              <h2>Secure Deposit</h2>
              <div className="amount-badge">KES {formattedAmount}</div>
              {unitName && <p className="unit-subtitle">{unitName}</p>}
            </div>

            {/* METHOD TOGGLE */}
            <div className="method-tabs">
              <button
                type="button"
                className={`tab-btn ${method === "mpesa" ? "active-mpesa" : ""}`}
                onClick={() => {
                  setMethod("mpesa");
                  setError("");
                }}
              >
                M-Pesa Express
              </button>
              <button
                type="button"
                className={`tab-btn ${method === "card" ? "active-card" : ""}`}
                onClick={() => {
                  setMethod("card");
                  setError("");
                }}
              >
                Card Payment
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {method === "mpesa" ? (
                /* M-PESA FORM */
                <div className="form-section">
                  <div className="payment-field">
                    <label htmlFor="phone">M-Pesa Phone Number</label>
                    <div className="phone-group">
                      <span className="prefix">+254</span>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="712 345 678"
                        value={formatNineDigits(phoneDigits)}
                        onChange={(e) => {
                          setPhoneDigits(e.target.value.replace(/\D/g, "").slice(0, 9));
                          setError("");
                        }}
                        disabled={loading}
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* CARD FORM */
                <div className="form-section">
                  <div className="payment-field">
                    <label>Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardHolder}
                      onChange={(e) => {
                        setCardHolder(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                    />
                  </div>

                  <div className="payment-field">
                    <label>Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 1122 3344 5566"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => {
                        setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16));
                        setError("");
                      }}
                      disabled={loading}
                    />
                  </div>

                  <div className="form-row">
                    <div className="payment-field">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={formatExpiry(cardExpiry)}
                        onChange={(e) => {
                          setCardExpiry(e.target.value);
                          setError("");
                        }}
                        disabled={loading}
                      />
                    </div>
                    <div className="payment-field">
                      <label>CVC</label>
                      <input
                        type="password"
                        placeholder="123"
                        maxLength="4"
                        value={cardCvc}
                        onChange={(e) => {
                          setCardCvc(e.target.value.replace(/\D/g, "").slice(0, 4));
                          setError("");
                        }}
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              )}

              {error && <div className="error-message">{error}</div>}

              <button
                type="submit"
                className={`submit-btn ${method === "mpesa" ? "submit-mpesa" : "submit-card"}`}
                disabled={loading}
              >
                {loading ? "Processing..." : `Pay KES ${formattedAmount}`}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}