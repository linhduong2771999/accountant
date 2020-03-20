import Swal from "sweetalert2";
import * as Color from "../../assets/styles/Colors";
export const errorMessege = () => {
    Swal.fire({
        title: "Internet có gì đó không ổn ?",
        text: "Vui lòng đợi trong giây lát ?",
        confirmButtonColor: Color.primaryColor
      });
} 