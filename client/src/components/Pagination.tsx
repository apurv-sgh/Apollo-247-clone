import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft,
  ChevronsRight
} from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate pagination buttons
  const generatePaginationButtons = () => {
    const buttons = [];
    
    // Always show first page
    buttons.push(
      <Button
        key="first"
        variant={currentPage === 1 ? "default" : "outline"}
        size="icon"
        className={currentPage === 1 ? "bg-[#02475b] text-white" : "text-gray-700"}
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        1
      </Button>
    );
    
    // Show dots if needed
    if (currentPage > 3) {
      buttons.push(
        <span key="dots-1" className="text-gray-400 px-2">...</span>
      );
    }
    
    // Show current page and neighbors
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i !== 1 && i !== totalPages) {
        buttons.push(
          <Button
            key={i}
            variant={currentPage === i ? "default" : "outline"}
            size="icon"
            className={currentPage === i ? "bg-[#02475b] text-white" : "text-gray-700"}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Button>
        );
      }
    }
    
    // Show dots if needed
    if (currentPage < totalPages - 2) {
      buttons.push(
        <span key="dots-2" className="text-gray-400 px-2">...</span>
      );
    }
    
    // Always show last page if there's more than one page
    if (totalPages > 1) {
      buttons.push(
        <Button
          key="last"
          variant={currentPage === totalPages ? "default" : "outline"}
          size="icon"
          className={currentPage === totalPages ? "bg-[#02475b] text-white" : "text-gray-700"}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          {totalPages}
        </Button>
      );
    }
    
    return buttons;
  };
  
  if (totalPages <= 1) {
    return null; // Don't show pagination if there's only one page
  }
  
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="text-gray-700"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-gray-700"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        {generatePaginationButtons()}
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-gray-700"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="text-gray-700"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </nav>
    </div>
  );
};

export default Pagination;
