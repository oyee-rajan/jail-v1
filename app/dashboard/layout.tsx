import Sidebar from "@/components/dashboard/sidebar";


export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        
        {children} 
      </main>
    </div>
  );
}