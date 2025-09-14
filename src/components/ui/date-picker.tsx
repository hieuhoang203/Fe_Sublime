"use client";

import * as React from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DatePickerProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "value" | "onChange"> {
  label?: string;
  error?: string;
  required?: boolean;
  value?: string;
  onChange?: (value: string) => void;
}

const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps>(
  ({ className, label, error, required, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
      value ? new Date(value) : null
    );
    const [currentMonth, setCurrentMonth] = React.useState(
      selectedDate || new Date()
    );
    const [calendarPosition, setCalendarPosition] = React.useState<'left' | 'right'>('right');

    const inputRef = React.useRef<HTMLInputElement>(null);
    const calendarRef = React.useRef<HTMLDivElement>(null);

    // Format date for display (mm/dd/yyyy)
    const formatDate = (date: Date) => {
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}/${day}/${year}`;
    };

    // Parse input value to date
    const parseInputValue = (inputValue: string): Date | null => {
      if (!inputValue) return null;
      
      // Try to parse mm/dd/yyyy format
      const parts = inputValue.split('/');
      if (parts.length === 3) {
        const month = parseInt(parts[0], 10) - 1; // Month is 0-indexed
        const day = parseInt(parts[1], 10);
        const year = parseInt(parts[2], 10);
        
        if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
          const date = new Date(year, month, day);
          if (date.getMonth() === month && date.getDate() === day && date.getFullYear() === year) {
            return date;
          }
        }
      }
      
      // Try to parse as ISO date
      const isoDate = new Date(inputValue);
      if (!isNaN(isoDate.getTime())) {
        return isoDate;
      }
      
      return null;
    };

    // Handle date selection
    const handleDateSelect = (date: Date) => {
      setSelectedDate(date);
      onChange?.(date.toISOString().split("T")[0]);
      setIsOpen(false);
    };

    // Calculate calendar position
    const calculatePosition = () => {
      if (!inputRef.current) return;
      
      const inputRect = inputRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const calendarWidth = 320;
      const padding = 16;
      
      // Check if calendar would overflow on the right
      const wouldOverflowRight = inputRect.right + calendarWidth > viewportWidth - padding;
      // Check if calendar would overflow on the left
      const wouldOverflowLeft = inputRect.left - calendarWidth < padding;
      
      if (wouldOverflowRight && !wouldOverflowLeft) {
        setCalendarPosition('left');
      } else {
        setCalendarPosition('right');
      }
    };

    // Handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const parsedDate = parseInputValue(inputValue);
      
      if (parsedDate) {
        setSelectedDate(parsedDate);
        setCurrentMonth(parsedDate);
        onChange?.(parsedDate.toISOString().split("T")[0]);
      } else {
        setSelectedDate(null);
        onChange?.(inputValue); // Keep the raw input for partial typing
      }
    };

    // Generate calendar days
    const generateCalendarDays = () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth();
      
      const firstDay = new Date(year, month, 1);
      const lastDay = new Date(year, month + 1, 0);
      const startDate = new Date(firstDay);
      startDate.setDate(startDate.getDate() - firstDay.getDay());
      
      const days = [];
      const today = new Date();
      
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        
        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.toDateString() === today.toDateString();
        const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
        
        days.push({
          date,
          isCurrentMonth,
          isToday,
          isSelected,
        });
      }
      
      return days;
    };

    // Navigation
    const goToPreviousMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const goToNextMonth = () => {
      setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    // Close calendar when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          calendarRef.current &&
          !calendarRef.current.contains(event.target as Node) &&
          inputRef.current &&
          !inputRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (!isOpen) return;

        switch (event.key) {
          case "Escape":
            setIsOpen(false);
            inputRef.current?.focus();
            break;
          case "ArrowLeft":
            event.preventDefault();
            goToPreviousMonth();
            break;
          case "ArrowRight":
            event.preventDefault();
            goToNextMonth();
            break;
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentMonth]);

    // Update selected date when value prop changes
    React.useEffect(() => {
      if (value && value.trim() !== "") {
        const parsedDate = parseInputValue(value);
        if (parsedDate) {
          setSelectedDate(parsedDate);
          setCurrentMonth(parsedDate);
        } else {
          setSelectedDate(null);
        }
      } else {
        setSelectedDate(null);
      }
    }, [value]);

    const days = generateCalendarDays();
    const monthNames = [
      "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
      "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
    ];

    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-white flex items-center gap-1">
            {label}
            {required && <span className="text-red-500">*</span>}
          </label>
        )}
        
        <div className="relative">
          {/* Main input field */}
          <input
            ref={ref}
            type="text"
            value={selectedDate ? formatDate(selectedDate) : (value && value.trim() !== "" ? value : "")}
            onChange={handleInputChange}
            onFocus={() => {
              calculatePosition();
              setIsOpen(true);
            }}
            onBlur={(e) => {
              // Don't close if clicking on calendar
              if (calendarRef.current && calendarRef.current.contains(e.relatedTarget as Node)) {
                return;
              }
              // Close after a short delay to allow calendar clicks
              setTimeout(() => setIsOpen(false), 150);
            }}
            placeholder="mm/dd/yyyy"
            className={cn(
              "w-full h-10 px-4 bg-black border-0 hover:border-spotify-green/50 focus:border-spotify-green text-white placeholder:text-spotify-text-gray rounded-lg transition-all duration-300 focus:ring-2 focus:ring-spotify-green focus:outline-none",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
              className
            )}
            {...props}
          />

          {/* Calendar toggle button */}
          <button
            ref={inputRef}
            type="button"
            onClick={() => {
              calculatePosition();
              setIsOpen(!isOpen);
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Mở calendar"
          >
            <Calendar className="h-4 w-4 text-white/60" />
          </button>

          {/* Calendar Dropdown */}
          {isOpen && (
            <div
              ref={calendarRef}
              role="dialog"
              aria-label="Chọn ngày"
              className={cn(
                "absolute top-full mt-2 bg-gray-900 border-2 border-white/20 rounded-xl shadow-2xl z-50 p-4 w-[320px]",
                "max-h-[400px] overflow-y-auto"
              )}
              style={{
                // Smart positioning to avoid cutoff
                left: '0',
                right: 'auto',
                maxWidth: 'calc(100vw - 2rem)',
                transform: 'translateX(0)',
              }}
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={goToPreviousMonth}
                  aria-label="Tháng trước"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronLeft className="h-4 w-4 text-white" />
                </button>
                
                <h3 className="text-white font-semibold text-sm">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h3>
                
                <button
                  onClick={goToNextMonth}
                  aria-label="Tháng sau"
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <ChevronRight className="h-4 w-4 text-white" />
                </button>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
                  <div key={day} className="text-center text-xs text-white/60 py-2 font-medium">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(day.date)}
                    aria-label={`Chọn ngày ${day.date.getDate()}, ${monthNames[day.date.getMonth()]} ${day.date.getFullYear()}`}
                    className={cn(
                      "h-8 w-8 text-xs rounded-lg transition-all duration-200 flex items-center justify-center font-medium",
                      day.isCurrentMonth ? "text-white" : "text-white/40",
                      day.isToday && "bg-spotify-green text-black font-bold",
                      day.isSelected && !day.isToday && "bg-spotify-green text-black font-bold",
                      !day.isSelected && !day.isToday && "hover:bg-white/10"
                    )}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>

              {/* Today Button */}
              <div className="mt-4 pt-3 border-t border-white/20">
                <button
                  onClick={() => handleDateSelect(new Date())}
                  aria-label="Chọn ngày hôm nay"
                  className="w-full text-center text-sm text-spotify-green hover:text-white transition-colors py-2 font-medium"
                >
                  Hôm nay
                </button>
              </div>
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-400 text-xs">{error}</p>
        )}
      </div>
    );
  }
);

DatePicker.displayName = "DatePicker";

export { DatePicker };
