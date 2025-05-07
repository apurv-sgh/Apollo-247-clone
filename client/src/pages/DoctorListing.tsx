import { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import DoctorCard from "@/components/DoctorCard";
import Filters from "@/components/Filters";
import Pagination from "@/components/Pagination";
import { useDoctors } from "@/hooks/useDoctors";
import { DoctorFilter } from "@shared/schema";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const DoctorListing = () => {
  // Initialize filters
  const [filters, setFilters] = useState<DoctorFilter>({
    page: 1,
    limit: 10,
    sortBy: "relevance"
  });
  
  // Fetch doctors with the current filters
  const { data, isLoading, isError } = useDoctors(filters);
  
  // Handle filter changes
  const handleFilterChange = (newFilters: DoctorFilter) => {
    setFilters(newFilters);
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setFilters({
      ...filters,
      page
    });
    // Scroll to top when changing page
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };
  
  // Handle sort change
  const handleSortChange = (value: string) => {
    setFilters({
      ...filters,
      sortBy: value as any,
      page: 1 // Reset to first page when sorting changes
    });
  };
  
  return (
    <>
      <Helmet>
        <title>General Physician & Internal Medicine Specialists | Apollo 247 Clone</title>
        <meta name="description" content="Book an appointment with top General Physician & Internal Medicine specialists at Apollo 247. Consult with experienced doctors online or in-clinic." />
        <meta name="keywords" content="General Physician, Internal Medicine, doctor appointment, Apollo 247, medical consultation" />
        <link rel="canonical" href="https://apollo247-clone.example.com/specialties/general-physician-internal-medicine" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="General Physician & Internal Medicine Specialists | Apollo 247 Clone" />
        <meta property="og:description" content="Book an appointment with top General Physician & Internal Medicine specialists at Apollo 247 Clone." />
        <meta property="og:url" content="https://apollo247-clone.example.com/specialties/general-physician-internal-medicine" />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalSpecialty",
            "name": "General Physician & Internal Medicine",
            "description": "Specialists in diagnosing and treating a wide range of health conditions in adults.",
            "provider": {
              "@type": "Organization",
              "name": "Apollo 247 Clone",
              "url": "https://apollo247-clone.example.com"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Header />
        
        <main className="container mx-auto px-4 py-6 flex-grow">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-4">
            <ol className="flex flex-wrap items-center">
              <li className="flex items-center">
                <a href="#" className="hover:text-[#02475b] transition">Home</a>
                <span className="mx-2">/</span>
              </li>
              <li className="flex items-center">
                <a href="#" className="hover:text-[#02475b] transition">Specialties</a>
                <span className="mx-2">/</span>
              </li>
              <li>
                <span className="font-medium text-[#01475b]">General Physician & Internal Medicine</span>
              </li>
            </ol>
          </div>

          {/* Specialty Header */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl md:text-3xl font-semibold text-[#02475b] mb-4">General Physician & Internal Medicine</h1>
            <p className="text-gray-600">Consult with top General Physicians and Internal Medicine specialists for comprehensive diagnosis and treatment of various health conditions. Book online or in-clinic appointments.</p>
          </div>

          {/* Doctor Listing with Filters */}
          <div className="lg:flex gap-6">
            {/* Filter Sidebar */}
            <div className="lg:w-1/4 mb-6 lg:mb-0">
              <Filters filters={filters} onFilterChange={handleFilterChange} />
            </div>

            {/* Doctor Listings */}
            <div className="lg:w-3/4">
              {/* Sort Controls */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                    {isLoading ? (
                      <Skeleton className="w-32 h-5" />
                    ) : (
                      <>Showing <span className="font-medium">{data?.meta?.total || 0}</span> doctors</>
                    )}
                  </p>
                </div>
                <div className="flex items-center w-full sm:w-auto">
                  <label className="text-sm mr-2">Sort by:</label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={handleSortChange}
                  >
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevance">Relevance</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                      <SelectItem value="fees-low-to-high">Fees: Low to High</SelectItem>
                      <SelectItem value="fees-high-to-low">Fees: High to Low</SelectItem>
                      <SelectItem value="availability">Availability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Doctor Cards */}
              <div className="space-y-6">
                {isLoading ? (
                  // Skeleton loading state
                  Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                      <div className="md:flex">
                        <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
                          <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full" />
                          <Skeleton className="w-16 h-4 mt-2" />
                        </div>
                        <div className="md:w-2/4 md:pl-4">
                          <Skeleton className="w-3/4 h-7 mb-2" />
                          <Skeleton className="w-2/3 h-4 mb-2" />
                          <Skeleton className="w-1/2 h-4 mb-2" />
                          <Skeleton className="w-1/3 h-4 mb-4" />
                          <div className="flex flex-wrap mb-3">
                            <Skeleton className="w-16 h-6 mr-2 mb-2" />
                            <Skeleton className="w-16 h-6 mr-2 mb-2" />
                            <Skeleton className="w-16 h-6 mb-2" />
                          </div>
                          <Skeleton className="w-2/3 h-4" />
                        </div>
                        <div className="md:w-1/4 mt-4 md:mt-0 md:border-l md:pl-4">
                          <Skeleton className="w-full h-4 mb-4" />
                          <Skeleton className="w-full h-6 mb-2" />
                          <Skeleton className="w-full h-6 mb-4" />
                          <Skeleton className="w-full h-10" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : isError ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-red-500">Failed to load doctors. Please try again later.</p>
                  </div>
                ) : data?.data?.length === 0 ? (
                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <p className="text-gray-500">No doctors found matching your criteria. Try adjusting your filters.</p>
                  </div>
                ) : (
                  data?.data?.map((doctor) => (
                    <DoctorCard key={doctor._id} doctor={doctor} />
                  ))
                )}
              </div>

              {/* Pagination */}
              {!isLoading && !isError && data?.meta && (
                <Pagination 
                  currentPage={data.meta.page} 
                  totalPages={data.meta.totalPages} 
                  onPageChange={handlePageChange} 
                />
              )}
            </div>
          </div>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-[#02475b] text-white py-4 mt-8">
          <div className="container mx-auto px-4 text-center">
            <p>© 2025 Apollo 24/7 Clone. All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default DoctorListing;
