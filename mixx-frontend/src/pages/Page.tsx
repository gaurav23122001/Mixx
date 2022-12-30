import { IonButtons, IonContent, IonGrid, IonHeader, IonMenuButton, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import { LoginMetadata } from '../Models/LoginMetadata';
import Home from './Home';
import './Page.css';

interface PageProps {
  loginfunction: (loginMetadata: LoginMetadata | null) => void;
  loginMetadata: LoginMetadata
}

const Page: React.FC<PageProps> = ({
  loginfunction,
  loginMetadata
}) => {

  const { name } = useParams<{ name: string; }>();
  if (name == "home") {
    return (
      <Home loginfunction={loginfunction} loginMetadata={loginMetadata} />
    );
  }

  return (
    <Redirect to="/home" />
  );
};

export default Page;
