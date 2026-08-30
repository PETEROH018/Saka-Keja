import StudentSidebar from "../../components/StudentSidebar/StudentSidebar";
import StudentPropertyCard from "../../components/StudentPropertyCard/StudentPropertyCard";

const sections = [
    {
        title: "Promoted Units",
        description: "Featured units selected for you.",
    },
    {
        title: "Favorite Units",
        description: "Properties you have saved.",
    },
    {
        title: "Booked Unit",
        description: "Your currently booked accommodation.",
    },
    {
        title: "View Units",
        description: "Browse available units.",
    },
];

function StudentDashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <StudentSidebar />

            <main className="flex-1 p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-900">
                        Welcome back
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Here is a summary of your housing activity.
                    </p>
                </header>

                <div className="space-y-8">
                    {sections.map((section) => (
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

                            <StudentPropertyCard
                                title={section.title}
                                description={section.description}
                            />
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}

export default StudentDashboard;