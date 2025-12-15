'use client';

import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { media } from '@/styles/theme';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: ${fadeIn} 0.2s ease;
`;

const Modal = styled.div`
  background: #ffffff;
  border-radius: 24px;
  width: 100%;
  max-width: 900px;
  max-height: 90vh;
  overflow: hidden;
  animation: ${slideUp} 0.3s ease;
  display: flex;
  flex-direction: column;

  ${media.lg} {
    flex-direction: row;
  }
`;

const LeftPanel = styled.div`
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  padding: 20px;
  color: #ffffff;
  position: relative;
  overflow: hidden;

  ${media.lg} {
    width: 320px;
    flex-shrink: 0;
    padding: 32px;
  }
`;

const LeftPanelPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.05;
  background-image:
    radial-gradient(circle at 25% 25%, #ff8c42 1px, transparent 1px),
    radial-gradient(circle at 75% 75%, #ff8c42 1px, transparent 1px);
  background-size: 40px 40px;
`;

const LeftPanelContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CompanyLogo = styled.div`
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ff8c42 0%, #ffb380 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-bottom: 12px;

  ${media.lg} {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const LeftTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
  line-height: 1.3;

  ${media.lg} {
    font-size: 24px;
    margin-bottom: 12px;
  }
`;

const LeftDescription = styled.p`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.5;
  margin-bottom: 16px;
  display: none;

  ${media.lg} {
    display: block;
    font-size: 15px;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`;

const InfoItemsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;

  ${media.lg} {
    display: block;
    margin-top: 0;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);

  ${media.lg} {
    gap: 12px;
    margin-bottom: 16px;
    font-size: 14px;
  }
`;

const InfoIcon = styled.div`
  width: 24px;
  height: 24px;
  background: rgba(255, 140, 66, 0.15);
  border-radius: 6px;
  display: flex;
  align-items: center;

  ${media.lg} {
    width: 36px;
    height: 36px;
    border-radius: 10px;
  }
  justify-content: center;
  color: #ff8c42;
`;

const RightPanel = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 2;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const StepIndicator = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const Step = styled.div<{ $isActive: boolean; $isCompleted: boolean }>`
  flex: 1;
  height: 4px;
  background: ${({ $isActive, $isCompleted }) =>
    $isCompleted ? '#ff8c42' : $isActive ? '#ff8c42' : '#e0e0e0'};
  border-radius: 2px;
  transition: background 0.3s ease;
`;

const SectionTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const SectionSubtitle = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
`;

// Calendar Styles
const CalendarWrapper = styled.div`
  margin-bottom: 24px;
`;

const CalendarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const MonthYear = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const NavButton = styled.button`
  width: 36px;
  height: 36px;
  background: #f8f8f8;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a1a;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const WeekDays = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #999999;
  padding: 8px;
  text-transform: uppercase;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
`;

const DayCell = styled.button<{ $isSelected: boolean; $isToday: boolean; $isDisabled: boolean }>`
  aspect-ratio: 1;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  background: ${({ $isSelected, $isToday, $isDisabled }) =>
    $isSelected
      ? 'linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%)'
      : $isToday
      ? '#fff5ee'
      : $isDisabled
      ? 'transparent'
      : '#f8f8f8'};
  color: ${({ $isSelected, $isDisabled }) =>
    $isSelected ? '#ffffff' : $isDisabled ? '#d0d0d0' : '#1a1a1a'};
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ $isSelected }) =>
      $isSelected ? 'linear-gradient(135deg, #ff7a2e 0%, #e66a1e 100%)' : '#f0f0f0'};
    transform: ${({ $isDisabled }) => ($isDisabled ? 'none' : 'scale(1.05)')};
  }
`;

const EmptyCell = styled.div`
  aspect-ratio: 1;
`;

// Time Slots
const TimeSlotsWrapper = styled.div`
  margin-bottom: 24px;
`;

const TimeSlotsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const TimeSlot = styled.button<{ $isSelected: boolean }>`
  padding: 14px 12px;
  border: 2px solid ${({ $isSelected }) => ($isSelected ? '#ff8c42' : '#e0e0e0')};
  border-radius: 10px;
  background: ${({ $isSelected }) => ($isSelected ? '#fff5ee' : '#ffffff')};
  font-size: 14px;
  font-weight: 600;
  color: ${({ $isSelected }) => ($isSelected ? '#ff8c42' : '#1a1a1a')};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8c42;
    background: #fff5ee;
  }
`;

// Form Fields
const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const FormLabel = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 15px;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #ff8c42;
  }

  &::placeholder {
    color: #999999;
  }
`;

// Buttons
const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 24px;
`;

const BackButton = styled.button`
  padding: 14px 24px;
  background: #f8f8f8;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f0f0f0;
  }
`;

