import React from "react";
import { Grid2 } from "@mui/material";
import Carte from "./carte";

interface PropsGrilleCarte {
  cartes: {
    id: number;
    image: string;
    estRetournee: boolean;
    estTrouvee: boolean;
  }[];
  retournerCarte: (id: number) => void;
}

const GrilleCarte = (props:PropsGrilleCarte) => {
  return (
    <Grid2 container spacing={2} justifyContent="center" textAlign={"center"}>
      {props.cartes.map((carte) => (
        
          <Carte
            id={carte.id}
            image={carte.image}
            estRetournee={carte.estRetournee}
            estTrouvee={carte.estTrouvee}
            retournerCarte={props.retournerCarte}
          />
        
      ))}
    </Grid2>
  );
};

export default GrilleCarte;
