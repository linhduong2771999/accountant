import Swal from "sweetalert2";
import * as Color from "../../assets/styles/Colors";
export const errorMessege = () => {
    Swal.fire({
        title: "Có gì đó không ổn ?",
        text: "Vui lòng đợi trong giây lát ?",
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

export const updateSuccess = () => {
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Cập nhật thành công',
    showConfirmButton: false,
    timer: 1500
  })
}

export const deleteSuccess = (callback) => {
  Swal.fire({
    title: 'Bạn có chắc chắn xóa?',
    text: "Không thể khôi phục lại khi xóa",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa luôn'
  }).then((result) => {
    if (result.value) {
      if(callback){
        callback();
      }
      Swal.fire(
        'Xóa thành công',
        'success'
      )
    }
  })
}