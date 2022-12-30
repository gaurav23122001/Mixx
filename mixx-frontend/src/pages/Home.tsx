import { IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { LoginMetadata } from '../Models/LoginMetadata';
import './Page.css';

interface HomeProps {
    loginfunction: (loginMetadata: LoginMetadata | null) => void;
    loginMetadata: LoginMetadata
}

const Home: React.FC<HomeProps> = ({
    loginfunction,
    loginMetadata
}) => {

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonMenuButton />
                    </IonButtons>
                    asdsadsad
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>

                    </IonToolbar>
                </IonHeader>
            </IonContent>
        </IonPage>
    );
};

export default Home;
