import React, { useState, useEffect } from "react";
import { validateEmail, validatePassword, validateName, validatePincode } from "../common/formValidation";
import axios from 'axios';
import { useLocation } from 'react-router-dom';


const ContactForm = ({isLoggedIn}) => {
    const EMAIL = "email";
const PHONE = "phone";
const PASSWORD = "password";
const PINCODE = "pincode";
const NAME = "name";


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
    const [pendingNotification, setPendingNotification] = useState([]);

    /*
    useEffect(()=>{
        //one time operation, gene
    }, []);
    */

    useEffect(()=>{
        if(isLoggedIn){
            const getPendingNotification = async function (){
                const authenticationToken = localStorage.getItem('token');
                if(authenticationToken){
                    let config = { headers: {'Authorization': 'Bearer ' + authenticationToken}};
                    const res = await axios.get('http://127.0.0.1:3001/api/user/pendingNotifications', config)
                    console.log("yaha agye hai hum", res);
                    if(res && res.data && res.data.success){
                        console.log(res.data.pendingNotifications);
                        setPendingNotification(res.data.pendingNotifications);
                    }
                    else{
                        // something went wrong
                        console.log("nahi nahi");
                    }
                }
            }
            getPendingNotification();
        }
    },[isLoggedIn])

    const sendNotification = (notification) => {
        //noti object
        console.log("noti object", notification)
    }

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
                setPhone({
                    ...name,
                });
                break;
            case PINCODE:
                setPincode({
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
            //TODO call api
            // history.push("/");
        }
    };
    return (
        <React.Fragment>
            {!isLoggedIn ?
        <div className="contact-form">
            <div className="row mt-2">
                <div className="col-md-6 offset-md-3">
                    <div className="card" >
                        <div className="card-body">

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
        </div> : pendingNotification.map((notification, index)=><div key={index} className="card">
            <h3>{notification.name}</h3>
            <small>{notification.email}</small>
            <p>{notification.phone}</p>
            <button onClick={() => sendNotification(notification)}> Check </button>
        </div>)}</React.Fragment>

    );
};

export default ContactForm;