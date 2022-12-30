import "./ForgotPassword.css";
import { useEffect } from "react";

const ForgotPassword: React.FC = () => {
  useEffect(() => {
    document.title = "Mixx - Reset Password";
  }, []);

  return (
    <div className="container">
      <div className="box">
        <div className="heading">Forgot Password</div>
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
            <input type="submit" value="SEND RESET PASSWORD REQUEST" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
