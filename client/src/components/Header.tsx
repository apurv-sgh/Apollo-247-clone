import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, User, Menu, Search, Calendar } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto">
        {/* Top header */}
        <div className="flex items-center justify-between py-3 px-4 md:px-6 border-b">
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <div className="text-[#02475b] font-bold text-xl">Apollo 24/7</div>
            </Link>
            <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-lg md:shadow-none z-50 md:space-x-6 p-4 md:p-0`}>
              <Link href="#" className="text-[#02475b] hover:text-[#04718b] font-medium py-2 md:py-0">Doctors</Link>
              <Link href="#" className="text-[#02475b] hover:text-[#04718b] font-medium py-2 md:py-0">Pharmacy</Link>
              <Link href="#" className="text-[#02475b] hover:text-[#04718b] font-medium py-2 md:py-0">Lab Tests</Link>
              <Link href="#" className="text-[#02475b] hover:text-[#04718b] font-medium py-2 md:py-0">Health Records</Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <Button className="bg-[#fcb716] text-white px-4 py-2 hover:bg-yellow-500 transition">
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5 text-[#02475b]" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6 text-[#02475b]" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-[#02475b]" />
            </Button>
          </div>
        </div>
        
        {/* Search bar */}
        <div className="p-4 md:p-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search for doctors, specialties, symptoms..." 
              className="w-full pl-10 pr-4 py-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#02475b]" 
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
