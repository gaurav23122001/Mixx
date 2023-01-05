import { Redirect, useParams } from "react-router";
import { LoginMetadata } from "../Models/LoginMetadata";
import Contact from "./ContactUs";
import Home from "./Home";
import Files from "./Files";

interface PageProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata;
}

const Page: React.FC<PageProps> = ({ loginfunction, loginMetadata }) => {
  const { name } = useParams<{ name: string }>();
  if (name === "home") {
    return <Home loginfunction={loginfunction} loginMetadata={loginMetadata} />;
  } else if (name === "contact") {
    return (
      <Contact loginfunction={loginfunction} loginMetadata={loginMetadata} />
    );
  } else if (name === "files") {
    return (
      <Files loginfunction={loginfunction} loginMetadata={loginMetadata} />
    );
  }

  return <Redirect to="/home" />;
};

export default Page;