const NextButton = styled.button`
  flex: 1;
  padding: 14px 24px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%);
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #ff7a2e 0%, #e66a1e 100%);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(255, 140, 66, 0.35);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// Success State
const SuccessWrapper = styled.div`
  text-align: center;
  padding: 40px 20px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 24px;
  background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
`;

const SuccessTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 12px;
`;

const SuccessText = styled.p`
  font-size: 15px;
  color: #666666;
  line-height: 1.6;
  margin-bottom: 24px;
`;

const BookingDetails = styled.div`
  background: #f8f8f8;
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  margin-bottom: 24px;
`;

const BookingDetail = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const BookingLabel = styled.span`
  font-size: 14px;
  color: #666666;
`;

const BookingValue = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
`;

const CloseModalButton = styled.button`
  padding: 14px 32px;
  background: linear-gradient(135deg, #ff8c42 0%, #ff7a2e 100%);
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: linear-gradient(135deg, #ff7a2e 0%, #e66a1e 100%);
  }
`;

// Meeting Link Section
const MeetingLinkSection = styled.div`
  background: linear-gradient(135deg, #1a73e8 0%, #1557b0 100%);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  text-align: center;
`;

const MeetingLinkHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
`;

const GoogleMeetIcon = styled.div`
  width: 32px;
  height: 32px;
  background: #ffffff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MeetingLinkTitle = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const MeetingLink = styled.a`
  display: block;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 14px 20px;
  font-size: 15px;
  font-weight: 600;
  color: #ffffff;
  text-decoration: none;
  word-break: break-all;
  transition: all 0.2s ease;
  margin-bottom: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
  }
`;

const MeetingLinkNote = styled.p`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
`;

const ButtonsRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

const AddToCalendarButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 24px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #ff8c42;
    background: #fff5ee;
  }
`;

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const TIME_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [step, setStep] = useState(1);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    notes: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', company: '', notes: '' });
    setIsSubmitted(false);
    onClose();
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return { firstDay, daysInMonth };
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Only disable past dates
    if (date < today) return true;
    return false;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateSelect = (day: number) => {
    if (!isDateDisabled(day)) {
      setSelectedDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day));
    }
  };

  const handleSubmit = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitted(true);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) return '';
    return `${WEEKDAYS[selectedDate.getDay()]}, ${MONTHS[selectedDate.getMonth()]} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
  };

  const isPrevMonthDisabled = () => {
    const today = new Date();
    return (
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  if (!isOpen) return null;

  return (
    <Overlay onClick={handleClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <LeftPanel>
          <LeftPanelPattern />
          <CloseButton onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </CloseButton>
          <LeftPanelContent>
            <CompanyLogo>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </CompanyLogo>
            <LeftTitle>Book a Strategy Call</LeftTitle>
            <LeftDescription>
              Schedule a free 30-minute consultation to discuss your marketing goals and how we can help you achieve them.
            </LeftDescription>
            <InfoItemsRow>
              <InfoItem>
                <InfoIcon>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </InfoIcon>
                30 min
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />
                  </svg>
                </InfoIcon>
                Video Call
              </InfoItem>
              <InfoItem>
                <InfoIcon>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                  </svg>
                </InfoIcon>
                Free
              </InfoItem>
            </InfoItemsRow>
          </LeftPanelContent>
        </LeftPanel>

        <RightPanel>
          {!isSubmitted ? (
            <>
              <StepIndicator>
                <Step $isActive={step === 1} $isCompleted={step > 1} />
                <Step $isActive={step === 2} $isCompleted={step > 2} />
                <Step $isActive={step === 3} $isCompleted={step > 3} />
              </StepIndicator>

              {step === 1 && (
                <>
                  <SectionTitle>Select a Date</SectionTitle>
                  <SectionSubtitle>Choose a date that works for you</SectionSubtitle>

                  <CalendarWrapper>
                    <CalendarHeader>
                      <MonthYear>
                        {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </MonthYear>
                      <NavButtons>
                        <NavButton onClick={handlePrevMonth} disabled={isPrevMonthDisabled()}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                          </svg>
                        </NavButton>
                        <NavButton onClick={handleNextMonth}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </NavButton>
                      </NavButtons>
                    </CalendarHeader>

                    <WeekDays>
                      {WEEKDAYS.map((day) => (
                        <WeekDay key={day}>{day}</WeekDay>
                      ))}
                    </WeekDays>

                    <DaysGrid>
                      {Array.from({ length: firstDay }, (_, i) => (
                        <EmptyCell key={`empty-${i}`} />
                      ))}
                      {Array.from({ length: daysInMonth }, (_, i) => {
                        const day = i + 1;
                        const isSelected = selectedDate?.getDate() === day &&
                          selectedDate?.getMonth() === currentMonth.getMonth() &&
                          selectedDate?.getFullYear() === currentMonth.getFullYear();

                        return (
                          <DayCell
                            key={day}
                            $isSelected={isSelected}
                            $isToday={isToday(day)}
                            $isDisabled={isDateDisabled(day)}
                            onClick={() => handleDateSelect(day)}
                            disabled={isDateDisabled(day)}
                          >
                            {day}
                          </DayCell>
                        );
                      })}
                    </DaysGrid>
                  </CalendarWrapper>

                  <ButtonRow>
                    <NextButton onClick={() => setStep(2)} disabled={!selectedDate}>
                      Continue
                    </NextButton>
                  </ButtonRow>
                </>
              )}

              {step === 2 && (
                <>
                  <SectionTitle>Select a Time</SectionTitle>
                  <SectionSubtitle>{formatSelectedDate()}</SectionSubtitle>

                  <TimeSlotsWrapper>
                    <TimeSlotsGrid>
                      {TIME_SLOTS.map((time) => (
                        <TimeSlot
                          key={time}
                          $isSelected={selectedTime === time}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </TimeSlot>
                      ))}
                    </TimeSlotsGrid>
                  </TimeSlotsWrapper>

                  <ButtonRow>
                    <BackButton onClick={() => setStep(1)}>Back</BackButton>
                    <NextButton onClick={() => setStep(3)} disabled={!selectedTime}>
                      Continue
                    </NextButton>
                  </ButtonRow>
                </>
              )}

              {step === 3 && (
                <>
                  <SectionTitle>Your Details</SectionTitle>
                  <SectionSubtitle>
                    {formatSelectedDate()} at {selectedTime}
                  </SectionSubtitle>

                  <FormGroup>
                    <FormLabel>Name *</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Email *</FormLabel>
                    <FormInput
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>Company</FormLabel>
                    <FormInput
                      type="text"
                      placeholder="Your company name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                  </FormGroup>

                  <FormGroup>
                    <FormLabel>What would you like to discuss?</FormLabel>
                    <FormTextarea
                      placeholder="Tell us about your marketing goals..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                  </FormGroup>

                  <ButtonRow>
                    <BackButton onClick={() => setStep(2)}>Back</BackButton>
                    <NextButton
                      onClick={handleSubmit}
                      disabled={!formData.name || !formData.email}
                    >
                      Confirm Booking
                    </NextButton>
                  </ButtonRow>
                </>
              )}
            </>
          ) : (
            <SuccessWrapper>
              <SuccessIcon>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </SuccessIcon>
              <SuccessTitle>Booking Confirmed!</SuccessTitle>
              <SuccessText>
                We&apos;ve sent a confirmation email to {formData.email} with all the details.
              </SuccessText>

              {/* Google Meet Link */}
              <MeetingLinkSection>
                <MeetingLinkHeader>
                  <GoogleMeetIcon>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z" fill="#00897B"/>
                      <path d="M17.5 8.5v7l-3-2v-3l3-2z" fill="#ffffff"/>
                      <rect x="5" y="7" width="10" height="10" rx="1" fill="#ffffff"/>
                    </svg>
                  </GoogleMeetIcon>
                  <MeetingLinkTitle>Join with Google Meet</MeetingLinkTitle>
                </MeetingLinkHeader>
                <MeetingLink href="https://meet.google.com/owlmarketing-strategy-call" target="_blank" rel="noopener noreferrer">
                  meet.google.com/owlmarketing-strategy-call
                </MeetingLink>
                <MeetingLinkNote>
                  Click the link above or join from your calendar invite
                </MeetingLinkNote>
              </MeetingLinkSection>

              <BookingDetails>
                <BookingDetail>
                  <BookingLabel>Date</BookingLabel>
                  <BookingValue>{formatSelectedDate()}</BookingValue>
                </BookingDetail>
                <BookingDetail>
                  <BookingLabel>Time</BookingLabel>
                  <BookingValue>{selectedTime}</BookingValue>
                </BookingDetail>
                <BookingDetail>
                  <BookingLabel>Duration</BookingLabel>
                  <BookingValue>30 minutes</BookingValue>
                </BookingDetail>
              </BookingDetails>

              <ButtonsRow>
                <AddToCalendarButton href="#" onClick={(e) => e.preventDefault()}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Add to Calendar
                </AddToCalendarButton>
                <CloseModalButton onClick={handleClose}>
                  Done
                </CloseModalButton>
              </ButtonsRow>
            </SuccessWrapper>
          )}
        </RightPanel>
      </Modal>
    </Overlay>
  );
}
