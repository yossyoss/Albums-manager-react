import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux'
import { RootState, Dispatch } from '../store/store'


const Albums = () => {
	const albumsState = useSelector((state: RootState) => state.albums)
	const dispatch = useDispatch<Dispatch>()

	useEffect(() => {
		dispatch.albums.getAlbums()
	}, []);

	const mappedAlbum = albumsState.albums.map(album => {
		return (
			<tr key={album.id}>
				<td className='text-center'>{album.id}</td>
				<td className='text-center' colSpan={2}>
					{album.title}
				</td>
				<td className='text-center'>
					<Button as={Link} to={`/photos/${album.id}`} size='sm' variant='dark'>
						Album
					</Button>
				</td>
			</tr>
		);
	});

	const emptyAlbum = (
		<tr>
			<td colSpan={4} className='text-center'>
				<Spinner variant='info' animation='grow' />
			</td>
		</tr>
	);

	return (
		<Jumbotron>
			<Table striped bordered hover variant='dark'>
				<thead>
					<tr>
						<th className='text-center'>#</th>
						<th className='text-center' colSpan={2}>
							Album Name
						</th>
						<th className='text-center'>Go to</th>
					</tr>
				</thead>
				<tbody>{mappedAlbum.length > 0 ? mappedAlbum : emptyAlbum}</tbody>
			</Table>
		</Jumbotron>
	);
};

export default Albums;
