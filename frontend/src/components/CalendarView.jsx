import React, { useState, useMemo } from 'react';
import './CalendarView.css';

function CalendarView({ birthdayList = [], onEdit, onDelete }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBirthday, setSelectedBirthday] = useState(null);
    const [showBirthdayModal, setShowBirthdayModal] = useState(false);
    
    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

    // Get calendar data
    const calendarData = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const startDate = new Date(firstDay);
        startDate.setDate(startDate.getDate() - firstDay.getDay());
        
        const days = [];
        const currentDateObj = new Date(startDate);
        
        // Generate 42 days (6 weeks)
        for (let i = 0; i < 42; i++) {
            const dayData = {
                date: new Date(currentDateObj),
                isCurrentMonth: currentDateObj.getMonth() === month,
                isToday: 
                    currentDateObj.toDateString() === new Date().toDateString(),
                birthdays: []
            };
            
            // Find birthdays for this date
            birthdayList.forEach(birthday => {
                const birthdayDate = new Date(birthday.birthday_date);
                if (
                    birthdayDate.getDate() === currentDateObj.getDate() &&
                    birthdayDate.getMonth() === currentDateObj.getMonth()
                ) {
                    dayData.birthdays.push(birthday);
                }
            });
            
            days.push(dayData);
            currentDateObj.setDate(currentDateObj.getDate() + 1);
        }
        
        return days;
    }, [currentDate, birthdayList]);

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(prev.getMonth() + direction);
            return newDate;
        });
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age + 1; // Next birthday age
    };

    const handleBirthdayClick = (birthday) => {
        setSelectedBirthday(birthday);
        setShowBirthdayModal(true);
    };

    const closeBirthdayModal = () => {
        setShowBirthdayModal(false);
        setSelectedBirthday(null);
    };

    const handleEdit = (birthday) => {
        closeBirthdayModal();
        if (onEdit) onEdit(birthday);
    };

    const handleDelete = (birthday) => {
        closeBirthdayModal();
        if (onDelete) onDelete(birthday);
    };

    return (
        <div className="calendar-view">
            {/* Calendar Header */}
            <div className="calendar-header">
                <button className="nav-button" onClick={() => navigateMonth(-1)}>
                    &#8249;
                </button>
                <div className="month-year">
                    <h2>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
                </div>
                <button className="nav-button" onClick={() => navigateMonth(1)}>
                    &#8250;
                </button>
            </div>

            <button className="today-button" onClick={goToToday}>
                Hoy
            </button>

            {/* Day Names */}
            <div className="calendar-grid">
                <div className="day-names">
                    {dayNames.map(day => (
                        <div key={day} className="day-name">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Calendar Days */}
                <div className="days-grid">
                    {calendarData.map((dayData, index) => (
                        <div
                            key={index}
                            className={`calendar-day ${
                                !dayData.isCurrentMonth ? 'other-month' : ''
                            } ${dayData.isToday ? 'today' : ''} ${
                                dayData.birthdays.length > 0 ? 'has-birthday' : ''
                            }`}
                        >
                            <div className="day-number">
                                {dayData.date.getDate()}
                            </div>
                            
                            {/* Birthday indicators */}
                            {dayData.birthdays.length > 0 && (
                                <div className="birthday-indicators">
                                    {dayData.birthdays.map((birthday, bIndex) => (
                                        <div
                                            key={bIndex}
                                            className="birthday-indicator clickable"
                                            title={`${birthday.first_name} ${birthday.last_name || ''} - ${calculateAge(birthday.birthday_date)} años`}
                                            onClick={() => handleBirthdayClick(birthday)}
                                        >
                                            <span className="birthday-icon">🎂</span>
                                            <span className="birthday-name">
                                                {birthday.first_name}
                                            </span>
                                            <span className="birthday-age">
                                                {calculateAge(birthday.birthday_date)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Birthday Summary */}
            {birthdayList.length > 0 && (
                <div className="birthday-summary">
                    <h3>Próximos Cumpleaños</h3>
                    <div className="upcoming-birthdays">
                        {birthdayList
                            .sort((a, b) => {
                                const today = new Date();
                                const aDate = new Date(today.getFullYear(), new Date(a.birthday_date).getMonth(), new Date(a.birthday_date).getDate());
                                const bDate = new Date(today.getFullYear(), new Date(b.birthday_date).getMonth(), new Date(b.birthday_date).getDate());
                                
                                if (aDate < today) aDate.setFullYear(today.getFullYear() + 1);
                                if (bDate < today) bDate.setFullYear(today.getFullYear() + 1);
                                
                                return aDate - bDate;
                            })
                            .slice(0, 5)
                            .map((birthday, index) => (
                                <div 
                                    key={index} 
                                    className="upcoming-birthday clickable"
                                    onClick={() => handleBirthdayClick(birthday)}
                                >
                                    <span className="upcoming-icon">🎂</span>
                                    <span className="upcoming-name">
                                        {birthday.first_name} {birthday.last_name || ''}
                                    </span>
                                    <span className="upcoming-date">
                                        {new Date(birthday.birthday_date).toLocaleDateString('es-ES', {
                                            day: 'numeric',
                                            month: 'long'
                                        })}
                                    </span>
                                    <span className="upcoming-age">
                                        ({calculateAge(birthday.birthday_date)} años)
                                    </span>
                                    <div className="upcoming-actions">
                                        <button 
                                            className="action-button edit"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleEdit(birthday);
                                            }}
                                            title="Editar"
                                        >
                                            ✏️
                                        </button>
                                        <button 
                                            className="action-button delete"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(birthday);
                                            }}
                                            title="Eliminar"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Birthday Detail Modal */}
            {showBirthdayModal && selectedBirthday && (
                <div className="birthday-modal-overlay" onClick={closeBirthdayModal}>
                    <div className="birthday-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="modal-birthday-info">
                                <span className="modal-birthday-icon">🎂</span>
                                <div>
                                    <h3 className="modal-birthday-name">
                                        {selectedBirthday.first_name} {selectedBirthday.last_name || ''}
                                    </h3>
                                    <p className="modal-birthday-date">
                                        {new Date(selectedBirthday.birthday_date).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                            <button 
                                className="modal-close-button"
                                onClick={closeBirthdayModal}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="birthday-details">
                                <div className="detail-item">
                                    <span className="detail-label">Edad próxima:</span>
                                    <span className="detail-value age-badge">
                                        {calculateAge(selectedBirthday.birthday_date)} años
                                    </span>
                                </div>
                                
                                {selectedBirthday.notes && (
                                    <div className="detail-item">
                                        <span className="detail-label">Notas:</span>
                                        <p className="detail-value notes">{selectedBirthday.notes}</p>
                                    </div>
                                )}

                                <div className="detail-item">
                                    <span className="detail-label">Notificaciones:</span>
                                    <span className={`detail-value notification-status ${selectedBirthday.notify ? 'active' : 'inactive'}`}>
                                        {selectedBirthday.notify ? '🔔 Activadas' : '🔕 Desactivadas'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button 
                                className="modal-button edit-button"
                                onClick={() => handleEdit(selectedBirthday)}
                            >
                                <span className="button-icon">✏️</span>
                                Editar
                            </button>
                            <button 
                                className="modal-button delete-button"
                                onClick={() => handleDelete(selectedBirthday)}
                            >
                                <span className="button-icon">🗑️</span>
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CalendarView;