import { use, useEffect, useState } from "react";
import { deleteUser, getAllUsers, getMessages, sendMessage, updateUser, userRegister } from "../../Services/ApiServices";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemText } from '@mui/material';
import { toast } from "react-toastify";

export function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState(null);
    const [open, setOpen] = useState(false);
    const userData = JSON.parse(localStorage.getItem('user')) || '';
    const [messageContent, setMessageContent] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);

    const handleMessageClick = async (institute) => {
        setSelectedInstitute(institute);
        setIsMessageDialogOpen(true);
        try {
            const fetchedMessages = await getMessages(userData.id, institute.id);
            setMessages(fetchedMessages);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            await sendMessage(selectedInstitute.id, messageContent, userData);
            toast.success('Message sent successfully');
            handleClose();
        } catch (error) {
            toast.error('Failed to send message');
        }
    };

    const fetchTeacher = async () => {
        try {
            const response = await getAllUsers();
            setUsers(response.data);
            const teacherData = response.data.filter(user => user.role === 'Teacher');
            setTeachers(teacherData);
        } catch (error) {
            console.error('Fetch institute failed:', error);
        }
    };

    useEffect(() => {
        fetchTeacher();
    }, []);

    const handleEdit = (institute) => {
        setSelectedInstitute(institute);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setIsMessageDialogOpen(false);
        setSelectedInstitute(null);
    };

    const handleSave = async () => {
        // Save the updated institute details
        // Add your API call here to save the updated details
        try {
            const response = await updateUser(selectedInstitute.id, selectedInstitute);
            if (response.data) {
                toast.success("Teacher updated successfully!", { position: "top-right" });
                fetchTeacher();
            }
        } catch (error) {
            console.error('Save failed:', error);
        }
        handleClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedInstitute({ ...selectedInstitute, [name]: value });
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteUser(id);
            if (response.data) {
                toast.success("Teacher deleted successfully!", { position: "top-right" });
                fetchTeacher();
            }
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    const getSenderName = (senderId) => {
        const sender = users.find(institute => institute.id === senderId);
        return sender ? sender.name : 'Unknown';
    };

    return (
        <div className="p-4">
            <header className="bg-[#2C8E71] text-white p-2 mb-2 shadow">
                <h1 className="text-2xl font-bold">Teacher List</h1>
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
                        {teachers.map((institute) => (
                            <TableRow key={institute.id}>
                                <TableCell>{institute.name}</TableCell>
                                <TableCell>{institute.email}</TableCell>
                                <TableCell>{institute.phoneNumber}</TableCell>
                                <TableCell>{institute.role}</TableCell>
                                <TableCell>{institute.status ? 'Online' : 'Offline'}</TableCell>
                                <TableCell className="flex gap-2">
                                    {userData && userData.role === 'Institute' && (
                                        <>
                                            <Button variant="contained" color="primary" onClick={() => handleEdit(institute)}>Edit</Button>
                                            <Button variant="outlined" sx={{ backgroundColor: 'red', '&:hover': { backgroundColor: 'darkred' } }} className="ms-2 me-2" onClick={() => handleDelete(institute.id)}>Delete</Button>
                                        </>
                                    )}
                                    <Button variant="contained" color="primary" onClick={() => handleMessageClick(institute)}>Message</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Teacher</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Name"
                        type="text"
                        fullWidth
                        name="name"
                        value={selectedInstitute?.name || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        name="email"
                        value={selectedInstitute?.email || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Phone Number"
                        type="text"
                        fullWidth
                        name="phoneNumber"
                        value={selectedInstitute?.phoneNumber || ''}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSave} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={isMessageDialogOpen} onClose={handleClose}>
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