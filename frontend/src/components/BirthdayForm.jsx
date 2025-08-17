import React, { useState } from 'react';
import './BirthdayForm.css';

function BirthdayForm({ onSubmit, onCancel, loading = false, initialData = null, isEditing = false }) {
    const [formData, setFormData] = useState({
        name: initialData?.first_name || '',
        lastName: initialData?.last_name || '',
        date: initialData?.birthday_date || '',
        notify: initialData?.notify !== undefined ? initialData.notify : true,
        notes: initialData?.notes || ''
    });
    
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es obligatorio';
        }
        
        if (!formData.date) {
            newErrors.date = 'La fecha de nacimiento es obligatoria';
        }
        
        if (formData.notes && formData.notes.length > 200) {
            newErrors.notes = 'Las notas no pueden exceder 200 caracteres';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            onSubmit({
                name: formData.name.trim(),
                lastName: formData.lastName.trim() || null,
                birth_date: formData.date,
                notify: formData.notify,
                notes: formData.notes.trim() || null
            });
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    return (
        <div className="birthday-form-overlay">
            <div className="birthday-form-container">
                 <form onSubmit={handleSubmit} className="birthday-form">
                    <div className="form-header">
                        <h3>{isEditing ? '✏️ Editar Cumpleaños' : '🎂 Nuevo Cumpleaños'}</h3>
                        <button 
                            type="button" 
                            className="close-button"
                            onClick={onCancel}
                        >
                            ✕
                        </button>
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Nombre *</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Ingresa el nombre"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={errors.name ? 'error' : ''}
                            disabled={loading}
                        />
                        {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Apellido</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Ingresa el apellido (opcional)"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Fecha de Nacimiento *</label>
                        <input
                            id="date"
                            type="date"
                            value={formData.date}
                            onChange={(e) => handleInputChange('date', e.target.value)}
                            className={errors.date ? 'error' : ''}
                            disabled={loading}
                        />
                        {errors.date && <span className="error-text">{errors.date}</span>}
                    </div>

                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={formData.notify}
                                onChange={(e) => handleInputChange('notify', e.target.checked)}
                                disabled={loading}
                            />
                            <span className="checkmark"></span>
                            Notificar este cumpleaños
                        </label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="notes">Notas</label>
                        <textarea
                            id="notes"
                            placeholder="Agregar notas adicionales (opcional)"
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            maxLength="200"
                            rows="3"
                            className={errors.notes ? 'error' : ''}
                            disabled={loading}
                        />
                        <div className="char-count">
                            {formData.notes.length}/200
                        </div>
                        {errors.notes && <span className="error-text">{errors.notes}</span>}
                    </div>

                    <div className="form-buttons">
                        <button 
                            type="button" 
                            className="cancel-button"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancelar
                        </button>
                        <button 
                            type="submit" 
                            className="submit-button"
                            disabled={loading}
                        >
                            {loading ? 'Guardando...' : (isEditing ? 'Actualizar Cumpleaños' : 'Guardar Cumpleaños')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BirthdayForm;