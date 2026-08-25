export default function validatePhoneNumber(number, code) {
  if (!number) return { isValid: false, message: "" };

  const cleanNumber = number.replace(/\D/g, "");

  if (code === "+254") {
    if (/^0[179]\d{8}$/.test(cleanNumber) || /^[179]\d{8}$/.test(cleanNumber)) {
      return { isValid: true, message: "Valid Kenyan phone number" };
    } else {
      return { isValid: false, message: "Enter a valid 9 or 10 digit Kenyan phone number (e.g. 0712345678)" };
    }
  }

  if (/^\d{7,12}$/.test(cleanNumber)) {
    return { isValid: true, message: "Valid phone number" };
  } else if (cleanNumber.length < 7) {
    return { isValid: false, message: "Phone number is too short" };
  } else {
    return { isValid: false, message: "Phone number is too long" };
  }
}