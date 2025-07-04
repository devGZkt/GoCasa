import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function DateSelector() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  // Helper to generate all dates in the range
  const getDatesBetween = (start: Date, end: Date): Date[] => {
    const dates: Date[] = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  // Whenever startDate or endDate changes, generate the array
  useEffect(() => {
    if (startDate && endDate) {
      const range = getDatesBetween(startDate, endDate);
      setSelectedDates(range);
    } else {
      setSelectedDates([]);
    }
  }, [startDate, endDate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">Select Your Dates</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholderText="Select start date"
              minDate={new Date()}
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              //  gminDate={startDate}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholderText="Select end date"
            />
          </div>
        </div>

        <div className="pt-4 text-center">
          {selectedDates.length > 0 ? (
            <>
              <p className="text-green-700 font-medium">
                Selected {selectedDates.length} days:
              </p>
              <ul className="text-sm mt-2 max-h-32 overflow-y-auto">
                {selectedDates.map((date, i) => (
                  <li key={i}>{date.toDateString()}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500">Please select both dates</p>
          )}
        </div>
      </div>
    </div>
  );
}
