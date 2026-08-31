import { useEffect, useState } from "react";
import UnitCard from "../../components/UnitCard/UnitCard";
import { useAuth } from "../../context/useAuth";
import { API_BASE_URL } from "../../config/api";
import Navbar from "../../components/Navbar/Navbar";

function StudentDashboard() {
    const { user } = useAuth();

    const [promotedUnits, setPromotedUnits] = useState([]);
    const [favoriteUnits, setFavoriteUnits] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [stats, setStats] = useState({
        totalViewed: 0,
        savedProperties: 0
    });


    // Viewed Units Pagination
    const [viewedPage, setViewedPage] = useState(1);
    const viewedPerPage = 3;


    useEffect(() => {

        if (!user?.id) return;

        fetch(`${API_BASE_URL}/students/${user.id}/stats`)
            .then(response => response.json())
            .then(data => {
                setStats(data);
            })
            .catch(error => {
                console.error("Error fetching stats:", error);
            });

    }, [user?.id]);



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
                    viewedResponse,
                ] = await Promise.all([

                    fetch(`${API_BASE_URL}/units/promoted`),

                    fetch(
                        `${API_BASE_URL}/students/${user.id}/favorites`
                    ),

                    fetch(
                        `${API_BASE_URL}/students/${user.id}/viewed-units`
                    ),

                ]);



                if (
                    !promotedResponse.ok ||
                    !favoritesResponse.ok ||
                    !viewedResponse.ok
                ) {
                    throw new Error(
                        "Failed to load dashboard data."
                    );
                }



                const promotedData =
                    await promotedResponse.json();

                const favoritesData =
                    await favoritesResponse.json();

                const viewedData =
                    await viewedResponse.json();



                setPromotedUnits(
                    promotedData.items || []
                );

                setFavoriteUnits(
                    favoritesData || []
                );

                setAvailableUnits(
                    viewedData || []
                );


            } catch (err) {

                setError(err.message);

            } finally {

                setLoading(false);

            }

        };


        loadDashboardData();


    }, [user?.id]);



    // Pagination calculations

    const viewedStartIndex =
        (viewedPage - 1) * viewedPerPage;


    const paginatedViewedUnits =
        availableUnits.slice(
            viewedStartIndex,
            viewedStartIndex + viewedPerPage
        );



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
            title: "Viewed Units",
            items: paginatedViewedUnits,
        },

    ];



    return (
        <>

            <Navbar showSearch={true} />


            <div className="flex min-h-screen bg-gray-50">


                <main className="min-w-0 flex-1 p-6 lg:p-8">


                    <header className="mb-8">

                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back
                        </h1>


                        <p className="mt-1 text-sm text-gray-500">
                            Here is a summary of your housing activity.
                        </p>

                    </header>



                    {/* Dashboard Stats */}

                    <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-2">


                        <div className="rounded-xl border border-gray-200 bg-white p-6">

                            <p className="text-sm text-gray-500">
                                Total Units Viewed
                            </p>


                            <h3 className="mt-2 text-3xl font-bold text-gray-900">
                                {stats.totalViewed}
                            </h3>

                        </div>




                        <div className="rounded-xl border border-gray-200 bg-white p-6">

                            <p className="text-sm text-gray-500">
                                Saved Properties
                            </p>


                            <h3 className="mt-2 text-3xl font-bold text-gray-900">
                                {stats.savedProperties}
                            </h3>

                        </div>


                    </div>




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




                                        {section.title === "Viewed Units" ? (


                                            <div className="flex gap-2">


                                                <button

                                                    onClick={() =>
                                                        setViewedPage(
                                                            (prev) =>
                                                                Math.max(
                                                                    prev - 1,
                                                                    1
                                                                )
                                                        )
                                                    }

                                                    disabled={
                                                        viewedPage === 1
                                                    }

                                                    className="rounded-lg border border-gray-200 px-3 py-1 text-sm disabled:opacity-40"

                                                >
                                                    Previous
                                                </button>




                                                <button

                                                    onClick={() =>
                                                        setViewedPage(
                                                            (prev) =>
                                                                prev + 1
                                                        )
                                                    }


                                                    disabled={
                                                        viewedStartIndex +
                                                        viewedPerPage >=
                                                        availableUnits.length
                                                    }


                                                    className="rounded-lg border border-gray-200 px-3 py-1 text-sm disabled:opacity-40"

                                                >
                                                    Next
                                                </button>


                                            </div>



                                        ) : (


                                            <a

                                                href="#/search"

                                                className="text-sm font-medium text-purple-700 hover:text-purple-900"

                                            >
                                                View All
                                            </a>


                                        )}


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


        </>
    );
}


export default StudentDashboard;