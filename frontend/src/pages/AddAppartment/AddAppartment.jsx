import AdminSideBar from "../../components/AdminSideBar/AdminSideBar";
export default function AddAppartment(){
    return(
        <div className="min-h-screen bg-[#fcf8fd] text-[#28232d]">
        <div className="flex min-h-screen">
            <AdminSideBar />
            <main className="mx-auto w-full max-w-[900px] px-4 py-8 sm:px-6 lg:px-11">
            <div className="mb-5">
                <h1 className="text-2xl font-bold tracking-tight sm:text-[27px]">
                Add a New Property
                </h1>

                <p className="mt-1.5 text-[10px] text-[#77717c]">
                List a new apartment building or add units to an existing one.
                </p>
            </div>
            </main>
        </div>
        </div>
    )
}