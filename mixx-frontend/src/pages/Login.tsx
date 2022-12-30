import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.title = "Mixx - Login Page";
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="heading">Welcome Note</div>
        <div className="content">
          <div className="login">
            <form action="" autoComplete="off">
              <div className="inputBox">
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="off"
                  required
                />
                <label htmlFor="email">EMAIL ADDRESS</label>
              </div>
              <div className="inputBox">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                  autoComplete="off"
                />
                <label htmlFor="password">PASSWORD</label>
                <div className="eye-icon" onClick={handlePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              <input type="submit" value="LOG IN" />
              <input type="button" value="FORGOT PASSWORD" />
            </form>
          </div>
          <div className="social-login">
            <div className="social-group">
              <div className="social-icon">
                <FcGoogle />
              </div>
              <div className="social-text">Continue With Google</div>
            </div>
            <div className="social-group">
              <div className="social-icon">
                <AiOutlineTwitter />
              </div>
              <div className="social-text">Continue With Twitter</div>
            </div>
            <div className="social-group">
              <div className="social-icon">
                <SiFacebook />
              </div>
              <div className="social-text">Continue With Facebook</div>
            </div>
          </div>
        </div>
        <div className="footer">
          Dont have an account? <span>CREATE</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
