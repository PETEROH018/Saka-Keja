import { useEffect, useState } from "react";

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 3) return digits;
  if (digits.length <= 6) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

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
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Lock page scrolling and listen for Escape while the popup is open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape" && !loading) {
        setPhone("");
        setError("");
        setLoading(false);
        setSuccess(false);
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, loading, onClose]);

  if (!isOpen) {
    return null;
  }

  const resetForm = () => {
    setPhone("");
    setError("");
    setLoading(false);
    setSuccess(false);
  };

  const handleClose = () => {
    if (loading) return;

    resetForm();
    onClose();
  };

  const handlePhoneChange = (event) => {
    const digits = event.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setPhone(digits);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone) {
      setError("Enter your M-Pesa phone number.");
      return;
    }

    if (!isValidKenyanPhone(cleanPhone)) {
      setError("Enter a valid Kenyan number starting with 07 or 01.");
      return;
    }

    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0) {
      setError("Invalid payment amount.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const formattedPhone = `254${cleanPhone.slice(1)}`;

      if (onPaymentRequest) {
        await onPaymentRequest({
          amount: Number(amount),
          phone: formattedPhone,
        });
      } else {
        // Temporary demo behavior.
        await new Promise((resolve) => setTimeout(resolve, 1200));
      }

      setSuccess(true);
    } catch (err) {
      console.error("Payment request error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to send payment request. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (event) => {
    if (
      event.target === event.currentTarget &&
      !loading
    ) {
      handleClose();
    }
  };

  const formattedAmount = Number(amount || 0).toLocaleString();

  return (
    <div
      className="payment-overlay"
      onMouseDown={handleBackdropClick}
    >
      <div
        className="payment-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-title"
      >
        <button
          type="button"
          className="payment-close"
          onClick={handleClose}
          disabled={loading}
          aria-label="Close payment popup"
        >
          ×
        </button>

        {success ? (
          <div className="payment-success">
            <div className="success-icon" aria-hidden="true">
              ✓
            </div>

            <h2>Payment Request Sent</h2>

            {unitName && (
              <p className="mb-2 font-semibold text-gray-700">
                {unitName}
              </p>
            )}

            <p>
              Check your phone for the M-Pesa STK Push and enter
              your M-Pesa PIN to complete the payment.
            </p>

            <button
              type="button"
              className="payment-button"
              onClick={handleClose}
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="payment-header">
              <h2 id="payment-title">Secure Your Booking</h2>

              {unitName && (
                <p className="font-semibold text-gray-700">
                  {unitName}
                </p>
              )}

              <p>
                Pay your required deposit of KES {formattedAmount}
                {" "}via M-Pesa to reserve this unit.
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="payment-field">
                <label htmlFor="amount">Amount to Pay (KES)</label>

                <input
                  id="amount"
                  type="text"
                  value={formattedAmount}
                  readOnly
                />
              </div>

              <div className="payment-field">
                <label htmlFor="phone">M-Pesa Phone Number</label>

                <div
                  className={`phone-wrapper ${
                    error ? "phone-error" : ""
                  }`}
                >
                  <span className="mpesa-icon" aria-hidden="true">
                    M
                  </span>

                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="0712 345 678"
                    value={formatPhone(phone)}
                    onChange={handlePhoneChange}
                    disabled={loading}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "payment-error" : undefined}
                  />
                </div>

                {error && (
                  <p id="payment-error" className="payment-error">
                    {error}
                  </p>
                )}
              </div>

              <div className="stk-notice">
                <span className="info-icon" aria-hidden="true">
                  i
                </span>

                <p>
                  An M-Pesa STK Push will be sent to this number.
                  Enter your M-Pesa PIN on your phone to complete
                  the payment.
                </p>
              </div>

              <button
                type="submit"
                className="payment-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Sending Request...
                  </>
                ) : (
                  "Send Payment Request"
                )}
              </button>

              <button
                type="button"
                className="payment-cancel"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}