import './App.css';
import Signup from './components/Signup';
import Facebook from './components/facebook';
import Login from './components/Login';

function App() {
  return (
    <>
      <div className="container">
          <div className="card mx-auto shadow-sm">
              <h5 className="card-header">เข้าสู่ระบบ</h5>
              <div className="card-body">
                  <ul className="nav nav-tabs tabs" id="myTab" role="tablist">
                      <li className="nav-item" role="presentation">
                          <button className="nav-link active" id="login-tab" data-bs-toggle="tab" data-bs-target="#login" type="button" role="tab" aria-controls="login" aria-selected="true">เข้าสู่ระบบ</button>
                      </li>
                      <li className="nav-item" role="presentation">
                          <button className="nav-link" id="register-tab" data-bs-toggle="tab" data-bs-target="#register" type="button" role="tab" aria-controls="register" aria-selected="false">สมัครสมาชิก</button>
                      </li>
                  </ul>
                  <div className="tab-content tabs-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="login-tab"><Login/></div>
                    <div className="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab"><Signup/></div>
                  </div>
                  
                  
                  <p className="text-center optional"><span>หรือเชื่อมต่อด้วย</span></p>
                  <Facebook/>
              </div>  
          </div>
      </div>
  </>
  );
}

export default App;
