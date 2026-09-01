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