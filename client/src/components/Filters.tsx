import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DoctorFilter } from "@shared/schema";
import { X } from "lucide-react";

interface FiltersProps {
  filters: DoctorFilter;
  onFilterChange: (filters: DoctorFilter) => void;
}

const Filters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleConsultationTypeChange = (type: string, checked: boolean) => {
    const currentTypes = filters.consultationType || [];
    let newTypes;
    
    if (checked) {
      newTypes = [...currentTypes, type];
    } else {
      newTypes = currentTypes.filter(t => t !== type);
    }
    
    onFilterChange({
      ...filters,
      consultationType: newTypes.length > 0 ? newTypes : undefined
    });
  };
  
  const handleAvailabilityChange = (day: string, checked: boolean) => {
    const currentDays = filters.availability || [];
    let newDays;
    
    if (checked) {
      newDays = [...currentDays, day];
    } else {
      newDays = currentDays.filter(d => d !== day);
    }
    
    onFilterChange({
      ...filters,
      availability: newDays.length > 0 ? newDays : undefined
    });
  };
  
  const handleGenderChange = (gender: string, checked: boolean) => {
    const currentGenders = filters.gender || [];
    let newGenders;
    
    if (checked) {
      newGenders = [...currentGenders, gender];
    } else {
      newGenders = currentGenders.filter(g => g !== gender);
    }
    
    onFilterChange({
      ...filters,
      gender: newGenders.length > 0 ? newGenders : undefined
    });
  };
  
  const handleExperienceChange = (exp: string, checked: boolean) => {
    const currentExps = filters.experience || [];
    let newExps;
    
    if (checked) {
      newExps = [...currentExps, exp];
    } else {
      newExps = currentExps.filter(e => e !== exp);
    }
    
    onFilterChange({
      ...filters,
      experience: newExps.length > 0 ? newExps : undefined
    });
  };
  
  const handleFeesRangeChange = (range: string, checked: boolean) => {
    const currentRanges = filters.feesRange || [];
    let newRanges;
    
    if (checked) {
      newRanges = [...currentRanges, range];
    } else {
      newRanges = currentRanges.filter(r => r !== range);
    }
    
    onFilterChange({
      ...filters,
      feesRange: newRanges.length > 0 ? newRanges : undefined
    });
  };
  
  const handleHospitalChange = (hospital: string, checked: boolean) => {
    const currentHospitals = filters.hospital || [];
    let newHospitals;
    
    if (checked) {
      newHospitals = [...currentHospitals, hospital];
    } else {
      newHospitals = currentHospitals.filter(h => h !== hospital);
    }
    
    onFilterChange({
      ...filters,
      hospital: newHospitals.length > 0 ? newHospitals : undefined
    });
  };
  
  const clearAllFilters = () => {
    onFilterChange({
      page: 1,
      limit: filters.limit,
      sortBy: filters.sortBy
    });
  };
  
  // For mobile responsive design
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  return (
    <>
      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button 
          onClick={() => setFiltersOpen(!filtersOpen)} 
          variant="outline" 
          className="w-full"
        >
          {filtersOpen ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      <aside className={`${filtersOpen ? 'block' : 'hidden'} lg:block lg:w-full mb-6 lg:mb-0 bg-white rounded-lg shadow-sm p-4`} id="filters-section">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearAllFilters} 
            className="text-[#04718b] hover:text-[#02475b] text-sm font-medium"
          >
            Clear All
          </Button>
        </div>

        {/* Filter Sections */}
        <div className="space-y-6">
          {/* Consultation Type */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Consultation Type</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="consultation-online" 
                  checked={filters.consultationType?.includes('online')} 
                  onCheckedChange={(checked) => handleConsultationTypeChange('online', checked as boolean)}
                />
                <Label htmlFor="consultation-online">Online</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="consultation-in-clinic" 
                  checked={filters.consultationType?.includes('in-clinic')} 
                  onCheckedChange={(checked) => handleConsultationTypeChange('in-clinic', checked as boolean)}
                />
                <Label htmlFor="consultation-in-clinic">In-Clinic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="consultation-home-visit" 
                  checked={filters.consultationType?.includes('home-visit')} 
                  onCheckedChange={(checked) => handleConsultationTypeChange('home-visit', checked as boolean)}
                />
                <Label htmlFor="consultation-home-visit">Home Visit</Label>
              </div>
            </div>
          </div>

          {/* Availability */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Availability</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="availability-today" 
                  checked={filters.availability?.includes('today')} 
                  onCheckedChange={(checked) => handleAvailabilityChange('today', checked as boolean)}
                />
                <Label htmlFor="availability-today">Today</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="availability-tomorrow" 
                  checked={filters.availability?.includes('tomorrow')} 
                  onCheckedChange={(checked) => handleAvailabilityChange('tomorrow', checked as boolean)}
                />
                <Label htmlFor="availability-tomorrow">Tomorrow</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="availability-weekend" 
                  checked={filters.availability?.includes('weekend')} 
                  onCheckedChange={(checked) => handleAvailabilityChange('weekend', checked as boolean)}
                />
                <Label htmlFor="availability-weekend">Weekend</Label>
              </div>
            </div>
          </div>

          {/* Gender */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Gender</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gender-male" 
                  checked={filters.gender?.includes('male')} 
                  onCheckedChange={(checked) => handleGenderChange('male', checked as boolean)}
                />
                <Label htmlFor="gender-male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="gender-female" 
                  checked={filters.gender?.includes('female')} 
                  onCheckedChange={(checked) => handleGenderChange('female', checked as boolean)}
                />
                <Label htmlFor="gender-female">Female</Label>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Experience</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-0-5" 
                  checked={filters.experience?.includes('0-5')} 
                  onCheckedChange={(checked) => handleExperienceChange('0-5', checked as boolean)}
                />
                <Label htmlFor="exp-0-5">0-5 years</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-5-10" 
                  checked={filters.experience?.includes('5-10')} 
                  onCheckedChange={(checked) => handleExperienceChange('5-10', checked as boolean)}
                />
                <Label htmlFor="exp-5-10">5-10 years</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="exp-10+" 
                  checked={filters.experience?.includes('10+')} 
                  onCheckedChange={(checked) => handleExperienceChange('10+', checked as boolean)}
                />
                <Label htmlFor="exp-10+">10+ years</Label>
              </div>
            </div>
          </div>

          {/* Fees Range */}
          <div className="border-b pb-4">
            <h3 className="font-medium mb-3">Fees Range</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fees-0-500" 
                  checked={filters.feesRange?.includes('0-500')} 
                  onCheckedChange={(checked) => handleFeesRangeChange('0-500', checked as boolean)}
                />
                <Label htmlFor="fees-0-500">₹0 - ₹500</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fees-500-1000" 
                  checked={filters.feesRange?.includes('500-1000')} 
                  onCheckedChange={(checked) => handleFeesRangeChange('500-1000', checked as boolean)}
                />
                <Label htmlFor="fees-500-1000">₹500 - ₹1000</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="fees-1000+" 
                  checked={filters.feesRange?.includes('1000+')} 
                  onCheckedChange={(checked) => handleFeesRangeChange('1000+', checked as boolean)}
                />
                <Label htmlFor="fees-1000+">₹1000+</Label>
              </div>
            </div>
          </div>

          {/* Hospital/Clinic */}
          <div>
            <h3 className="font-medium mb-3">Hospital/Clinic</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hospital-apollo-hospitals" 
                  checked={filters.hospital?.includes('Apollo Hospitals')} 
                  onCheckedChange={(checked) => handleHospitalChange('Apollo Hospitals', checked as boolean)}
                />
                <Label htmlFor="hospital-apollo-hospitals">Apollo Hospitals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hospital-apollo-clinic" 
                  checked={filters.hospital?.includes('Apollo Clinic')} 
                  onCheckedChange={(checked) => handleHospitalChange('Apollo Clinic', checked as boolean)}
                />
                <Label htmlFor="hospital-apollo-clinic">Apollo Clinic</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hospital-apollo-spectra" 
                  checked={filters.hospital?.includes('Apollo Spectra')} 
                  onCheckedChange={(checked) => handleHospitalChange('Apollo Spectra', checked as boolean)}
                />
                <Label htmlFor="hospital-apollo-spectra">Apollo Spectra</Label>
              </div>
            </div>
          </div>
        </div>
        
        {/* Mobile close button */}
        <div className="mt-4 lg:hidden">
          <Button 
            onClick={() => setFiltersOpen(false)} 
            variant="outline" 
            className="w-full"
          >
            Close Filters
            <X className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Filters;
