import { useState, useEffect } from "react";
import { Search, MapPin, Briefcase } from "lucide-react";

const SearchComponent = ({ navigate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [isFocused, setIsFocused] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const handleSearch = () => {
    if (searchQuery.trim() || locationQuery.trim()) {
      navigate("/browse", {
        state: {
          jobTitle: searchQuery,
          location: locationQuery,
        },
      });
    }
  };

  // Popular searches that will rotate
const popularSearches = [
    [
        "Software Engineer",
        "UX Designer",
        "Product Manager",
        "Data Scientist",
        "Frontend Developer",
        "Backend Developer",
        "DevOps Engineer",
        "QA Tester",
        "Mobile App Developer",
        "AI/ML Engineer",
    ],
    [
        "Noida",
        "Remote",
        "Delhi NCR",
        "Banglore",
        "Hyderabad",
        "Mumbai",
        "Pune",
        "Chennai",
        "Kolkata",
        "Gurgaon",
    ],
];

  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionIndex(
        (prev) => (prev + 1) % popularSearches[0].length
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div
        className={`
          relative flex flex-col sm:flex-row rounded-2xl 
          bg-white/80 backdrop-blur-md shadow-xl 
          p-2 sm:p-3 transition-all duration-300
          ${isHovering ? "shadow-2xl shadow-indigo-100 scale-[1.01]" : ""}
          border border-gray-100
        `}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-100 rounded-full opacity-50 blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-purple-100 rounded-full opacity-50 blur-2xl"></div>

        {/* Job Title Search */}
        <div
          className={`
          relative flex-1 transition-all duration-300
          ${isFocused === "job" ? "sm:flex-[1.2]" : ""}
        `}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
            <Briefcase
              className={`
              h-5 w-5 transition-all duration-300
              ${
                isFocused === "job"
                  ? "text-indigo-600 scale-110"
                  : "text-indigo-400"
              }
            `}
            />
          </div>
          <input
            type="text"
            className={`
              w-full py-4 pl-12 pr-4 rounded-xl sm:rounded-l-xl sm:rounded-r-none
              text-gray-700 bg-transparent
              border-0 focus:ring-0 focus:outline-none
              transition-all duration-300
              ${isFocused === "job" ? "bg-indigo-50/50" : ""}
            `}
            placeholder={`Try "${popularSearches[0][currentSuggestionIndex]}"...`}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused("job")}
            onBlur={() => setIsFocused(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            value={searchQuery}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Divider line (visible only on desktop) */}
          <div className="hidden sm:block absolute right-0 top-1/4 h-1/2 w-px bg-gray-200"></div>
        </div>

        {/* Location Search */}
        <div
          className={`
          relative flex-1 transition-all duration-300 mt-2 sm:mt-0
          ${isFocused === "location" ? "sm:flex-[1.2]" : ""}
        `}
        >
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-500">
            <MapPin
              className={`
              h-5 w-5 transition-all duration-300
              ${
                isFocused === "location"
                  ? "text-indigo-600 scale-110"
                  : "text-indigo-400"
              }
            `}
            />
          </div>
          <input
            type="text"
            className={`
              w-full py-4 pl-12 pr-16 rounded-xl sm:rounded-r-xl sm:rounded-l-none
              text-gray-700 bg-transparent
              border-0 focus:ring-0 focus:outline-none
              transition-all duration-300
              ${isFocused === "location" ? "bg-indigo-50/50" : ""}
            `}
            placeholder={`Try "${popularSearches[1][currentSuggestionIndex]}"...`}
            onChange={(e) => setLocationQuery(e.target.value)}
            onFocus={() => setIsFocused("location")}
            onBlur={() => setIsFocused(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
            value={locationQuery}
            autoComplete="off"
            spellCheck="false"
          />

          {/* Search Button */}
          <button
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2
              bg-gradient-to-r from-indigo-600 to-purple-600
              text-white p-3 rounded-lg
              hover:from-indigo-700 hover:to-purple-700
              active:scale-95 transition-all duration-300
              shadow-md hover:shadow-lg
              flex items-center justify-center
              group
            `}
            onClick={handleSearch}
            aria-label="Search jobs"
          >
            <Search className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
