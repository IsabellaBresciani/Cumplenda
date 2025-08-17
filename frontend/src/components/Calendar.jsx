import React, { useContext, useState, useEffect } from 'react';
import './Sidebar.css';
import { AuthContext } from '../context/AuthContext';
import getBirthdayList from '../services/getBirthdayList';
import newBirthday from '../services/newBirthday';
import updateBirthday from '../services/updateBirthday';
import deleteBirthday from '../services/deleteBirthday';
import ButtonNewBirthday from './ButtonNewBirthday';
import BirthdayForm from './BirthdayForm';
import CalendarView from './CalendarView';
import ConfirmDialog from './ConfirmDialog'; // We'll create this

function Calendar() {
    const [activeTab, setActiveTab] = useState('home');
    const [birthdayList, setBirthdayList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formLoading, setFormLoading] = useState(false);
    const [editingBirthday, setEditingBirthday] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [birthdayToDelete, setBirthdayToDelete] = useState(null);
    const { currentUser, authToken, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        fetchBirthdays();
    }, []);

    const fetchBirthdays = async () => {
        try {
            setLoading(true);
            setError(null);
            console.log('Fetching birthdays...');

            const data = await getBirthdayList(authToken, currentUser.id);
            const birthdays = data.data;
            console.log('Birthdays fetched:', birthdays);
            
            if (birthdays && Array.isArray(birthdays)) {
                setBirthdayList(birthdays);
            } else {
                setBirthdayList([]);
            }
            
        } catch (err) {
            setError('Error al cargar los cumpleaños');
            console.error('Error fetching birthdays:', err);
            
            if (err.message?.includes('401') || err.message?.includes('unauthorized')) {
                console.warn('Token inválido o expirado');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleNewBirthday = async (birthdayData) => {
        try {
            setFormLoading(true);
            console.log('Creating new birthday:', birthdayData);
            
            await newBirthday(authToken, {
                ...birthdayData,
                user_id: currentUser.id
            });

            setShowForm(false);
            setEditingBirthday(null);
            await fetchBirthdays();
            
        } catch (err) {
            setError('Error al crear el cumpleaños');
            console.error('Error creating birthday:', err);
        } finally {
            setFormLoading(false);
        }
    };

    const handleEditBirthday = async (birthdayData) => {
        try {
            setFormLoading(true);
            console.log('Updating birthday:', editingBirthday.id, birthdayData);
            
            await updateBirthday(authToken, editingBirthday.id, birthdayData);

            setShowForm(false);
            setEditingBirthday(null);
            await fetchBirthdays();
            
        } catch (err) {
            setError('Error al actualizar el cumpleaños');
            console.error('Error updating birthday:', err);
        } finally {
            setFormLoading(false);
        }
    };

    const handleDeleteBirthday = async () => {
        try {
            setFormLoading(true);
            console.log('Deleting birthday:', birthdayToDelete.id);
            
            await deleteBirthday(authToken, birthdayToDelete.id);

            setShowDeleteConfirm(false);
            setBirthdayToDelete(null);
            await fetchBirthdays();
            
        } catch (err) {
            setError('Error al eliminar el cumpleaños');
            console.error('Error deleting birthday:', err);
        } finally {
            setFormLoading(false);
        }
    };

    const openEditForm = (birthday) => {
        setEditingBirthday(birthday);
        setShowForm(true);
    };

    const openDeleteConfirm = (birthday) => {
        setBirthdayToDelete(birthday);
        setShowDeleteConfirm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingBirthday(null);
    };

    const closeDeleteConfirm = () => {
        setShowDeleteConfirm(false);
        setBirthdayToDelete(null);
    };

    if (loading) {
        return (
            <div className="calendar-loading">
                <div className="spinner"></div>
                <p>Cargando cumpleaños...</p>
            </div>
        );
    }

    return (
        <div className={`calendar`}>
            <div className="calendar-header">
                <ButtonNewBirthday onClick={() => setShowForm(true)} />
            </div>

            {/* Birthday Form Modal */}
            {showForm && (
                <BirthdayForm
                    onSubmit={editingBirthday ? handleEditBirthday : handleNewBirthday}
                    onCancel={closeForm}
                    loading={formLoading}
                    initialData={editingBirthday}
                    isEditing={!!editingBirthday}
                />
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <ConfirmDialog
                    title="Eliminar Cumpleaños"
                    message={`¿Estás seguro de que deseas eliminar el cumpleaños de ${birthdayToDelete?.first_name} ${birthdayToDelete?.last_name || ''}?`}
                    confirmText="Eliminar"
                    cancelText="Cancelar"
                    onConfirm={handleDeleteBirthday}
                    onCancel={closeDeleteConfirm}
                    loading={formLoading}
                    type="danger"
                />
            )}

            <div className="birthday-list">
                {error && <div className="error-message">{error}</div>}
                
                {birthdayList.length === 0 ? (
                    <div className="empty-state">
                        <p>🎂 No hay cumpleaños registrados</p>
                    </div>
                ) : (
                    <CalendarView 
                        birthdayList={birthdayList}
                        onEdit={openEditForm}
                        onDelete={openDeleteConfirm}
                    />
                )}
            </div>
        </div>
    );
}

export default Calendar;