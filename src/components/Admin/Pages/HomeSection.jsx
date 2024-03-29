import AdminBannerTable from "./BannerTable";
import AdminContentSection from "./ContentSection";

const AdminHomeSection = () => {
    return (
        <div>
            <div className="mt-4 text-2xl font-[Kanit] text-orange-300">Banner</div>
            <AdminBannerTable/>

            <div className="mt-5 text-2xl font-[Kanit] text-orange-300">Content Section</div>
            <AdminContentSection />
        </div>
    )
}

export default AdminHomeSection