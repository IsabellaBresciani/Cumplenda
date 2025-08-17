import React from 'react';
import './ConfirmDialog.css';

function ConfirmDialog({ 
    title, 
    message, 
    confirmText = "Confirmar", 
    cancelText = "Cancelar",
    onConfirm, 
    onCancel, 
    loading = false,
    type = "default" // "default", "danger", "warning"
}) {
    return (
        <div className="confirm-dialog-overlay">
            <div className="confirm-dialog">
                <div className="confirm-header">
                    <h3 className="confirm-title">
                        <span className="confirm-icon">
                            {type === 'danger' ? '⚠️' : type === 'warning' ? '⚠️' : '❓'}
                        </span>
                        {title}
                    </h3>
                </div>
                
                <div className="confirm-body">
                    <p className="confirm-message">{message}</p>
                </div>
                
                <div className="confirm-actions">
                    <button 
                        className="confirm-button cancel"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        {cancelText}
                    </button>
                    <button 
                        className={`confirm-button confirm ${type}`}
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span className="loading-spinner"></span>
                                Procesando...
                            </>
                        ) : (
                            confirmText
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDialog;