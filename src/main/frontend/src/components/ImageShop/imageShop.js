import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import './imageShop.css';
import axios from "axios";

function ImageShop() {
    const [rows, setRows] = useState([]);

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

    return (
            <main style={{ flexGrow: 1, padding: '24px' }}>
                    <Box sx={{ padding: 2 }}>
                    
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <Link to="/account/create">
                                        <button className="new-imageShop-button">생성</button>
                                    </Link>
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
                                                {/* <Link
                                                    to={`/shop/details/${row.shop_id}`}
                                                    state={{ accountData: row }}
                                                > */}
                                                    {row.title}
                                                {/* </Link> */}
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
            </main>
    );
}

export default ImageShop;
