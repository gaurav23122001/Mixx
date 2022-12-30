import { FcGoogle } from "react-icons/fc";
import "./Login.css";
import { AiOutlineTwitter } from "react-icons/ai";
import { SiFacebook } from "react-icons/si";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { LoginMetadata } from "../Models/LoginMetadata";
import { Redirect } from "react-router";
import FacebookLogin from 'react-facebook-login';
interface LoginProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata
}

const Login: React.FC<LoginProps> = ({
  loginfunction,
  loginMetadata
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const clientId = '413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com';
  useEffect(() => {
    document.title = "Mixx - Login"
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  })
  const onGoogleSuccess = (res: any) => {
    console.log('success:', res.profileObj);
    // loginMetadata.emailId = res.profileObj.email;
    let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
    newLoginMetadata.emailId = res.profileObj.email;
    loginfunction(newLoginMetadata)
  };
  const onGoogleFailure = (err: any) => {
    console.log('failed:', err);

  };

  const responseFacebook = (response: any) => {
    let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
    newLoginMetadata.emailId = response.email;
    loginfunction(newLoginMetadata)
    console.log(response);
  }

  return (
    <div className="container">
      <div className="box">
        <div className="heading">Welcome Note</div>
        <div className="content">
          <div className="login">
            <form autoComplete="off">
              <div className="inputBox">
                <input
                  type="email"
                  id="email"
                  name="email"
                  // autoComplete="off"
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
                // autoComplete="off"
                />
                <label htmlFor="password">PASSWORD</label>
                <div className="eye-icon" onClick={handlePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              <input type="submit" value="LOG IN" />
            </form>
          </div>
          <div className="social-login">

            <GoogleLogin
              clientId={clientId}
              // buttonText="Sign in with Google"
              render={renderProps => (
                <button onClick={renderProps.onClick} disabled={renderProps.disabled}>This is my custom Google button</button>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy={'single_host_origin'}
              isSignedIn={true}
            // icon={false}
            />
            {/* <div className="social-group">
              <div className="social-icon">
                <AiOutlineTwitter />
              </div>
              <div className="social-text">Continue With Twitter</div>
            </div> */}
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
