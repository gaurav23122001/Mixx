import Menu from '../components/Menu';
import { LoginMetadata } from '../Models/LoginMetadata';
import './Home.css';

interface HomeProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata
}

const Home: React.FC<HomeProps> = ({
    loginfunction,
    loginMetadata
}) => {

    return (
        <div className="container1">
            <Menu loginMetadata={loginMetadata} loginfunction={loginfunction} />
            <div className="main"></div>
        </div>
    );
};

export default Home;
