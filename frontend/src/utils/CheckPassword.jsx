import React from "react";
import { Check, X } from "lucide-react";

export const isPasswordStrong = (password) => {
  if (!password) return false;
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return hasMinLength && hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar;
};

const CheckPassword = ({ password = "" }) => {
  const criteria = [
    {
      label: "At least 8 characters",
      met: password.length >= 8,
    },
    {
      label: "Uppercase letter (A-Z)",
      met: /[A-Z]/.test(password),
    },
    {
      label: "Lowercase letter (a-z)",
      met: /[a-z]/.test(password),
    },
    {
      label: "Number (0-9)",
      met: /[0-9]/.test(password),
    },
    {
      label: "Special character (!@#$%^&*)",
      met: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  const metCount = criteria.filter((c) => c.met).length;

  let strengthLabel = "Weak";
  let strengthColor = "bg-red-500";
  let textColor = "text-red-500";

  if (metCount === 5) {
    strengthLabel = "Strong";
    strengthColor = "bg-green-500";
    textColor = "text-green-600";
  } else if (metCount >= 3) {
    strengthLabel = "Medium";
    strengthColor = "bg-amber-500";
    textColor = "text-amber-600";
  } else if (password.length > 0) {
    strengthLabel = "Weak";
    strengthColor = "bg-red-500";
    textColor = "text-red-500";
  }

  if (!password) {
    return null;
  }

  return (
    <div className="mt-2.5 rounded-xl border border-outline-variant bg-surface-container-low p-3 text-xs">
      <div className="flex items-center justify-between mb-1.5">
        <span className="font-medium text-on-surface-variant">Password Security:</span>
        <span className={`font-semibold ${textColor}`}>{strengthLabel}</span>
      </div>

      {/* Strength Bar */}
      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden mb-2.5 flex">
        <div
          className={`h-full transition-all duration-300 ${strengthColor}`}
          style={{ width: `${(metCount / criteria.length) * 100}%` }}
        />
      </div>

      {/* Criteria checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
        {criteria.map((item, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {item.met ? (
              <Check className="h-3.5 w-3.5 text-green-600 flex-shrink-0" />
            ) : (
              <X className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
            )}
            <span className={item.met ? "text-green-700 font-medium" : "text-gray-500"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckPassword;
