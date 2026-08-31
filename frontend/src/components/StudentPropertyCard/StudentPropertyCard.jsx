function StudentPropertyCard({ title, description }) {
  return (
    <div
      data-testid="student-property-card"
      className="rounded-xl border border-gray-200 bg-white p-5"
    >
      <p className="text-base font-semibold text-gray-900">
        {title}
      </p>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default StudentPropertyCard;