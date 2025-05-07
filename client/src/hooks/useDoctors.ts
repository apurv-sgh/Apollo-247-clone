import { useQuery } from "@tanstack/react-query";
import { DoctorFilter } from "@shared/schema";

interface DoctorData {
  data: Doctor[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

interface Doctor {
  _id: string;
  name: string;
  specialty: string;
  qualification: string;
  experience: number;
  languages: string[];
  hospital: string;
  location: string;
  consultationFee: number;
  rating: number;
  ratingCount: number;
  gender: string;
  image: string;
  availability: {
    online: boolean;
    inClinic: boolean;
    homeVisit: boolean;
  };
  availableDays: string[];
  isActive: boolean;
}

export const useDoctors = (filters: DoctorFilter) => {
  // Build the query string from filters
  const buildQueryString = () => {
    const params = new URLSearchParams();
    
    if (filters.consultationType && filters.consultationType.length > 0) {
      filters.consultationType.forEach(type => {
        params.append('consultationType', type);
      });
    }
    
    if (filters.availability && filters.availability.length > 0) {
      filters.availability.forEach(day => {
        params.append('availability', day);
      });
    }
    
    if (filters.gender && filters.gender.length > 0) {
      filters.gender.forEach(gender => {
        params.append('gender', gender);
      });
    }
    
    if (filters.experience && filters.experience.length > 0) {
      filters.experience.forEach(exp => {
        params.append('experience', exp);
      });
    }
    
    if (filters.feesRange && filters.feesRange.length > 0) {
      filters.feesRange.forEach(range => {
        params.append('feesRange', range);
      });
    }
    
    if (filters.hospital && filters.hospital.length > 0) {
      filters.hospital.forEach(hospital => {
        params.append('hospital', hospital);
      });
    }
    
    params.append('page', filters.page.toString());
    params.append('limit', filters.limit.toString());
    params.append('sortBy', filters.sortBy);
    
    return params.toString();
  };
  
  const queryString = buildQueryString();
  
  const queryKey = [`/api/doctors?${queryString}`];
  
  return useQuery<DoctorData>({
    queryKey,
    keepPreviousData: true,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
