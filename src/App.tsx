import React, { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import GrilleCarte from "./components/grilleCarte";
import Carte from "./components/carte";

// Defini l'interface pour une carte
interface CarteJeu {
  id: number;
  image: string;
  estRetournee: boolean;
  estTrouvee: boolean;
}

// Recupere les images des chats dans le bon dossier
const App = () => {
  const imagesChats = [
    "./public/chat1.png",
    "./public/chat2.png",
    "./public/chat3.png",
    "./public/chat4.png",
    "./public/chat5.png",
    "./public/chat6.png",
    "./public/chat7.png",
    "./public/chat8.png",
  ];

  // UseState pour les cartes, les cartes retournees, les coups restants et le jeu termine
  const [cartes, setCartes] = useState<CarteJeu[]>([]);
  const [cartesRetournees, setCartesRetournees] = useState<number[]>([]);
  const [coupsRestants, setCoupsRestants] = useState(20);
  const [jeuTermine, setJeuTermine] = useState(false);



  // UseEffect de la fonction qui initialise les cartes au debut du jeu
  useEffect(() => {
    initialiserCartes();
  }, []);

  // UseEffect de la fonction qui verifie si une paire a ete trouvee
  useEffect(() => {
    if (cartesRetournees.length === 2) {
      verifierPaire();
    }
  }, [cartesRetournees]);

// Permet d'initialiser les cartes et les melangeant pour avoir un jeu different a chaque fois
  const initialiserCartes = () => {
    const cartesMelangees = [...imagesChats, ...imagesChats]
      .map((image, index) => ({
        id: index,
        image,
        estRetournee: false,
        estTrouvee: false,
      }))
      .sort(() => Math.random() - 0.5);
    setCartes(cartesMelangees);
    setCartesRetournees([]);
    setCoupsRestants(20);
    setJeuTermine(false);
  };

// Permet de retourner une carte si elle n'est pas deja retournee
  const retournerCarte = (id: number) => {
    if (cartesRetournees.length < 2) {
      setCartes((prevCartes) =>
        prevCartes.map((carte) =>
          carte.id === id ? { ...carte, estRetournee: true } : carte
        )
      );
      setCartesRetournees((prevRetournees) => [...prevRetournees, id]);
    }
  };


// Permet de verifier si une paire a ete trouvee avec une seconde de cooldown pour se retourner si c'est pas les memes
  const verifierPaire = () => {

    const [id1, id2] = cartesRetournees;

// stock l'id des deux cartes qui ont ete retournees
    const carte1 = cartes.find((carte) => carte.id === id1);
    const carte2 = cartes.find((carte) => carte.id === id2);

  // Verifie si les deux cartes sont les memes, si oui, elles restent retournees...
    if (carte1 && carte2 && carte1.image === carte2.image) {
      setCartes((prevCartes) =>
        prevCartes.map((carte) =>
          carte.id === id1 || carte.id === id2
            ? { ...carte, estTrouvee: true }
            : carte
        )
      );
    } else {

      setTimeout(() => {
        // sinon elles se retournent au bout de 1sec
        setCartes((prevCartes) =>
          prevCartes.map((carte) =>
            carte.id === id1 || carte.id === id2
              ? { ...carte, estRetournee: false }
              : carte
          )
        );
      }, 1000);
    }


    setCartesRetournees([]);
    setCoupsRestants((prev) => prev - 1);

    if (cartes.every((carte) => carte.estTrouvee)) {
      setJeuTermine(true);
    } else if (coupsRestants <= 1) {
      setJeuTermine(true);
    }
  };

  return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h3" gutterBottom>
        Jeu de Mémoire : Examen2
      </Typography>
      {/* Condition pour savoir quelle "ecran" on affiche, si le jeu est terminee ou non */}
      {jeuTermine ? (
        // si oui on affiche le message de victoire ou defaite et un bouton pour rejouer
        <Box textAlign={"center"}>       
          <Typography variant="h5" color="textSecondary" gutterBottom>
            {cartes.every((carte) => carte.estTrouvee) ? "Victoire !" : "Défaite !"}
          </Typography>
          <Button variant="contained" color="primary" onClick={initialiserCartes}>
            Rejouer
          </Button>
        </Box>
      ) : (
        // sinon on affiche le nombre de coups restants et la grille de cartes
        <Box>
          <Typography variant="h6" gutterBottom>
            Coups restants : {coupsRestants}
          </Typography>
          <GrilleCarte cartes={cartes} retournerCarte={retournerCarte} />
        </Box>
      )}
    </Box>
  );
};

export default App;
