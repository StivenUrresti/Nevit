import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function UpdateModal(props) {
  const { open, toggleDialog,createNewUser,onChange,first_name,last_name} = props;
  const [maxWidth] = useState("sm");
  const [fullWidth] = useState(true);

  return (
    <div>
      <Dialog open={open} maxWidth={maxWidth} fullWidth={fullWidth}>
        <DialogTitle>Crear usuario</DialogTitle>
        <DialogContent style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              value={first_name}
              onChange={onChange("first_name")}
              placeholder="Nombre"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <TextField
              fullWidth
              required
              id="outlined-required"
              label="Apellido"
              placeholder="Apellido"
              value={last_name}
              onChange={onChange("last_name")}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={createNewUser} autoFocus>
            crear
          </Button>
          <Button variant="contained" onClick={toggleDialog} autoFocus>
            cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
