import Swal from "sweetalert2";
import * as Color from "../../assets/styles/Colors";

export const errorMessege = (title, text, icon) => {
    Swal.fire({
        title: title,
        text: text,
        icon,
        confirmButtonColor: Color.primaryColor
      });
} 

export const createSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tạo mới thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

export const actionSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Tác vụ thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

export const updateSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Cập nhật thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

export const deleteSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Xóa thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

export const deleteAction = (callback, name) => {
  Swal.fire({
    title: `Xóa ${name}?`,
    text: "Không thể khôi phục lại khi xóa",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa luôn',
    focusCancel: true
  }).then((result) => {
    if (result.value) {
      if(callback){
        callback();
      }
    }
  }).catch(error => {
    console.log(error);
  })
}