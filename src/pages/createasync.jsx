import React, { useEffect, useState } from 'react';
import { useZustand } from '../store/asynctodos';
import { useNavigate } from 'react-router-dom';

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, IconButton, Checkbox, TextField, Select, MenuItem,
  FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions,
  Box, InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';

const Createasync = () => {
  const navigate = useNavigate();
  const { data, getTodo, deletetodo, adduser, edituser, chexbox } = useZustand();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editItem, setEditItem] = useState({ id: '', name: '', age: '' });

  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    getTodo();
  }, [getTodo]);

  const handleAddOpen = () => setAddOpen(true);
  const handleAddClose = () => {
    setAddOpen(false);
    setNewName('');
    setNewAge('');
  };

  const handleAdd = () => {
    if (newName.trim() && newAge.trim()) {
      adduser({ name: newName, age: newAge, status: false });
      handleAddClose();
    }
  };

  const handleEditOpen = (elem) => {
    setEditItem({ id: elem.id, name: elem.name, age: elem.age });
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setEditItem({ id: '', name: '', age: '' });
  };

  const handleEdit = () => {
    if (editItem.name.trim() && editItem.age.trim()) {
      edituser({ id: editItem.id, name: editItem.name, age: editItem.age });
      handleEditClose();
    }
  };

  const handleToggleStatus = (elem) => {
    chexbox(elem);
  };

  const filteredData = data
    .filter(el => el.name.toLowerCase().includes(search.toLowerCase()))
    .filter(el => {
      if (filterStatus === 'all') return true;
      if (filterStatus === 'true') return el.status === true;
      if (filterStatus === 'false') return el.status === false;
      return true;
    });

  return (
    <Box sx={{ p: 3 }}>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddOpen}>
          Add New
        </Button>

        <TextField
          size="small"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
          }}
          sx={{ width: 300 }}
        />

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Filter</InputLabel>
          <Select value={filterStatus} label="Filter" onChange={(e) => setFilterStatus(e.target.value)}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="true">Active</MenuItem>
            <MenuItem value="false">Inactive</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#1976d2' }}>
            <TableRow>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Age</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((elem) => (
              <TableRow key={elem.id} hover>
                <TableCell>{elem.name}</TableCell>
                <TableCell>{elem.age}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={elem.status}
                    onChange={() => handleToggleStatus(elem)}
                    color="primary"
                  />
                  <span style={{ color: elem.status ? 'green' : 'red', fontWeight: 'bold', marginLeft: 8 }}>
                    {elem.status ? 'Active' : 'Inactive'}
                  </span>
                </TableCell>
                <TableCell>
                  <IconButton color="info" onClick={() => navigate(`/infopage/${elem.id}`)}>
                    ℹ️
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEditOpen(elem)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => deletetodo(elem.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={addOpen} onClose={handleAddClose}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAddClose}>Cancel</Button>
          <Button onClick={handleAdd} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            fullWidth
            value={editItem.name}
            onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Age"
            fullWidth
            value={editItem.age}
            onChange={(e) => setEditItem({ ...editItem, age: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEdit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Createasync;