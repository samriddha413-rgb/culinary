import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Clock,
  Users,
  Sparkles,
  Bell,
  CheckCircle2,
  MapPin,
  CalendarCheck,
  AlertCircle,
  X,
  ChevronRight,
  ShieldCheck,
  Utensils,
  Share2,
  CalendarPlus
} from 'lucide-react';

export const TableBookingView: React.FC = () => {
  const {
    currentRestaurant,
    bookings,
    bookTable,
    cancelBooking,
    subscribeTableAlert,
    triggerTableAvailabilityAlert,
    user,
    setIsAuthModalOpen
  } = useApp();

  // Form State
  const [partySize, setPartySize] = useState(2);
  const [selectedDate, setSelectedDate] = useState('Today, Sep 1');
  const [selectedTime, setSelectedTime] = useState('7:30 PM');
  const [selectedTableType, setSelectedTableType] = useState('Window Booth');
  const [specialRequest, setSpecialRequest] = useState('');
  const [customerName, setCustomerName] = useState(user?.name || 'Alexander Wright');
  const [customerEmail, setCustomerEmail] = useState(user?.email || 'alex.wright@example.com');
  const [customerPhone, setCustomerPhone] = useState(user?.phone || '+1 (555) 392-1084');
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [lastCreatedBooking, setLastCreatedBooking] = useState<any>(null);

  // Time slots with availability status
  const timeSlots = [
    { time: '5:30 PM', available: true, status: 'Available' },
    { time: '6:00 PM', available: true, status: 'Available' },
    { time: '6:30 PM', available: true, status: 'Available' },
    { time: '7:00 PM', available: true, status: 'Filling Fast' },
    { time: '7:30 PM', available: false, status: 'Waitlist / Full' },
    { time: '8:00 PM', available: true, status: 'Available' },
    { time: '8:30 PM', available: true, status: 'Filling Fast' },
    { time: '9:00 PM', available: true, status: 'Available' },
    { time: '9:30 PM', available: true, status: 'Available' }
  ];

  const tableTypes = [
    { id: 'Window Booth', label: 'Window Booth', desc: 'Street-facing intimate candlelit booth', fee: 'No fee' },
    { id: 'Indoor Main Hall', label: 'Indoor Main Hall', desc: 'Central dining amidst jazz & architecture', fee: 'No fee' },
    { id: "Chef's Counter", label: "Chef's Counter", desc: 'Front-row view of culinary brigade', fee: '+$10 deposit' },
    { id: 'Garden Patio', label: 'Garden Patio', desc: 'Heated outdoor botanic terrace', fee: 'No fee' },
    { id: 'Private Wine Cellar', label: 'Private Cellar', desc: 'Exclusive sommelier room (4-8 guests)', fee: '+$25 deposit' },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = bookTable({
      partySize,
      date: selectedDate,
      timeSlot: selectedTime,
      tableType: selectedTableType,
      specialRequest,
      customerName,
      customerEmail,
      customerPhone
    });
    setLastCreatedBooking(created);
    setIsSuccessModalOpen(true);
  };

  const handleAlertSubscribe = () => {
    subscribeTableAlert({
      date: selectedDate,
      timeSlot: selectedTime,
      partySize
    });
  };

  const isSelectedSlotFull = timeSlots.find(t => t.time === selectedTime)?.available === false;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-100 font-serif-display">
            Table Reservations
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Instant table confirmations at {currentRestaurant.name}. Walk-ins welcome based on availability.
          </p>
        </div>

        {/* Live availability test simulation trigger */}
        <button
          onClick={() => triggerTableAvailabilityAlert(selectedDate, '7:30 PM')}
          className="px-3.5 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-amber-400 border border-neutral-700 text-xs font-semibold flex items-center gap-2 transition-all shrink-0 self-start sm:self-auto"
        >
          <Bell className="w-3.5 h-3.5" />
          <span>Simulate Table Opening Alert</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Booking Form (7 Cols) */}
        <div className="lg:col-span-7 bg-neutral-900/80 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleBookingSubmit} className="space-y-6">
            {/* Step 1: Party Size */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Users className="w-4 h-4 text-amber-400" /> 1. Select Party Size
              </label>
              <div className="grid grid-cols-6 gap-2">
                {[1, 2, 3, 4, 6, 8].map(size => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setPartySize(size)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all ${
                      partySize === size
                        ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/20 scale-[1.02]'
                        : 'bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300 border border-neutral-750'
                    }`}
                  >
                    {size} {size === 1 ? 'Guest' : 'Guests'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date Selector */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" /> 2. Dining Date
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Today, Sep 1', 'Tomorrow, Sep 2', 'Friday, Sep 4'].map(date => (
                  <button
                    key={date}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all ${
                      selectedDate === date
                        ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                        : 'bg-neutral-800/70 hover:bg-neutral-800 text-neutral-300 border border-neutral-750'
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Time Slot Picker with Availability status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" /> 3. Seating Time
                </label>
                <span className="text-[11px] text-neutral-400">90-min seating duration</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-3 gap-2.5">
                {timeSlots.map(slot => {
                  const isSelected = selectedTime === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setSelectedTime(slot.time)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-amber-500/15 border-amber-500 text-amber-300 font-bold'
                          : slot.available
                          ? 'bg-neutral-800/60 border-neutral-800 hover:border-neutral-700 text-neutral-200'
                          : 'bg-neutral-950/60 border-neutral-900 text-neutral-500'
                      }`}
                    >
                      <div className="text-xs font-bold">{slot.time}</div>
                      <div
                        className={`text-[9px] mt-0.5 font-medium ${
                          !slot.available
                            ? 'text-rose-400/90'
                            : slot.status === 'Filling Fast'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {slot.status}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Push notification banner if selected time is unavailable */}
              {isSelectedSlotFull && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3 animate-in fade-in">
                  <Bell className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-2 flex-1">
                    <h4 className="text-xs font-bold text-amber-300">
                      {selectedTime} is fully booked right now
                    </h4>
                    <p className="text-[11px] text-neutral-300 leading-relaxed">
                      Enable push notifications for this slot! If a table frees up due to a cancellation or table turn, we will ping you immediately.
                    </p>
                    <button
                      type="button"
                      onClick={handleAlertSubscribe}
                      className="px-3 py-1.5 rounded-lg bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      Notify Me When Available 🔔
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Step 4: Table Area Preference */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
                <Utensils className="w-4 h-4 text-amber-400" /> 4. Seating Area Preference
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {tableTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setSelectedTableType(type.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      selectedTableType === type.id
                        ? 'bg-amber-500/10 border-amber-500/80 text-amber-300'
                        : 'bg-neutral-800/40 border-neutral-800 hover:bg-neutral-800/70 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">{type.label}</span>
                      <span className="text-[10px] text-neutral-400">{type.fee}</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 mt-1 font-light">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 5: Guest Details */}
            <div className="space-y-3 pt-2 border-t border-neutral-800">
              <label className="text-xs font-bold text-neutral-300 uppercase tracking-wider">
                5. Guest Details
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-800/70 border border-neutral-750 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-800/70 border border-neutral-750 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Number"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-neutral-800/70 border border-neutral-750 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Special requests: Dietary restrictions, anniversary, booth preference..."
                  value={specialRequest}
                  onChange={e => setSpecialRequest(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-neutral-800/70 border border-neutral-750 rounded-xl text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSelectedSlotFull}
              className="w-full py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-xl shadow-amber-500/20"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Confirm Table Reservation for {partySize} Guests</span>
            </button>
          </form>
        </div>

        {/* Right: Upcoming Bookings & Reservation Info (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Reservation Policy Card */}
          <div className="bg-neutral-900/70 border border-neutral-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" /> Reservation Guarantees
            </h3>
            <ul className="space-y-2.5 text-xs text-neutral-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Instant SMS & Push confirmation with calendar sync.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Tables held for 15 minutes past scheduled reservation time.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <span>Free cancellation up to 2 hours before dining.</span>
              </li>
            </ul>
          </div>

          {/* Current / Active Bookings */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-neutral-100 font-serif-display flex items-center justify-between">
              <span>Your Reservations ({bookings.length})</span>
            </h3>

            {bookings.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800 text-xs text-neutral-500">
                No upcoming table bookings yet. Reserve a slot using the form!
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map(booking => (
                  <div
                    key={booking.id}
                    className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800 space-y-3 relative overflow-hidden"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-neutral-100">
                            {booking.restaurantName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            {booking.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-neutral-400 mt-1 flex items-center gap-2">
                          <Users className="w-3.5 h-3.5 text-amber-400" />
                          <span>{booking.partySize} Guests</span>
                          <span>•</span>
                          <span>{booking.tableType}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-[11px] text-neutral-400 hover:text-rose-400 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="p-3 bg-neutral-800/60 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-amber-400 font-medium">
                        <Calendar className="w-4 h-4" />
                        <span>{booking.date}</span>
                        <span>•</span>
                        <span>{booking.timeSlot}</span>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {booking.tableNumber || 'Assigned on arrival'}
                      </span>
                    </div>

                    {booking.specialRequest && (
                      <p className="text-[11px] text-neutral-400 italic">
                        "{booking.specialRequest}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isSuccessModalOpen && lastCreatedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-6 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-100 font-serif-display">
                Table Reserved! 🥂
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Your reservation at {lastCreatedBooking.restaurantName} is locked in. We have sent confirmation details to {lastCreatedBooking.customerEmail}.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-800/60 border border-neutral-750 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-400">Date & Time:</span>
                <span className="font-bold text-amber-400">{lastCreatedBooking.date} @ {lastCreatedBooking.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Party Size:</span>
                <span className="text-neutral-200 font-semibold">{lastCreatedBooking.partySize} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Seating Area:</span>
                <span className="text-neutral-200">{lastCreatedBooking.tableType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Reservation Code:</span>
                <span className="font-mono font-bold text-neutral-100">{lastCreatedBooking.id}</span>
              </div>
            </div>

            <button
              onClick={() => setIsSuccessModalOpen(false)}
              className="w-full py-3 rounded-xl bg-amber-500 text-neutral-950 font-bold text-xs hover:bg-amber-400 transition-colors shadow-lg"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
