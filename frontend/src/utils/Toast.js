import Swal from "sweetalert2";

function Toast({icon, title, text}) {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        width: 'auto',
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });

    Toast.fire({
        icon: icon ? icon : 'success',
        title: title ? title : '',
        text: text ? text : ''
    });
}

export default Toast;