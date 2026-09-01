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