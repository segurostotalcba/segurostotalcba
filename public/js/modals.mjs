export function showDeleteModal(title, bodyText, onConfirm) {
    // Get modal elements
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalbody');
    const confirmBtn = document.getElementById('btnConfirmar');
    
    // Set the title and body text
    modalTitle.textContent = title;
    modalBody.textContent = bodyText;

    // Remove previous event listeners to avoid duplication
    confirmBtn.replaceWith(confirmBtn.cloneNode(true));
    const newConfirmBtn = document.getElementById('confirmDeleteBtn');

    // Add new event listener for confirm button
    newConfirmBtn.addEventListener('click', function() {
        if (onConfirm && typeof onConfirm === 'function') {
            onConfirm();
        }
        // Hide modal after confirmation
        const modalElement = document.getElementById('showModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }
    });

    // Show the modal
    const modalElement = new bootstrap.Modal(document.getElementById('showModal'));
    modalElement.show();
}

