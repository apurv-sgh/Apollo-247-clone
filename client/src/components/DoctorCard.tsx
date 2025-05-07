import { Button } from "@/components/ui/button";
import { Star, MapPin, Video, Hospital } from "lucide-react";

interface DoctorCardProps {
  doctor: {
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
  };
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  // Set default doctor images based on gender
  const getDefaultImage = () => {
    return doctor.gender === 'male' 
      ? 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg'
      : 'https://img.freepik.com/free-photo/medium-shot-smiley-doctor-with-coat_23-2148698867.jpg';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="md:flex">
          {/* Doctor Image and Rating */}
          <div className="md:w-1/4 mb-4 md:mb-0 flex flex-col items-center">
            <img 
              src={doctor.image || getDefaultImage()} 
              alt={doctor.name} 
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = getDefaultImage();
              }}
            />
            <div className="flex items-center mt-2">
              <span className="bg-green-100 text-green-800 font-medium rounded-full text-xs px-2 py-0.5 flex items-center">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                {doctor.rating.toFixed(1)}
              </span>
              <span className="text-xs text-gray-500 ml-1">({doctor.ratingCount})</span>
            </div>
          </div>
          
          {/* Doctor Info */}
          <div className="md:w-2/4 md:pl-4">
            <h2 className="text-xl font-semibold text-[#02475b]">{doctor.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{doctor.specialty}</p>
            <p className="text-sm text-gray-500 mb-2">{doctor.qualification}</p>
            <p className="text-sm text-gray-500 mb-3">{doctor.experience} years experience</p>
            
            <div className="flex flex-wrap items-center mb-3">
              {doctor.languages.map((language, index) => (
                <span key={index} className="bg-gray-100 text-[#02475b] px-2 py-1 rounded text-xs font-medium mr-2 mb-2">{language}</span>
              ))}
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-sm text-gray-600">{doctor.hospital}, {doctor.location}</span>
            </div>
          </div>
          
          {/* Appointment Info */}
          <div className="md:w-1/4 mt-4 md:mt-0 md:border-l md:pl-4">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium text-[#02475b]">Consultation Fee:</span>
              <span className="ml-2 font-semibold">₹{doctor.consultationFee}</span>
            </div>
            
            <div className="space-y-2 mb-4">
              {doctor.availability.online && (
                <div className="flex items-center">
                  <span className="bg-blue-100 text-[#02475b] text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                    <Video className="inline h-3 w-3 mr-1" />
                    Online
                  </span>
                  <span className="text-xs text-gray-500">
                    {doctor.availableDays.includes('today') ? 'Available Today' : 
                     doctor.availableDays.includes('tomorrow') ? 'Available Tomorrow' : 
                     'Available Soon'}
                  </span>
                </div>
              )}
              
              {doctor.availability.inClinic && (
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                    <Hospital className="inline h-3 w-3 mr-1" />
                    In-Clinic
                  </span>
                  <span className="text-xs text-gray-500">
                    {doctor.availableDays.includes('today') ? 'Available Today' : 
                     doctor.availableDays.includes('tomorrow') ? 'Available Tomorrow' : 
                     doctor.availableDays.includes('weekend') ? 'Available Weekend' : 
                     'Available Soon'}
                  </span>
                </div>
              )}
              
              {doctor.availability.homeVisit && (
                <div className="flex items-center">
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
                    <svg className="inline h-3 w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                    </svg>
                    Home Visit
                  </span>
                  <span className="text-xs text-gray-500">
                    Available by request
                  </span>
                </div>
              )}
            </div>
            
            <Button className="w-full bg-[#02475b] hover:bg-[#04718b] text-white py-2 font-medium transition">
              Book Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
