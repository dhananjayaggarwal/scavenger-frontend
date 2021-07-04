import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateName, validatePincode } from "../common/formValidation";
// import { EMAIL, PASSWORD } from "../../constants";
import { useDispatch } from "react-redux";
// import { login, isLoggedIn } from "../../actions/index";
import { useHistory } from "react-router-dom";

const EMAIL = "email";
const PHONE = "phone";
const PASSWORD = "password";
const PINCODE = "pincode";
const NAME = "name";

const ContactForm = () => {
    const [email, setEmail] = useState({
        value: "",
        error: false,
    });
    const [name, setName] = useState({
        value: "",
        error: false,
    });
    const [phone, setPhone] = useState({
        value: "",
        error: false,
    });
    const [pincode, setPincode] = useState({
        value: "",
        error: false,
    });
    const dispatch = useDispatch();
    let history = useHistory();

    // useEffect(() => {
    //   dispatch(isLoggedIn());
    // }, [dispatch]);

    const validateAllFields = () => {
        return !validateEmail(email.value) && !validateName(name.value) && !validatePincode(pincode.value);
    };

    const handleChangeInput = (e) => {
        let { target } = e;
        switch (target.name) {
            case EMAIL:
                setEmail({ ...email, value: target.value });
                break;
            case NAME:
                setName({ ...name, value: target.value });
                break;
            case PHONE:
                setPhone({ ...phone, value: target.value });
                break;
            case PINCODE:
                setPincode({ ...pincode, value: target.value });
                break;
            default:
            // error_modal("wrong input");
        }
    };

    const handleBlurInput = (e) => {
        const { target } = e;
        switch (target.name) {
            case EMAIL:
                setEmail({ ...email, error: validateEmail(email.value) });
                break;
            case NAME:
                setName({
                    ...name,
                    error: validateName(name.value),
                });
                break;
            case PHONE:
                setName({
                    ...name,
                });
                break;
            case PINCODE:
                setName({
                    ...name,
                    error: validatePincode(pincode.value),
                });
                break;
            default:
            // error_modal("wrong input");
        }
    };
    const submitContactForm = (e) => {
        e.preventDefault();
        if (validateAllFields()) {
            let data = {
                name: name.value,
                email: email.value,
                phone: phone.value,
                pincode: pincode.value,

            };
            // const formData = new FormData();
            // formData.set(EMAIL, email.value);
            // formData.set(PASSWORD, password.value);
            // dispatch(login(data));
            history.push("/");
        }
    };
    return (
        <div className="contact-form">
            <div className="row mt-2">
                <div className="col-md-6 offset-md-3">
                    <div className="card" >
                        <div class="card-body">

                            <form onSubmit={submitContactForm}>
                                <div className="form-group mb-4">
                                    <label>Name: </label>
                                    <input
                                        className="form-control"
                                        name={NAME}
                                        value={name.value}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurInput}
                                    />
                                    {name.error && <small className="error-msg">{name.error}</small>}
                                </div>
                                <div className="form-group mb-4">
                                    <label>Email: </label>
                                    <input
                                        className="form-control"
                                        name={EMAIL}
                                        value={email.value}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurInput}
                                    />
                                    {email.error && <small className="error-msg">{email.error}</small>}
                                </div>
                                <div className="form-group mb-4">
                                    <label>Phone: </label>
                                    <input
                                        className="form-control"
                                        name={PHONE}
                                        value={phone.value}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurInput}
                                    />
                                    {phone.error && (
                                        <small className="error-msg">{phone.error}</small>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label>Pincode: </label>
                                    <input
                                        className="form-control"
                                        name={PINCODE}
                                        value={pincode.value}
                                        onChange={handleChangeInput}
                                        onBlur={handleBlurInput}
                                    />
                                    {pincode.error && (
                                        <small className="error-msg">{pincode.error}</small>
                                    )}
                                </div>
                                <button className="btn btn-success bnt-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ContactForm;