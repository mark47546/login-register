import React, {useState} from "react";
import validator from "validator";
import RegexPassword from "../utils";
import '../styles/signup.css'

function Login({}){
    const [values, setValues] = useState({
        email:'',
        password:'',
    })

    const [errors, setErrors] = useState({
        email: false,
        password: false,
        fetchError: false,
        fetchErrorMsg: '',
    })

    const handleChange = (fieldName) => (e) =>{
        const userValue = e.target.value
        let isCorrectValue = 
            fieldName === 'email'
              ? validator.isEmail(userValue)
              : RegexPassword(userValue)
            isCorrectValue
              ? setErrors({ ...errors, [fieldName]: false })
              : setErrors({ ...errors, [fieldName]: true })
            setValues({...values, [fieldName]: e.target.value})

    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await fetch('/api/login',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email:values.email,
                    password:values.password
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
            console.log({data});
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg: data.msg,
            })

            setValues({
                email:'',
                password:''
            })
            return 
        }  catch(error){
            setErrors({
                ...errors,
                fetchError: true,
                fetchErrorMsg:
                  'There was a problem with our server, please try again later',
            })
        }
    }

    return (
        <> 
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="email">อีเมล</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="อีเมล" value={values.email} onChange={handleChange('email')} 
                error={errors.email.toString()} helpertext={errors.email ? 'Please insert a valid email address': undefined}/>
            </div>
            <div className="form-group">
                <label htmlFor="password-field">รหัสผ่าน</label>
                <input type={"password"} className="form-control" id="password" placeholder="รหัสผ่าน" value={values.password} onChange={handleChange('password')} error={errors.password.toString()}/>
            </div>
            <a className="forgot">ลืม Password?</a>
            <button type="submit" className="btn btn-primary button">เข้าสู่ระบบ</button>
        </form>  
        
       </>
    )
}

export default Login