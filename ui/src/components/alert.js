import Swal from 'sweetalert2'
import deleteGif from './delete.gif';

export default function showAlert(message, alertType, onConfirm) {
    if (alertType === 'delete') {
        Swal.fire({
            title: 'Are you sure?',
            text: message || "You won't be able to revert this!",
            imageUrl: deleteGif,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your item has been deleted.',
                    icon: 'success',
                    timer: 3000,
                });

                if (onConfirm) {
                    onConfirm(); // Run callback if provided
                }
            }
        });
    } else {
        Swal.fire({
            text: message,
            icon: alertType,
            buttonsStyling: true,
            confirmButtonText: 'Got it!',
            customClass: {
                confirmButton: 'btn btn-primary',
            },
            timer: 5000,
        });
    }
}
