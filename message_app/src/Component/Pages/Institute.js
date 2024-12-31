import { useEffect, useState } from "react";
import { getAllUsers, getMessages, sendMessage } from "../../Services/ApiServices";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { toast } from "react-toastify";

export function Institute() {
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState(null);
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem('user'));
  const [messageContent, setMessageContent] = useState('');
  const [messages, setMessages] = useState([]);
  const handleMessageClick =async (institute) => {
    setSelectedInstitute(institute);
    setOpen(true);
    try {
      const fetchedMessages = await getMessages(userData.id, institute.id);
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };

  const handleSendMessage = async () => {
    try {
      await sendMessage(selectedInstitute.id, messageContent,userData);
      toast.success('Message sent successfully');
      handleClose();
    } catch (error) {
      toast.error('Failed to send message');
    }
  };

  const fetchInstitute = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data);
      const instituteData = response.data.filter(user => user.role === 'Institute');
      setInstitutes(instituteData);
    } catch (error) {
      console.error('Fetch institute failed:', error);
    }
  };

  useEffect(() => {
    fetchInstitute();
  }, []);

  const handleEdit = (institute) => {
    setSelectedInstitute(institute);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInstitute(null);
  };

  const handleSave = () => {
    // Save the updated institute details
    // Add your API call here to save the updated details
    handleClose();
  };

  const getSenderName = (senderId) => {
    const sender = users.find(institute => institute.id === senderId);
    return sender ? sender.name : 'Unknown';
  };

  return (
    <div className="p-4">
        <header className="bg-[#2C8E71] text-white p-2 mb-2 shadow">
                <h1 className="text-2xl font-bold">Institute List</h1>
         </header>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Email</strong></TableCell>
              <TableCell><strong>Phone Number</strong></TableCell>
              <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {institutes.map((institute) => (
              <TableRow key={institute.id}>
                <TableCell>{institute.name}</TableCell>
                <TableCell>{institute.email}</TableCell>
                <TableCell>{institute.phoneNumber}</TableCell>
                <TableCell>{institute.role}</TableCell>
                <TableCell>{institute.status? 'Online' : 'Offline'}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleMessageClick(institute)}>Message</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Messages</DialogTitle>
        <DialogContent>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id}>
                <ListItemText primary={message.content} secondary={`From: ${getSenderName(message.senderId)}`} />
              </ListItem>
            ))}
          </List>
          <TextField
            autoFocus
            margin="dense"
            label="Message"
            type="text"
            fullWidth
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Cancel</Button>
          <Button onClick={handleSendMessage} color="primary">Send</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}