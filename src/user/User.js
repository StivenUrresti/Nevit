import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllUser, createUser, deleteUser2 } from "../store/slices/users/userSlice";
import {
  TextField,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  TableContainer,
  TablePagination,
  Button,
} from "@mui/material";
import paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import CreateModal from "./CreateModal";

const useStyles = makeStyles({
  update: {
    background: "linear-gradient(45deg, #56FC03 30%, #ADFC03 90%)",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
  },
  dete: {
    background: "linear-gradient(45deg, #FF2C2C 30%, #FC0303 90%)",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
  },
  create: {
    background: "linear-gradient(45deg, #F0520E 30%, #FE4E02 90%)",
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
  },
});

const User = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState(false);

  const { people: users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    dispatch(getAllUser());
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      setData(users);
    }
  }, [users]);

  const onChange = (prop) => (event) => {
    setForm({ ...form, [prop]: event.target.value });
  };

  const createNewUser = async () => {
    if (form.first_name === "" || form.last_name === "") {
      alert('llene los campos')
    } else {
      console.log("los datos se actulizaron");
      const body = {
        first_name: form.first_name,
        last_name: form.last_name,
      };
      const result = await dispatch(createUser(body));
      if (result) {
        await dispatch(getAllUser());
      }
      toggleDialog();
    }
  };
  const onClickDeleteUser2 = (id) => async () => {
    console.log('id user', id)
    await dispatch(deleteUser2(id))
  }

  const handleChangeUser = (e) => {
    setSearch(e.target.value);
    filterUser(e.target.value);
  };

  const filterUser = (text) => {
    const newData = users.filter(
      (e) =>
        e.first_name.toString().toLowerCase().includes(text.toLowerCase()) ||
        e.last_name.toString().toLowerCase().includes(text.toLowerCase())
    );
    setData(newData);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const toggleDialog = () => {
    setOpen(!open);
  };

  return (
    <div style={{ margin: 50 }}>
      <TableContainer
        component={paper}
        style={{ boxShadow: "1px 1px 11px 2px rgba(0,0,0,0.52)" }}
      >
        <div style={{ padding: 30, display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            id="outlined-basic"
            label="busca"
            variant="outlined"
            className="form-control inputBuscar"
            value={search}
            placeholder="Búsqueda por Nombre"
            onChange={handleChangeUser}
          />
          <Button
            size="large"
            variant="contained"
            className={classes.create}
            onClick={toggleDialog}
          >
            crear
          </Button>
        </div>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nombre</TableCell>
              <TableCell align="center">Apellido</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center">{user.first_name}</TableCell>
                <TableCell align="center">{user.last_name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    style={{ borderRadius: 100 }}
                  />
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <Button variant="contained" className={classes.update}>
                      actualizar
                    </Button>
                    <Button variant="contained" className={classes.dete} onClick={onClickDeleteUser2(user.id)}>
                      eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      <CreateModal
        open={open}
        toggleDialog={toggleDialog}
        createNewUser={createNewUser}
        first_name={form.first_name}
        last_name={form.last_name}
        onChange={onChange}
      />
    </div>
  );
};
export default User;
