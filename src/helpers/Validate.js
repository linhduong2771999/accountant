export const  validateStrengthPassword = (password) => {
    const re = /(?=.*[A-Z])/;
    const re1 = /(?=.*[a-z])/;
    // const re2 = /(?=.*[!@#$%^&*])/; && re2.test(password)
    const re2 = /(?=.{8,})/;
    const re3 = /(?=.*[0-9])/;
    return (re.test(password) && re1.test(password) && re2.test(password) && re3.test(password));
}

// validate form
export const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Tên bắt buộc'
    } else if (values.name.length > 18) {
      errors.name = 'Tên phải ít hơn 18 kí tự'
    }
    if (!values.email) {
      errors.email = 'Email bắt buộc'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Email không hợp lệ'
    }
    if (!values.position) {
      errors.position = 'Chức vụ bắt buộc'
    } 
    if(!/^\d{10}$/.test(values.phone)){
      errors.phone = 'Số điện thoại không hợp lệ'
    }
    return errors
  }