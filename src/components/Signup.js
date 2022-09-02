import React, {useState} from "react";
import validator from 'validator';
import "../styles/signup.css";
import RegexPassword from "../utils";


function Signup(){
    const [values, setValues] = useState({
        name:'',
        email:'',
        password:'',
        repeatPassword:'',
    })

    const [errors, setErrors] = useState({
        name:false,
        email: false,
        password: false,
        repeatPassword:false,
        fetchError: false,
        fetchErrorMsg: '',
    })

    const handleChange = (fieldName) => (e) =>{
        const userValue = e.target.value
        console.log(e.target.value);
        switch(fieldName){
            case 'email':
                validator.isEmail(userValue)
                  ? setErrors({ ...errors, email: false })
                  : setErrors({ ...errors, password: true })
                break
            case 'password':
                RegexPassword(userValue)
                  ? setErrors({ ...errors, password: false })
                  : setErrors({ ...errors, password: true})
                break
            case 'repeatPassword':
                userValue === values.password
                  ? setErrors({ ...errors, repeatPassword: false })
                  : setErrors({ ...errors, repeatPassword:true })
                break
        }
        setValues({ ...values, [fieldName]: e.target.value })
    }

    const handleSubmit = async(e) => {
        console.log('already submit');
        e.preventDefault()
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password
                })
            })
            if(!res.ok){
                const error = await res.json()
                return setErrors({
                    ...errors,
                    fetchError: true,
                    fetchErrorMsg: error.msg,
                })
            }
            const data = await res.json()
            console.log(data);
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: data.msg
            })
            setValues({
                name:'',
                email:'',
                password:'',
                repeatPassword:'',
                showPassword: false,
                showRepeatPassword: false,
            })
            return 
        } catch(error){
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: 'There was a problem with our server, please try again later',
            })
        }
    } 

    return (
       <> 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">ชื่อ-นามสกุล</label>
                <input type="name" className="form-control" id="name" aria-describedby="firstname" placeholder="ชื่อ-นามสกุล" value={values.name} onChange={handleChange('name')}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="อีเมล" value={values.email} onChange={handleChange('email')} 
                error={errors.email.toString()} helpertext={errors.email ? 'Please insert a valid email address': undefined}/>
            </div>
            <div className="row">
                <div className="form-group col">
                    <label htmlFor="password-field">รหัสผ่าน</label>
                    <input type={"password"} className="form-control" id="password" placeholder="รหัสผ่าน" value={values.password} onChange={handleChange('password')} error={errors.password.toString()}/>
                    {/* <span className="help-block" error={errors.password}>Password must be at least 8 characters, have one symbol, 1 uppercase letter, 1 lowercase and 1 digit</span> */}
                </div>
                <div className="form-group col">
                    <label htmlFor="password-repeat-field">ยืนยันรหัสผ่าน</label>
                    <input type={"password"} className="form-control" id='password-repeat-field' placeholder="รหัสผ่าน" value={values.repeatPassword} onChange={handleChange('repeatPassword')}/>
                </div>
            </div>
            <a className="forgot">ลืม Password?</a>
            <button type="submit" className="btn btn-primary button">สมัครสมาชิก</button>
        </form>  
        
       </>
    )
}


export default Signup