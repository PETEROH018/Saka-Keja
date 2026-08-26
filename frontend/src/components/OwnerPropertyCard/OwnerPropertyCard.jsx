import { useNavigate } from "react-router-dom";
import { Pencil, House } from "lucide-react";

export default function OwnerPropertyCard({ property }) {
    const navigate = useNavigate();
    const rent = property["monthly-expense-breakdown"]?.rent;
    const image = property.image_Urls?.[0];

    const status = property.status ?? "available";
    const views = property.totalViews ?? 0;
    const inquiries = property.activeInquiries ?? 0;
    const lastUpdated = property.lastUpdated ?? "—";

    const statusStyles = {
        available: "bg-green-50 text-green-700",
        occupied: "bg-violet-50 text-violet-700",
        pending: "bg-amber-50 text-amber-700",
    };

    return (
        <article className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:gap-5">
            <div className="h-48 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-auto sm:w-48 sm:self-stretch">
                {image ? (
                    <img
                        src={image}
                        alt={property.name}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                        No image
                    </div>
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            {property.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            {property.location}
                        </p>
                    </div>

                    <span
                        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusStyles[status] ?? "bg-gray-100 text-gray-600"
                            }`}
                    >
                        {status}
                    </span>
                </div>

                <div className="mt-4 grid items-stretch gap-3 sm:grid-cols-3">
                    <div className="flex min-h-20 flex-col justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Monthly Rent</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                            Ksh {rent?.toLocaleString() ?? "—"}
                        </p>
                    </div>

                    <div className="flex min-h-20 flex-col justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Property Type</p>
                        <p className="mt-1 text-sm font-semibold capitalize text-gray-900">
                            {property.property_type}
                        </p>
                    </div>

                    <div className="flex min-h-20 flex-col justify-between rounded-lg border border-gray-100 bg-gray-50 p-3">
                        <p className="text-xs text-gray-500">Rooms</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                            {property.bedrooms} Bed · {property.bathrooms} Bath
                        </p>
                    </div>
                </div>

                {status === "occupied" && (
                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 rounded-lg bg-violet-50 px-3 py-2 text-xs">
                        <span className="text-gray-600">
                            Tenant:{" "}
                            <strong className="font-semibold text-gray-900">
                                {property.tenant ?? "—"}
                            </strong>
                        </span>

                        <span className="text-gray-600">
                            Lease ends:{" "}
                            <strong className="font-semibold text-gray-900">
                                {property.leaseEnd ?? "—"}
                            </strong>
                        </span>
                    </div>
                )}

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500">
                    <span>
                        <strong className="font-semibold text-gray-700">
                            {views}
                        </strong>{" "}
                        views
                    </span>

                    <span>
                        <strong className="font-semibold text-gray-700">
                            {inquiries}
                        </strong>{" "}
                        active inquiries
                    </span>

                    <span>
                        Updated{" "}
                        <strong className="font-semibold text-gray-700">
                            {lastUpdated}
                        </strong>
                    </span>
                </div>
            </div>

            <div className="flex shrink-0 gap-2 border-t border-gray-100 pt-3 sm:flex-col sm:border-l sm:border-t-0 sm:pl-4 sm:pt-0">
                <button
                    type="button"
                    onClick={() => navigate(`/edit-property/${property.id}`)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 sm:flex-none sm:justify-start"
                >
                    <Pencil size={16} aria-hidden="true" />
                    <span>Edit</span>
                </button>
                <button
                    onClick={()=>navigate(`available-units/${property.id}`)}
                    type="button"
                    className="flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 sm:flex-none sm:justify-start"
                >
                    <House size={16} aria-hidden="true" />
                    <span>View Units</span>
                </button>
            </div>
        </article>
    );
}