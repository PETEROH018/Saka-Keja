import { useEffect, useState } from "react";
import StudentSidebar from "../../components/StudentSidebar/StudentSidebar";
import UnitCard from "../../components/UnitCard/UnitCard";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL } from "../../config/api";

function StudentDashboard() {
    const { user } = useAuth();

    const [promotedUnits, setPromotedUnits] = useState([]);
    const [favoriteUnits, setFavoriteUnits] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user?.id) {
            setLoading(false);
            return;
        }

        const loadDashboardData = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    promotedResponse,
                    favoritesResponse,
                    unitsResponse,
                ] = await Promise.all([
                    fetch(`${API_BASE_URL}/units/promoted`),
                    fetch(`${API_BASE_URL}/students/${user.id}/favorites`),
                    fetch(`${API_BASE_URL}/units`),
                ]);

                if (
                    !promotedResponse.ok ||
                    !favoritesResponse.ok ||
                    !unitsResponse.ok
                ) {
                    throw new Error("Failed to load dashboard data.");
                }

                const promotedData = await promotedResponse.json();
                const favoritesData = await favoritesResponse.json();
                const unitsData = await unitsResponse.json();

                setPromotedUnits(promotedData.items || []);
                setFavoriteUnits(favoritesData || []);
                setAvailableUnits(unitsData || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();
    }, [user?.id]);

    const dashboardSections = [
        {
            title: "Promoted Units",
            items: promotedUnits,
        },
        {
            title: "Favorite Units",
            items: favoriteUnits,
        },
        {
            title: "View Units",
            items: availableUnits,
        },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            <StudentSidebar />

            <main className="min-w-0 flex-1 p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Here is a summary of your housing activity.
                    </p>
                </header>

                {loading && (
                    <p className="text-sm text-gray-500">
                        Loading your dashboard...
                    </p>
                )}

                {error && (
                    <p className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <div className="space-y-8">
                        {dashboardSections.map((section) => (
                            <section key={section.title}>
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        {section.title}
                                    </h2>

                                    <a
                                        href="#/search"
                                        className="text-sm font-medium text-purple-700 hover:text-purple-900"
                                    >
                                        View All
                                    </a>
                                </div>

                                {section.items.length === 0 ? (
                                    <div className="rounded-xl border border-gray-200 bg-white p-6">
                                        <p className="text-sm text-gray-500">
                                            No units available in this section.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                                        {section.items.map((unit) => (
                                            <UnitCard
                                                key={unit.id}
                                                {...unit}
                                            />
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default StudentDashboard;