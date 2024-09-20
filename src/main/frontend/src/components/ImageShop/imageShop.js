import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ApiService from '../../services/ApiService';
import './imageShop.css';
import axios from "axios";

function ImageShop() {
    const [rows, setRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:9090/api/imageShop");
                console.log(response);

                setRows(response.data);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData();
    }, []);

    const deleteImageShop = async (shop_id) => {
        console.log(shop_id);
        try {
            await axios.delete(`http://localhost:9090/api/imageShop/delete/${shop_id}`);
            setRows(rows.filter(row => row.shop_id !== shop_id));
        } catch (error) {
            console.error('There was an error deleting the imageShop!', error);
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async () => {
        setIsModalOpen(false);

        try {
            const response = await ApiService.uploadImageShop({ "title" : title, "imageUrl" : imageUrl, "price" : price, "description" : description });
            console.log("karlo response", response);
        } catch (error) {
            console.error('Error upload image:', error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <main style={{ flexGrow: 1, padding: '24px' }}>
                    <Box sx={{ padding: 2 }}>
                    
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <button className="new-imageShop-button" onClick={handleModalOpen}>생성</button>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>createdDate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {rows.length > 0 ? (
                                    rows.map((row) => (
                                        <TableRow key={row.shop_id}>
                                            <TableCell>
                                                <Link
                                                    className='imageShop-link'
                                                    to={`/imageShop/details/${row.shop_id}`}
                                                    state={{ imageShopData: row }}
                                                >
                                                    {row.title}
                                                </Link>
                                            </TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>{row.price}</TableCell>
                                            <TableCell>{row.createdDate}</TableCell>
                                            <TableCell>
                                                <button className='delete-imageShop-button' onClick={() => deleteImageShop(row.shop_id)}>삭제</button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5}>No data available</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {isModalOpen && (
                        <div className="imageShop-modal">
                            <div className="imageShop-modal-content">
                                <h3>Upload Image Details</h3>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Image URL:
                                    <input
                                        type="url"
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Price:
                                    <input
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </label>
                                <label>
                                    Description:
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </label>
                                <button onClick={handleSubmit}>Submit</button>
                                <button onClick={handleModalClose}>Close</button>
                            </div>
                        </div>
                    )}
            </main>
    );
}

export default ImageShop;
