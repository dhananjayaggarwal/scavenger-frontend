const isEmpty = (value) =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

export const validateEmail = (email, type = "register") => {
  if (isEmpty(email)) return "Email is required";
  if (type !== "register") return false;
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return !emailRegex.test(String(email).toLowerCase());
};

export const validateName = (name) => {
  if (isEmpty(name)) return "Name is required";
  if (name.length < 2 && name.length > 30)
    return "Name must be between 2 to 30 chararters";
  return false;
};

export const validatePincode = (pincode) => {
    if (isEmpty(pincode)) return "Pincode is required";

    const numberRegex = /^\d+$/;
     if(!numberRegex.test(String(pincode))){
        return "Pincode must contain numbers only";
     }

    if (pincode.length != 6)
      return "Pincode must be 6 numbers long";
    return false;
  };

export const validatePassword = (password, type = "register") => {
  if (isEmpty(password)) return "Password is required";
  if (type !== "register") return false;
  // const passwordRegex =
  //   "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$";
  // return passwordRegex.test(password);
  return false;
};
