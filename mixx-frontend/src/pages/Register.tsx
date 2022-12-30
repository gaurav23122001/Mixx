import "./Register.css";
import { AiOutlineGoogle } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";
import { gapi } from "gapi-script";
import { LoginMetadata } from "../Models/LoginMetadata";
import music from "./../Assets/music.png";
import symbol from "./../Assets/symbol.png";

interface RegisterProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  setShowRegister: (value: boolean) => void;
  loginMetadata: LoginMetadata;
}

const Register: React.FC<RegisterProps> = ({
  loginfunction,
  setShowRegister,
  loginMetadata,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePassword = () => {
    setShowPassword(!showPassword);
  };
  const clientId =
    "413463613463-mgrsltc9uf95ieghf1iqk0k7bgps5ul9.apps.googleusercontent.com";
  useEffect(() => {
    document.title = "Mixx - Login";
    const initClient = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };
    gapi.load("client:auth2", initClient);
  });
  const onGoogleSuccess = (res: any) => {
    console.log("success:", res.profileObj);
    // loginMetadata.emailId = res.profileObj.email;
    let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
    newLoginMetadata.emailId = res.profileObj.email;
    loginfunction(newLoginMetadata);
  };
  const onGoogleFailure = (err: any) => {
    console.log("failed:", err);
  };

  // const responseFacebook = (response: any) => {
  //   let newLoginMetadata: LoginMetadata = new LoginMetadata("-1");
  //   newLoginMetadata.emailId = response.email;
  //   loginfunction(newLoginMetadata);
  //   console.log(response);
  // };

  return (
    <div className="container">
      <div className="box">
        <div className="left-box">
          <div className="title">Welcome Note</div>
          <div className="line"></div>
          <div className="content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            laboriosam aperiam ex quos, non repellendus molestias quasi quis
            sint debitis impedit maiores culpa aliquam minima dolores esse. Vero
            dicta laborum voluptate nobis quia tempora aperiam id distinctio
          </div>
          <div className="image-box">
            <img src={symbol} alt="" className="img1" />
            <img src={music} alt="" />
          </div>
        </div>
        <div className="right-box">
          <div className="title ion-text-center">
            <div>SIGN UP</div>
            <div className="line"></div>
          </div>
          <div className="form">
            <form autoComplete="off">
              <div className="inputBox">
                <input type="text" id="name" name="name" required />
                <label htmlFor="name">Name</label>
              </div>
              <div className="inputBox">
                <input type="text" id="email" name="email" required />
                <label htmlFor="email">Email Address</label>
              </div>
              <div className="inputBox">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  required
                />
                <label htmlFor="password">Password</label>
                <div className="eye-icon" onClick={handlePassword}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>
              <input type="submit" value="SIGN UP" />
            </form>
          </div>
          <div className="divider">
            <div className="left"></div>
            <div className="content">OR</div>
            <div className="right"></div>
          </div>
          <div className="social-login ion-text-center">
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <div onClick={renderProps.onClick}>
                  <AiOutlineGoogle />
                </div>
              )}
              onSuccess={onGoogleSuccess}
              onFailure={onGoogleFailure}
              cookiePolicy={"single_host_origin"}
              isSignedIn={true}
            />
          </div>
          <div className="footer">
            <div className="ion-text-center">
              Allready have an account?{" "}
              <span
                onClick={() => {
                  setShowRegister(false);
                }}
              >
                LOG IN
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
