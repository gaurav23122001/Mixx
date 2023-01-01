
import Menu from '../components/Menu';
import { LoginMetadata } from '../Models/LoginMetadata';

interface ContactProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata
}

const Contact: React.FC<ContactProps> = ({
    loginfunction,
    loginMetadata
}) => {
    return (
        <div className="container1">
            <Menu loginMetadata={loginMetadata} loginfunction={loginfunction} />
            <div className="main">sdasdasdasdasdasdasdasdsa</div>
        </div>
    );
};

export default Contact;
