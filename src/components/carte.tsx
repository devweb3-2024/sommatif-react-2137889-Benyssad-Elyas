import React from "react";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

interface PropsCarte {
  id: number;
  image: string;
  estRetournee: boolean;
  estTrouvee: boolean;
  retournerCarte: (id: number) => void;
}

const Carte = (props:PropsCarte) => {
  const gererClic = () => {
    if (!props.estRetournee && !props.estTrouvee) {
      props.retournerCarte(props.id);
    }
  };

  return (
    <Card 
      sx={{ width: 150, height: 150, margin: 1, backgroundColor: props.estTrouvee ? "#d3f9d8" : "#f5f5f5" }}
      onClick={gererClic}
    >
      <CardActionArea disabled={props.estRetournee || props.estTrouvee}>
        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            backgroundColor: props.estRetournee && props.estTrouvee ? "#d3f9d8" : "#f5f5f5",
          }}
        >
          {props.estRetournee || props.estTrouvee ? (
            <img src={props.image} alt="Chat" style={{ width: "100%", height: "100%" }} />
          ) : (
            <Typography variant="h4" color="text.secondary">
              <img src={"../public/dessus-carte.svg"} alt="Image retourne" style={{ width: "100%", height: "100%" }}></img>
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Carte;
